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
  const fileInputRef = useRef(null);
  const targetRef = useRef(null);
  const scanTimer = useRef(null);

  // Scan DOM for all images and videos
  const scan = useCallback(() => {
    if (!active) { setOverlays([]); return; }

    const items = [];
    const imgs = document.querySelectorAll('img:not(.am-ignore)');
    const videos = document.querySelectorAll('video:not(.am-ignore)');
    const bgs = document.querySelectorAll('[style*="background-image"]:not(.am-ignore)');

    imgs.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      if (rect.width < 10 || rect.height < 10) return;
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

    bgs.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      if (rect.width < 10 || rect.height < 10) return;
      const bgMatch = el.style.backgroundImage.match(/url\(["']?(.+?)["']?\)/);
      if (!bgMatch) return;
      items.push({
        id: `bg-${i}`,
        type: 'background',
        el,
        rect,
        src: bgMatch[1],
        displaySrc: bgMatch[1],
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
    try {
      const url = new URL(item.src);
      // Strip leading slash, keep folder structure
      targetPath = url.pathname.replace(/^\//, '');
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
        } else if (item.type === 'background') {
          item.el.style.backgroundImage = `url(${newSrc})`;
        }

        setStatus({
          type: 'success',
          msg: `Saved to ${data.path} (${(data.size / 1024).toFixed(1)} KB)`
        });
        setTimeout(() => setStatus(null), 4000);
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
          </div>
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
          style={{
            top: item.rect.top + window.scrollY,
            left: item.rect.left + window.scrollX,
            width: item.rect.width,
            height: item.rect.height,
          }}
          onClick={() => handleReplace(item)}
        >
          <div className="am-overlay-badge">
            {item.type === 'video' ? '▶' : item.type === 'background' ? '◧' : '🖼'}
            <span className="am-overlay-label">Replace</span>
          </div>
          <div className="am-overlay-path" title={item.displaySrc}>
            {item.displaySrc.split('/').pop() || item.displaySrc}
          </div>
        </div>
      ))}
    </>
  );
}
