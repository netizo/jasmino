import { useState, useEffect, useCallback, useRef } from 'react';
import '../styles/asset-manager.css';

/**
 * DEV-ONLY floating asset manager overlay.
 * Highlights all <img> and <video> elements on the page.
 * Click any highlighted element to replace it with a new file.
 * Remove this component when done managing assets.
 */
export default function AssetManager() {
  const [active, setActive] = useState(false);
  const [overlays, setOverlays] = useState([]);
  const [status, setStatus] = useState(null);
  const [minimized, setMinimized] = useState(false);
  const [pendingChanges, setPendingChanges] = useState([]);
  const fileInputRef = useRef(null);
  const targetRef = useRef(null);
  const scanTimer = useRef(null);

  // Scan DOM for all images, videos, and CSS backgrounds (including gradients)
  const scan = useCallback(() => {
    if (!active) { setOverlays([]); return; }

    const items = [];
    const seen = new WeakSet(); // avoid duplicating elements

    const imgs = document.querySelectorAll('img:not(.am-ignore)');
    const videos = document.querySelectorAll('video:not(.am-ignore)');

    imgs.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      if (rect.width < 10 || rect.height < 10) return;
      seen.add(el);
      items.push({
        id: `img-${i}`,
        type: 'image',
        el,
        rect,
        src: el.src,
        displaySrc: el.getAttribute('src') || el.src,
      });
    });

    videos.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      if (rect.width < 10 || rect.height < 10) return;
      seen.add(el);
      const source = el.querySelector('source');
      items.push({
        id: `vid-${i}`,
        type: 'video',
        el,
        rect,
        src: source ? source.src : el.src,
        displaySrc: source ? (source.getAttribute('src') || source.src) : (el.getAttribute('src') || el.src),
      });
    });

    // Scan ALL visible elements for computed background-image (catches CSS-defined bgs + gradients)
    let bgIdx = 0;
    const allEls = document.querySelectorAll('section, div, header, footer, main, aside, article, span, a');
    allEls.forEach((el) => {
      if (el.classList.contains('am-ignore') || el.closest('.am-ignore') || seen.has(el)) return;
      const rect = el.getBoundingClientRect();
      if (rect.width < 30 || rect.height < 30) return;
      // Skip elements far outside viewport
      if (rect.bottom < -500 || rect.top > window.innerHeight + 500) return;

      const computed = getComputedStyle(el);
      const bgImage = computed.backgroundImage;
      if (!bgImage || bgImage === 'none') return;

      const hasUrl = bgImage.includes('url(');
      const hasGradient = /gradient\(/i.test(bgImage);
      if (!hasUrl && !hasGradient) return;

      seen.add(el);

      // Extract display info
      let displaySrc = '';
      let src = '';
      if (hasUrl) {
        const urlMatch = bgImage.match(/url\(["']?(.+?)["']?\)/);
        src = urlMatch ? urlMatch[1] : '';
        displaySrc = src.split('/').pop() || src;
      }
      if (hasGradient) {
        const gradType = bgImage.match(/(linear|radial|conic)-gradient/i);
        displaySrc = displaySrc
          ? displaySrc + ' + gradient'
          : (gradType ? gradType[0] : 'gradient');
      }

      // Find the CSS selector for this element (for user reference)
      const cssHint = getCssSelector(el);

      items.push({
        id: `bg-${bgIdx++}`,
        type: hasUrl ? 'background' : 'css-bg',
        el,
        rect,
        src: src || bgImage,
        displaySrc,
        cssHint,
        isGradient: hasGradient && !hasUrl,
        hasGradient,
      });
    });

    setOverlays(items);
  }, [active]);

  // Re-scan periodically while active
  useEffect(() => {
    if (active) {
      scan();
      scanTimer.current = setInterval(scan, 1500);
      return () => clearInterval(scanTimer.current);
    } else {
      setOverlays([]);
    }
  }, [active, scan]);

  // Also re-scan on scroll/resize
  useEffect(() => {
    if (!active) return;
    const handler = () => scan();
    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', handler, { passive: true });
    return () => {
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', handler);
    };
  }, [active, scan]);

  // Build a readable CSS selector for an element (for user reference)
  function getCssSelector(el) {
    const parts = [];
    let cur = el;
    for (let depth = 0; depth < 3 && cur && cur !== document.body; depth++) {
      let seg = cur.tagName.toLowerCase();
      if (cur.id) { seg += `#${cur.id}`; parts.unshift(seg); break; }
      if (cur.className && typeof cur.className === 'string') {
        const cls = cur.className.split(/\s+/).filter(c => !c.startsWith('am-')).slice(0, 2).join('.');
        if (cls) seg += `.${cls}`;
      }
      parts.unshift(seg);
      cur = cur.parentElement;
    }
    return parts.join(' > ');
  }

  const handleReplace = (item) => {
    targetRef.current = item;
    fileInputRef.current.accept = item.type === 'video'
      ? 'video/mp4,video/webm,video/mov'
      : 'image/png,image/jpeg,image/gif,image/svg+xml,image/webp,image/avif';
    fileInputRef.current.click();
  };

  const handleFileSelected = async (e) => {
    const file = e.target.files[0];
    if (!file || !targetRef.current) return;

    const item = targetRef.current;
    const ext = file.name.split('.').pop();

    // Determine target path — try to keep original filename/path
    let targetPath = '';

    if (item.type === 'css-bg') {
      // For CSS-defined backgrounds (gradients, etc.) — save with a clean name
      const folder = 'images';
      // Use element's first meaningful class or id as filename hint
      const hint = item.el.id
        || (item.el.className && typeof item.el.className === 'string'
          ? item.el.className.split(/\s+/).filter(c => !c.startsWith('am-'))[0]
          : '')
        || 'bg';
      targetPath = `${folder}/${hint}-bg.${ext}`;
    } else {
      try {
        const url = new URL(item.src);
        // Strip leading slash, keep folder structure
        targetPath = url.pathname.replace(/^\/+/, '');
      } catch {
        targetPath = item.displaySrc.replace(/^\//, '');
      }

      // If it's a bundled asset (from /src/assets/), put it in public/images/ instead
      if (targetPath.startsWith('src/') || targetPath.includes('@fs/') || targetPath.includes('assets/')) {
        const baseName = targetPath.split('/').pop().replace(/\.[^.]+$/, '');
        const folder = item.type === 'video' ? 'videos' : 'images';
        targetPath = `${folder}/${baseName}.${ext}`;
      }

      // If path doesn't have a proper extension, add one
      if (!/\.(png|jpe?g|gif|svg|webp|avif|mp4|webm|mov)$/i.test(targetPath)) {
        targetPath = targetPath.replace(/\.[^.]+$/, '') + '.' + ext;
      }
    }

    setStatus({ type: 'uploading', msg: `Uploading ${file.name}...` });

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('targetPath', targetPath);

      const res = await fetch('/api/upload-asset', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.ok) {
        // Update the element src to force reload
        const newSrc = data.path + '?t=' + Date.now();

        // Track the old→new path replacement for "Save to Source"
        const oldPath = item.displaySrc || '';
        if (oldPath && oldPath !== data.path && item.type !== 'css-bg') {
          setPendingChanges(prev => {
            // Avoid duplicates for same old path
            const filtered = prev.filter(c => c.oldPath !== oldPath);
            return [...filtered, { oldPath, newPath: data.path }];
          });
        }

        if (item.type === 'image') {
          item.el.src = newSrc;
        } else if (item.type === 'video') {
          const source = item.el.querySelector('source');
          if (source) {
            source.src = newSrc;
          } else {
            item.el.src = newSrc;
          }
          item.el.load();
        } else if (item.type === 'background' || item.type === 'css-bg') {
          // Replace background-image (works for both url() and gradient backgrounds)
          item.el.style.backgroundImage = `url(${newSrc})`;
          item.el.style.backgroundSize = 'cover';
          item.el.style.backgroundPosition = 'center';
        }

        // Show save path + CSS hint for backgrounds so user knows what to update
        let msg = `Saved to ${data.path} (${(data.size / 1024).toFixed(1)} KB)`;
        if (item.type === 'css-bg' && item.cssHint) {
          msg += `\nUpdate CSS: ${item.cssHint}`;
          // Also copy the CSS snippet to clipboard
          const cssSnippet = `background-image: url('${data.path}'); background-size: cover; background-position: center;`;
          navigator.clipboard?.writeText(cssSnippet).catch(() => {});
          msg += '\nCSS copied to clipboard!';
        }

        setStatus({ type: 'success', msg });
        setTimeout(() => setStatus(null), item.type === 'css-bg' ? 8000 : 4000);
        scan(); // Refresh overlays
      } else {
        setStatus({ type: 'error', msg: data.error || 'Upload failed' });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: err.message });
    }

    // Reset input
    e.target.value = '';
  };

  const handleAddNew = () => {
    targetRef.current = { type: 'new', src: '', displaySrc: '' };
    fileInputRef.current.accept = 'image/*,video/*';
    fileInputRef.current.click();
  };

  const handleAddFileSelected = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // For "add new", we let the user pick but still need a target path
    if (targetRef.current?.type === 'new') {
      const ext = file.name.split('.').pop();
      const isVideo = file.type.startsWith('video/');
      const folder = isVideo ? 'videos' : 'images';
      const targetPath = `${folder}/${file.name}`;

      setStatus({ type: 'uploading', msg: `Uploading ${file.name}...` });

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('targetPath', targetPath);

        const res = await fetch('/api/upload-asset', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();

        if (data.ok) {
          setStatus({
            type: 'success',
            msg: `Added ${data.path} (${(data.size / 1024).toFixed(1)} KB)`
          });
          setTimeout(() => setStatus(null), 4000);
        } else {
          setStatus({ type: 'error', msg: data.error || 'Upload failed' });
        }
      } catch (err) {
        setStatus({ type: 'error', msg: err.message });
      }

      e.target.value = '';
      return;
    }

    // Otherwise, delegate to the replace handler
    handleFileSelected(e);
  };

  // Save pending path changes to source files
  const handleSaveToSource = async () => {
    if (pendingChanges.length === 0) return;
    setStatus({ type: 'uploading', msg: `Saving ${pendingChanges.length} path change(s) to source...` });
    try {
      const res = await fetch('/api/save-asset-paths', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pendingChanges),
      });
      const data = await res.json();
      if (data.ok) {
        const files = data.updated.length > 0 ? data.updated.join(', ') : 'no files matched';
        setStatus({ type: 'success', msg: `Updated: ${files}` });
        setPendingChanges([]);
        setTimeout(() => setStatus(null), 5000);
      } else {
        setStatus({ type: 'error', msg: data.error || 'Save failed' });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: err.message });
    }
  };

  // Keyboard shortcut: Alt+A to toggle
  useEffect(() => {
    const handler = (e) => {
      if (e.altKey && e.key === 'a') {
        e.preventDefault();
        setActive(a => !a);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="am-ignore"
        style={{ display: 'none' }}
        onChange={handleAddFileSelected}
      />

      {/* Toggle button */}
      <button
        className={`am-toggle am-ignore ${active ? 'am-active' : ''}`}
        onClick={() => setActive(a => !a)}
        title="Asset Manager (Alt+A)"
      >
        {active ? '✕' : '🖼'}
      </button>

      {/* Status toast */}
      {status && (
        <div className={`am-toast am-ignore am-toast-${status.type}`}>
          {status.msg}
        </div>
      )}

      {/* Toolbar when active */}
      {active && !minimized && (
        <div className="am-toolbar am-ignore">
          <div className="am-toolbar-header">
            <span className="am-toolbar-title">Asset Manager</span>
            <span className="am-toolbar-count">{overlays.length} assets found</span>
            <button className="am-toolbar-btn" onClick={() => setMinimized(true)}>—</button>
          </div>
          <div className="am-toolbar-actions">
            <button className="am-btn am-btn-add" onClick={handleAddNew}>
              + Add New Asset
            </button>
            <button className="am-btn am-btn-scan" onClick={scan}>
              Rescan
            </button>
            {pendingChanges.length > 0 && (
              <button className="am-btn am-btn-save" onClick={handleSaveToSource}>
                Save to Source ({pendingChanges.length})
              </button>
            )}
          </div>
          {pendingChanges.length > 0 && (
            <div className="am-pending-list">
              {pendingChanges.map((c, i) => (
                <div key={i} className="am-pending-item">
                  <span className="am-pending-old">{c.oldPath}</span>
                  <span className="am-pending-arrow">→</span>
                  <span className="am-pending-new">{c.newPath}</span>
                </div>
              ))}
            </div>
          )}
          <div className="am-toolbar-hint">
            Click any highlighted element to replace it.
            <br />Press <kbd>Alt+A</kbd> to toggle.
          </div>
        </div>
      )}

      {active && minimized && (
        <button
          className="am-minimized-btn am-ignore"
          onClick={() => setMinimized(false)}
        >
          Assets ({overlays.length})
        </button>
      )}

      {/* Overlays on each asset */}
      {active && overlays.map(item => (
        <div
          key={item.id}
          className="am-overlay am-ignore"
          data-bg-type={item.type === 'css-bg' ? 'css-bg' : undefined}
          style={{
            top: item.rect.top + window.scrollY,
            left: item.rect.left + window.scrollX,
            width: item.rect.width,
            height: item.rect.height,
          }}
          onClick={() => handleReplace(item)}
        >
          <div className="am-overlay-badge">
            {item.type === 'video' ? '▶' : item.type === 'css-bg' ? '◨' : item.type === 'background' ? '◧' : '🖼'}
            <span className="am-overlay-label">Replace</span>
          </div>
          <div className="am-overlay-path" title={item.cssHint || item.displaySrc}>
            {item.type === 'css-bg' ? (item.cssHint || item.displaySrc) : (item.displaySrc.split('/').pop() || item.displaySrc)}
          </div>
        </div>
      ))}
    </>
  );
}
