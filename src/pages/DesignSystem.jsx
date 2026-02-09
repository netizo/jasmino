import React from 'react';
import { Link } from 'react-router-dom';

const inputStyle = {
  fontFamily: 'var(--font-sans)',
  fontSize: 14,
  padding: '12px 16px',
  border: '1px solid var(--g200)',
  borderRadius: 'var(--r)',
  background: 'var(--white)',
  color: 'var(--g900)',
  outline: 'none',
  transition: 'border-color 0.2s',
  width: '100%'
};

function ColorSwatch({ name, variable, hex, border }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0', borderBottom: '1px solid var(--g100)' }}>
      <div style={{
        width: 48, height: 48, borderRadius: 'var(--r)', background: `var(${variable})`,
        border: border || 'none', flexShrink: 0
      }} />
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: 'var(--g800)' }}>{name}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--g400)' }}>{variable} · {hex}</div>
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return <h3 style={{ marginBottom: 24, marginTop: 48 }}>{children}</h3>;
}

function SubLabel({ children }) {
  return <h4 style={{ marginBottom: 16, marginTop: 32, color: 'var(--g600)' }}>{children}</h4>;
}

function Code({ children }) {
  return (
    <code style={{
      fontFamily: 'var(--font-mono)', fontSize: 11, background: 'var(--g100)',
      padding: '2px 8px', borderRadius: 4, color: 'var(--g600)'
    }}>{children}</code>
  );
}

function MonoLabel({ children, dark }) {
  return (
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: dark ? 'rgba(255,255,255,0.4)' : 'var(--g400)', marginTop: 8 }}>{children}</div>
  );
}

export default function DesignSystem() {
  return (
    <main>
      {/* ═══════════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════════ */}
      <section className="dark-section eng-grid-dark section-pad" style={{ paddingTop: 120 }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="breadcrumb" style={{ marginBottom: 24 }}>
            <Link to="/">Home</Link><span className="sep">/</span><span style={{ color: 'rgba(255,255,255,0.6)' }}>Design System</span>
          </div>
          <span className="overline overline-with-line">Reference</span>
          <h1 style={{ marginTop: 16, marginBottom: 20 }}>Design <span className="italic-accent">System</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1.8 }}>
            A living reference for every design token, color, typographic style, component, and pattern used across the Jasmino website. Includes responsive behavior, elevation, gradients, animations, and more.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. COLORS
      ═══════════════════════════════════════════ */}
      <section className="cream-section eng-grid section-pad">
        <div className="container">
          <SectionLabel>Colors</SectionLabel>
          <p style={{ color: 'var(--g500)', marginBottom: 32, maxWidth: 600 }}>
            Our palette is built around deep navy backgrounds with green accents, supported by a full neutral greyscale.
          </p>

          <SubLabel>Primary Palette</SubLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            <ColorSwatch name="Navy" variable="--navy" hex="#0B1D34" />
            <ColorSwatch name="Dark" variable="--dark" hex="#0D2847" />
            <ColorSwatch name="Blue" variable="--blue" hex="#1B4B8F" />
            <ColorSwatch name="Blue Bright" variable="--blue-bright" hex="#3B7BDB" />
            <ColorSwatch name="Green" variable="--green" hex="#04E586" />
          </div>

          <SubLabel>Green Variants</SubLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            <ColorSwatch name="Green Dim" variable="--green-dim" hex="rgba(4,229,134,0.08)" border="1px solid var(--g150)" />
            <ColorSwatch name="Green Glow" variable="--green-glow" hex="rgba(4,229,134,0.25)" border="1px solid var(--g150)" />
            <ColorSwatch name="Green Line" variable="--green-line" hex="rgba(4,229,134,0.35)" border="1px solid var(--g150)" />
          </div>

          <SubLabel>Neutral Scale</SubLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {[
              { name: 'g50', hex: '#FAFBFC', border: true },
              { name: 'g100', hex: '#F0F2F5', border: true },
              { name: 'g150', hex: '#E4E7EC', border: true },
              { name: 'g200', hex: '#D5D9E0' },
              { name: 'g300', hex: '#B0B7C3' },
              { name: 'g400', hex: '#8892A2' },
              { name: 'g500', hex: '#6B7280' },
              { name: 'g600', hex: '#4B5563' },
              { name: 'g700', hex: '#374151' },
              { name: 'g800', hex: '#1F2937' },
              { name: 'g900', hex: '#0C1220' }
            ].map(c => (
              <ColorSwatch key={c.name} name={c.name} variable={`--${c.name}`} hex={c.hex} border={c.border ? '1px solid var(--g200)' : undefined} />
            ))}
          </div>

          <SubLabel>Surfaces</SubLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            <ColorSwatch name="Surface" variable="--surface" hex="#F4F5F7" border="1px solid var(--g150)" />
            <ColorSwatch name="White" variable="--white" hex="#FFFFFF" border="1px solid var(--g150)" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. TYPOGRAPHY (enhanced)
      ═══════════════════════════════════════════ */}
      <section className="white-section section-pad">
        <div className="container">
          <SectionLabel>Typography</SectionLabel>

          <SubLabel>Font Families</SubLabel>
          <div style={{ display: 'grid', gap: 24 }}>
            <div className="card corner-brackets">
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 500, marginBottom: 8 }}>Fraunces</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--g400)', marginBottom: 12 }}>--font-serif · Headings & display text</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--g600)', lineHeight: 1.5 }}>
                The quick brown fox jumps over the lazy dog — <span style={{ fontStyle: 'italic' }}>italic variant</span>
              </div>
            </div>
            <div className="card corner-brackets">
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Sora</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--g400)', marginBottom: 12 }}>--font-sans · Body & UI text</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--g600)', lineHeight: 1.7 }}>
                The quick brown fox jumps over the lazy dog. Weights: <span style={{ fontWeight: 400 }}>400 Regular</span> · <span style={{ fontWeight: 500 }}>500 Medium</span> · <span style={{ fontWeight: 600 }}>600 SemiBold</span>
              </div>
            </div>
            <div className="card corner-brackets">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 600, marginBottom: 8 }}>JetBrains Mono</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--g400)', marginBottom: 12 }}>--font-mono · Numbers, labels, code</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--g600)', lineHeight: 1.7 }}>
                0123456789 · ABCDEFGHIJ · abcdefghij
              </div>
            </div>
          </div>

          <SubLabel>Heading Scale</SubLabel>
          <table className="specs-table">
            <thead><tr><th>Element</th><th>Size</th><th>Weight</th><th>Line Height</th><th>Example</th></tr></thead>
            <tbody>
              <tr><td className="mono-val">h1</td><td className="mono-val">clamp(36px, 5vw, 56px)</td><td className="mono-val">500</td><td className="mono-val">1.05</td><td><h1 style={{ fontSize: 'clamp(24px, 3vw, 36px)', margin: 0 }}>Heading One</h1></td></tr>
              <tr><td className="mono-val">h2</td><td className="mono-val">clamp(28px, 3.5vw, 48px)</td><td className="mono-val">400</td><td className="mono-val">1.1</td><td><h2 style={{ fontSize: 'clamp(20px, 2.5vw, 32px)', margin: 0 }}>Heading Two</h2></td></tr>
              <tr><td className="mono-val">h3</td><td className="mono-val">clamp(22px, 2.5vw, 32px)</td><td className="mono-val">400</td><td className="mono-val">1.12</td><td><h3 style={{ fontSize: 'clamp(18px, 2vw, 24px)', margin: 0 }}>Heading Three</h3></td></tr>
              <tr><td className="mono-val">h4</td><td className="mono-val">15px (sans)</td><td className="mono-val">600</td><td className="mono-val">1.35</td><td><h4 style={{ margin: 0 }}>Heading Four</h4></td></tr>
            </tbody>
          </table>

          <SubLabel>Body Text</SubLabel>
          <div className="card" style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--g400)', marginBottom: 12 }}>Default body: Sora 15px / 1.7 / 400</div>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--g700)', margin: 0 }}>
              Our equipment operates in some of the most corrosive, high-temperature, and high-pressure environments in industry. We serve these sectors with a complete vertical solution — from engineering design through manufacturing, corrosion protection, and rubber products.
            </p>
          </div>

          <SubLabel>Special Text Styles</SubLabel>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              { el: <span className="overline">Overline Text</span>, code: '.overline' },
              { el: <span className="overline overline-with-line">Overline with Line</span>, code: '.overline-with-line' },
              { el: <span style={{ fontFamily: 'var(--font-serif)', fontSize: 20 }}>Engineering <span className="italic-accent">excellence</span></span>, code: '.italic-accent' },
              { el: <span className="stat-number">97%</span>, code: '.stat-number' },
              { el: <span className="stat-label">Reorder Rate</span>, code: '.stat-label' },
              { el: <span className="caption">Caption Text</span>, code: '.caption' },
              { el: <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>Monospaced text</span>, code: 'var(--font-mono)' }
            ].map((item, i) => (
              <div key={i} style={{ padding: '16px 24px', background: 'var(--g50)', borderRadius: 'var(--r)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {item.el}
                <Code>{item.code}</Code>
              </div>
            ))}
          </div>

          <SubLabel>Letter-Spacing Scale</SubLabel>
          <table className="specs-table">
            <thead><tr><th>Value</th><th>Usage</th><th>Preview</th></tr></thead>
            <tbody>
              {[
                { val: '-0.035em', usage: 'Hero display title', text: 'Engineering' },
                { val: '-0.025em', usage: 'h2, section titles', text: 'Section Title' },
                { val: '-0.02em', usage: 'h1, h2, card titles', text: 'Card Heading' },
                { val: '-0.015em', usage: 'h3, service cards', text: 'Sub Heading' },
                { val: '0', usage: 'Body text default', text: 'Body copy' },
                { val: '0.04em', usage: 'Captions, small labels', text: 'CAPTION' },
                { val: '0.06em', usage: 'Stat labels, table headers', text: 'STAT LABEL' },
                { val: '0.08em', usage: 'Blueprint labels', text: 'BLUEPRINT' },
                { val: '0.12em', usage: 'Hero badge, gallery tags', text: 'BADGE TAG' },
                { val: '0.14em', usage: 'Overline, nav headers', text: 'OVERLINE' },
                { val: '0.18em', usage: 'Section overlines (max)', text: 'OVERLINE MAX' }
              ].map(ls => (
                <tr key={ls.val}>
                  <td className="mono-val">{ls.val}</td>
                  <td>{ls.usage}</td>
                  <td><span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: ls.val }}>{ls.text}</span></td>
                </tr>
              ))}
            </tbody>
          </table>

          <SubLabel>Line-Height Scale</SubLabel>
          <table className="specs-table">
            <thead><tr><th>Value</th><th>Usage</th><th>Preview</th></tr></thead>
            <tbody>
              {[
                { val: '1.0', usage: 'Display numbers, stat-number', font: 'var(--font-mono)', size: 28, text: '130K+' },
                { val: '1.05', usage: 'h1 headings', font: 'var(--font-serif)', size: 22, text: 'Main Heading' },
                { val: '1.1', usage: 'h2 headings', font: 'var(--font-serif)', size: 20, text: 'Section Heading' },
                { val: '1.12', usage: 'h3 headings', font: 'var(--font-serif)', size: 18, text: 'Sub Heading' },
                { val: '1.35', usage: 'h4 headings', font: 'var(--font-sans)', size: 15, text: 'Card Heading' },
                { val: '1.6', usage: 'Facility info, compact body', font: 'var(--font-sans)', size: 13, text: 'Compact body text for tight spaces' },
                { val: '1.7', usage: 'Default body text', font: 'var(--font-sans)', size: 15, text: 'Default body text for paragraphs and descriptions' },
                { val: '1.8', usage: 'Descriptions, hero subtitle', font: 'var(--font-sans)', size: 14, text: 'Extended descriptions with generous breathing room for readability' }
              ].map(lh => (
                <tr key={lh.val}>
                  <td className="mono-val">{lh.val}</td>
                  <td>{lh.usage}</td>
                  <td><span style={{ fontFamily: lh.font, fontSize: lh.size, lineHeight: lh.val }}>{lh.text}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. SPACING & LAYOUT (enhanced)
      ═══════════════════════════════════════════ */}
      <section className="cream-section eng-grid section-pad">
        <div className="container">
          <SectionLabel>Spacing & Layout</SectionLabel>

          <SubLabel>Border Radii</SubLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {[
              { name: '--r', val: '12px' },
              { name: '--r-lg', val: '18px' },
              { name: '--r-xl', val: '24px' },
              { name: '--r-2xl', val: '32px' }
            ].map(r => (
              <div key={r.name} style={{ textAlign: 'center' }}>
                <div style={{
                  width: 80, height: 80, background: 'var(--blue)', borderRadius: `var(${r.name})`,
                  margin: '0 auto 12px', opacity: 0.8
                }} />
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: 'var(--g800)' }}>{r.name}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--g400)' }}>{r.val}</div>
              </div>
            ))}
          </div>

          <SubLabel>Gap Scale</SubLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { val: 4, usage: 'Nav items, tight spacing' },
              { val: 8, usage: 'Pills, inline items' },
              { val: 12, usage: 'List items, compact groups' },
              { val: 16, usage: 'Form fields, card internals' },
              { val: 20, usage: 'Content gaps, card body' },
              { val: 24, usage: 'Grid gaps, card grids' },
              { val: 32, usage: 'Section internal spacing' },
              { val: 48, usage: 'Large section gaps, footer columns' }
            ].map(g => (
              <div key={g.val} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '8px 16px', background: 'var(--white)', borderRadius: 'var(--r)', border: '1px solid var(--g150)' }}>
                <div style={{ width: g.val, height: 20, background: 'var(--green)', borderRadius: 2, flexShrink: 0, opacity: 0.8 }} />
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: 'var(--g800)', width: 40, flexShrink: 0 }}>{g.val}px</div>
                <div style={{ fontSize: 12, color: 'var(--g500)' }}>{g.usage}</div>
              </div>
            ))}
          </div>

          <SubLabel>Section Padding</SubLabel>
          <table className="specs-table">
            <thead><tr><th>Class</th><th>Default</th><th>{"<"}=1024px</th><th>{"<"}=768px</th></tr></thead>
            <tbody>
              <tr><td className="mono-val">.section-pad</td><td className="mono-val">80px 56px</td><td className="mono-val">64px 32px</td><td className="mono-val">48px 20px</td></tr>
            </tbody>
          </table>

          <SubLabel>Container</SubLabel>
          <div style={{ padding: 16, background: 'var(--white)', borderRadius: 'var(--r)', border: '1px solid var(--g150)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>.container — max-width: 1280px; margin: 0 auto;</span>
          </div>

          <SubLabel>Aspect Ratios</SubLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { ratio: '1 / 1', label: 'Square', usage: 'Hero visual', w: 120, h: 120 },
              { ratio: '1.15 / 1', label: '1.15', usage: 'Advantage diagram', w: 138, h: 120 },
              { ratio: '1 / 0.85', label: '1 / 0.85', usage: 'Globe container', w: 120, h: 102 }
            ].map(a => (
              <div key={a.label} style={{ textAlign: 'center' }}>
                <div style={{ width: a.w, height: a.h, background: 'linear-gradient(135deg, var(--dark), var(--navy))', borderRadius: 'var(--r)', margin: '0 auto 12px' }} />
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: 'var(--g800)' }}>aspect-ratio: {a.ratio}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g400)' }}>{a.usage}</div>
              </div>
            ))}
          </div>

          <SubLabel>Responsive Grids</SubLabel>
          {[
            { cls: '.resp-grid-2', cols: [2, 1, 1], labels: ['2 cols', '1 col @1024px', '1 col @768px'] },
            { cls: '.resp-grid-3', cols: [3, 2, 1], labels: ['3 cols', '2 cols @1024px', '1 col @768px'] },
            { cls: '.resp-grid-4', cols: [4, 2, 1], labels: ['4 cols', '2 cols @1024px', '1 col @768px'] }
          ].map(g => (
            <div key={g.cls} style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: 'var(--g800)', marginBottom: 8 }}>{g.cls}</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                {g.labels.map((label, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {i > 0 && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g300)' }}>→</span>}
                    <div style={{ display: 'flex', gap: 4 }}>
                      {Array.from({ length: g.cols[i] }).map((_, j) => (
                        <div key={j} style={{ width: 32, height: 20, background: 'var(--blue)', borderRadius: 4, opacity: 0.7 }} />
                      ))}
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g400)' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. SECTION BACKGROUNDS
      ═══════════════════════════════════════════ */}
      <section className="white-section section-pad">
        <div className="container">
          <SectionLabel>Section Backgrounds</SectionLabel>
          <p style={{ color: 'var(--g500)', marginBottom: 32, maxWidth: 600 }}>
            Four section background treatments, each with optional engineering grid overlays.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {[
              { cls: 'dark-section eng-grid-dark', label: '.dark-section + .eng-grid-dark', sub: 'background: var(--dark)', dark: true },
              { cls: 'navy-section', label: '.navy-section', sub: 'background: var(--navy)', dark: true },
              { cls: 'cream-section eng-grid', label: '.cream-section + .eng-grid', sub: 'background: var(--g50)', border: '1px solid var(--g150)' },
              { cls: 'white-section', label: '.white-section', sub: 'background: var(--white)', border: '1px solid var(--g150)' }
            ].map(s => (
              <div key={s.cls}>
                <div className={s.cls} style={{ padding: 32, borderRadius: 'var(--r-lg)', minHeight: 120, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', border: s.border || 'none' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: s.dark ? 'var(--green)' : 'var(--blue)' }}>{s.label}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: s.dark ? 'rgba(255,255,255,0.4)' : 'var(--g400)' }}>{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          6. BUTTONS & FORM ELEMENTS
      ═══════════════════════════════════════════ */}
      <section className="cream-section eng-grid section-pad">
        <div className="container">
          <SectionLabel>Buttons & Form Elements</SectionLabel>

          <SubLabel>Light Background</SubLabel>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
            <div style={{ textAlign: 'center' }}>
              <button className="btn btn-primary">Primary Button</button>
              <MonoLabel>.btn-primary</MonoLabel>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button className="btn btn-secondary">Secondary Button</button>
              <MonoLabel>.btn-secondary</MonoLabel>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span className="btn btn-ghost">Ghost Button</span>
              <MonoLabel>.btn-ghost</MonoLabel>
            </div>
          </div>

          <SubLabel>Dark Background</SubLabel>
          <div className="dark-section" style={{ padding: 32, borderRadius: 'var(--r-lg)', display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
            <div style={{ textAlign: 'center' }}>
              <button className="btn btn-primary">Primary</button>
              <MonoLabel dark>.btn-primary</MonoLabel>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button className="btn btn-secondary">Secondary</button>
              <MonoLabel dark>.btn-secondary</MonoLabel>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span className="btn btn-ghost">Ghost</span>
              <MonoLabel dark>.btn-ghost</MonoLabel>
            </div>
          </div>

          <SubLabel>Form Elements</SubLabel>
          <div style={{ maxWidth: 600 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g400)', marginBottom: 6 }}>Text Input</div>
                <input type="text" placeholder="Full Name" style={inputStyle} readOnly />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g400)', marginBottom: 6 }}>Email Input</div>
                <input type="email" placeholder="Email Address" style={inputStyle} readOnly />
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g400)', marginBottom: 6 }}>Select</div>
              <select style={inputStyle} defaultValue="">
                <option value="">Select Service Area</option>
                <option>Engineering Design</option>
                <option>Equipment Manufacturing</option>
                <option>Corrosion Protection</option>
                <option>Rubber Products</option>
              </select>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g400)', marginBottom: 6 }}>Textarea</div>
              <textarea placeholder="Tell us about your project" rows={3} style={{ ...inputStyle, resize: 'vertical' }} readOnly />
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g400)', marginTop: 12 }}>
              Sora 14px · padding: 12px 16px · border: 1px solid var(--g200) · border-radius: var(--r)
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. COMPONENTS (enhanced)
      ═══════════════════════════════════════════ */}
      <section className="white-section section-pad">
        <div className="container">
          <SectionLabel>Components</SectionLabel>

          <SubLabel>Card + Corner Brackets</SubLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginBottom: 32 }}>
            <div className="card corner-brackets">
              <h4 style={{ marginBottom: 8, color: 'var(--g800)' }}>Card Title</h4>
              <p style={{ fontSize: 13, color: 'var(--g500)', lineHeight: 1.7 }}>
                Standard card with corner bracket decoration. Hover to see elevation and green bracket accents.
              </p>
            </div>
            <div className="card">
              <h4 style={{ marginBottom: 8, color: 'var(--g800)' }}>Card (no brackets)</h4>
              <p style={{ fontSize: 13, color: 'var(--g500)', lineHeight: 1.7 }}>
                Plain card without corner brackets. Same padding, border, and hover behavior.
              </p>
            </div>
          </div>

          <SubLabel>Glass Card</SubLabel>
          <div className="dark-section" style={{ padding: 32, borderRadius: 'var(--r-lg)', marginBottom: 32 }}>
            <div className="glass-card" style={{ maxWidth: 400 }}>
              <h4 style={{ marginBottom: 8 }}>Glass Card</h4>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
                Frosted glass effect with backdrop-filter: blur(12px). Used on dark backgrounds.
              </p>
            </div>
          </div>

          <SubLabel>Division Card</SubLabel>
          <div style={{ marginBottom: 32 }}>
            <div className="division-card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderRadius: 'var(--r-2xl)', overflow: 'hidden', border: '1px solid var(--g150)', background: 'var(--white)' }}>
              <div style={{ position: 'relative', minHeight: 320, background: 'linear-gradient(135deg, var(--dark), var(--navy))', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 64, fontWeight: 700, color: 'rgba(255,255,255,0.03)', position: 'absolute' }}>01</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--green)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Division Visual</div>
              </div>
              <div style={{ padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, color: 'var(--green)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>01 — Engineering</span>
                <h3 style={{ fontSize: 28, marginBottom: 0 }}>Engineering Design</h3>
                <p style={{ color: 'var(--g500)', fontSize: 14.5, lineHeight: 1.7 }}>Pressure equipment, process plant, and structural design using ASME, PD 5500, EN 13445.</p>
                <span className="btn btn-ghost" style={{ alignSelf: 'flex-start' }}>Explore capabilities</span>
              </div>
            </div>
            <MonoLabel>.division-card · grid: 1fr 1fr · stacked @1024px</MonoLabel>
          </div>

          <SubLabel>Facility Card (Dark)</SubLabel>
          <div className="dark-section" style={{ padding: 32, borderRadius: 'var(--r-lg)', marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--r-lg)' }}>
              <span style={{ fontSize: 28 }}>🇮🇳</span>
              <div>
                <h4 style={{ color: 'var(--white)', marginBottom: 2 }}>Jasmino India</h4>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--green)', display: 'block', marginBottom: 8 }}>80,000 m² · Gujarat</span>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>Full-cycle fabrication, engineering design, rubber compounding, and lining application.</p>
              </div>
            </div>
            <MonoLabel dark>.facility-card · bg: rgba(255,255,255,0.04) · border: rgba(255,255,255,0.08)</MonoLabel>
          </div>

          <SubLabel>Comparison Cards</SubLabel>
          <div className="dark-section" style={{ padding: 32, borderRadius: 'var(--r-lg)', marginBottom: 32 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div style={{
                padding: 32, borderRadius: 'var(--r-lg)',
                background: 'linear-gradient(145deg, rgba(255,255,255,0.025), rgba(255,255,255,0.008))',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5A5A' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Problem</span>
                </div>
                <h4 style={{ marginBottom: 8 }}>Fragmented Supply Chain</h4>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}>Multiple vendors, mismatched specs, project delays.</p>
                <div style={{ marginTop: 16 }}>
                  {['Coordination overhead', 'Quality inconsistency'].map(p => (
                    <div key={p} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{ width: 20, height: 20, borderRadius: 6, background: 'rgba(255,90,90,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#FF5A5A', flexShrink: 0 }}>✕</span>
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{
                padding: 32, borderRadius: 'var(--r-lg)',
                background: 'linear-gradient(145deg, rgba(4,229,134,0.04), rgba(4,229,134,0.008))',
                border: '1px solid rgba(4,229,134,0.1)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Solution</span>
                </div>
                <h4 style={{ marginBottom: 8 }}>Vertically Integrated</h4>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}>One company, one standard, complete accountability.</p>
                <div style={{ marginTop: 16 }}>
                  {['Single point of contact', 'Consistent quality'].map(p => (
                    <div key={p} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{ width: 20, height: 20, borderRadius: 6, background: 'rgba(4,229,134,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'var(--green)', flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <MonoLabel dark>.comp-card.problem / .comp-card.solution</MonoLabel>
          </div>

          <SubLabel>Pills</SubLabel>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            <span className="pill">Engineering</span>
            <span className="pill">Manufacturing</span>
            <span className="pill">Corrosion</span>
            <span className="pill">Rubber</span>
          </div>
          <div className="dark-section" style={{ padding: 20, borderRadius: 'var(--r-lg)', display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
            <span className="pill">Dark Pill</span>
            <span className="pill">Variant</span>
          </div>

          <SubLabel>Trust Badge</SubLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
            <span className="trust-badge">ASME VIII</span>
            <span className="trust-badge">ISO 9001</span>
            <span className="trust-badge">PED</span>
            <span className="trust-badge">TÜV</span>
            <span className="trust-badge">API 650</span>
          </div>

          <SubLabel>Hero Badge</SubLabel>
          <div className="dark-section" style={{ padding: 32, borderRadius: 'var(--r-lg)', marginBottom: 32 }}>
            <div className="hero-badge">
              <span className="hero-dot" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>Engineering Excellence Since 1984</span>
            </div>
          </div>

          <SubLabel>Industry Card</SubLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
            {['Chemical', 'Fertilizer', 'Mining', 'Power'].map(name => (
              <div key={name} className="industry-card">
                <span style={{ fontSize: 28, display: 'block', marginBottom: 8 }}>🏭</span>
                <h4 style={{ fontSize: 14, marginBottom: 4 }}>{name}</h4>
                <p style={{ fontSize: 11, color: 'var(--g400)' }}>Industry sector</p>
              </div>
            ))}
          </div>

          <SubLabel>News Card</SubLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 32 }}>
            {['Jan 2026', 'Dec 2025', 'Nov 2025'].map(date => (
              <div key={date} className="news-card">
                <div className="news-card-img" style={{ background: 'linear-gradient(135deg, var(--dark), var(--navy))' }} />
                <div className="news-card-body">
                  <div className="date">{date}</div>
                  <h4>Sample news headline for design reference</h4>
                  <p>A brief excerpt showing the card's body text styling.</p>
                </div>
              </div>
            ))}
          </div>

          <SubLabel>Breadcrumb</SubLabel>
          <div style={{ padding: 16, background: 'var(--g50)', borderRadius: 'var(--r)', marginBottom: 32 }}>
            <div className="breadcrumb">
              <Link to="/">Home</Link><span className="sep">/</span><span>Division</span><span className="sep">/</span><span style={{ color: 'var(--g600)' }}>Current Page</span>
            </div>
          </div>

          <SubLabel>Sibling Nav / Tabs</SubLabel>
          <div className="sibling-nav" style={{ marginBottom: 16 }}>
            <a className="active" href="#">Active Tab</a>
            <a href="#">Tab Two</a>
            <a href="#">Tab Three</a>
            <a href="#">Tab Four</a>
          </div>
          <div className="tabs" style={{ marginBottom: 32 }}>
            <button className="tab active">Active</button>
            <button className="tab">Inactive</button>
            <button className="tab">Another</button>
          </div>

          <SubLabel>Drag-to-Scroll Carousel</SubLabel>
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', gap: 16, overflow: 'hidden', padding: '8px 0' }}>
              {['Card 1', 'Card 2', 'Card 3', 'Card 4'].map(c => (
                <div key={c} style={{ flex: '0 0 200px', padding: '24px 20px', background: 'var(--white)', border: '1px solid var(--g150)', borderRadius: 'var(--r-xl)', userSelect: 'none' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--g400)', marginBottom: 8 }}>{c}</div>
                  <div style={{ fontSize: 13, color: 'var(--g500)' }}>Drag to scroll. cursor: grab/grabbing.</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12 }}>
              <div style={{ width: 24, height: 8, borderRadius: 4, background: 'var(--blue)' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--g200)' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--g200)' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--g200)' }} />
            </div>
            <MonoLabel>.timeline-scroll / .gallery-scroll · overflow-x: auto · scrollbar hidden · dot indicators + prev/next buttons</MonoLabel>
          </div>

          <SubLabel>Canvas Particles (HeroParticles)</SubLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
            <div className="dark-section" style={{ padding: 32, borderRadius: 'var(--r-lg)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--green)', marginBottom: 4 }}>About Page Hero</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>Green particles · attract mode · 120 max</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 8 }}>rgba(4,229,134,*) · dark bg</div>
            </div>
            <div style={{ padding: 32, borderRadius: 'var(--r-lg)', background: 'var(--white)', border: '1px solid var(--g150)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--blue)', marginBottom: 4 }}>What We Do Hero</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g400)' }}>Blue particles · repel mode · 100 max</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g300)', marginTop: 8 }}>rgba(27,75,143,*) · white bg</div>
            </div>
          </div>

          <SubLabel>Specs Table</SubLabel>
          <table className="specs-table" style={{ marginBottom: 32 }}>
            <thead><tr><th>Property</th><th>Value</th><th>Notes</th></tr></thead>
            <tbody>
              <tr><td>Material</td><td className="mono-val">SA-516 Gr.70</td><td>Carbon steel plate</td></tr>
              <tr><td>Thickness</td><td className="mono-val">25mm</td><td>As per ASME VIII</td></tr>
              <tr><td>Design Pressure</td><td className="mono-val">15 barg</td><td>Full vacuum rated</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          8. STATS
      ═══════════════════════════════════════════ */}
      <section className="cream-section eng-grid section-pad">
        <div className="container">
          <SectionLabel>Stats</SectionLabel>

          <SubLabel>Stat Number + Label</SubLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, marginBottom: 32 }}>
            {[
              { num: '40+', label: 'Years' },
              { num: '15+', label: 'Countries' },
              { num: '97%', label: 'Reorder Rate' },
              { num: '130K+', label: 'm² Facility' }
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div className="stat-number">{s.num}</div>
                <div className="stat-label" style={{ marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <SubLabel>Stat Inline</SubLabel>
          <div className="stat-inline">
            <div className="stat-inline-item"><div className="num">80,000</div><div className="label">m² India</div></div>
            <div className="stat-inline-item"><div className="num">30,000</div><div className="label">m² Germany</div></div>
            <div className="stat-inline-item"><div className="num">20,000</div><div className="label">m² Turkey</div></div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          9. PROCESS FLOW
      ═══════════════════════════════════════════ */}
      <section className="dark-section eng-grid-dark section-pad">
        <div className="container">
          <h3 style={{ marginBottom: 32 }}>Process Flow</h3>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}>
            {[
              { num: '01', name: 'Design', label: 'Engineering' },
              { num: '02', name: 'Build', label: 'Manufacturing' },
              { num: '03', name: 'Protect', label: 'Lining' },
              { num: '04', name: 'Deliver', label: 'Logistics' }
            ].map((step, i) => (
              <React.Fragment key={step.num}>
                <div className="process-step">
                  <div className="step-circle"><span className="step-num">{step.num}</span></div>
                  <span className="step-name">{step.name}</span>
                  <span className="step-label">{step.label}</span>
                </div>
                {i < 3 && <div className="process-connector" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          10. ANIMATIONS & EASING
      ═══════════════════════════════════════════ */}
      <section className="white-section section-pad">
        <div className="container">
          <SectionLabel>Animations & Easing</SectionLabel>

          <SubLabel>Easing Curves</SubLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
            {[
              { name: '--ease', val: 'cubic-bezier(0.16, 1, 0.3, 1)', color: 'var(--green)', desc: 'Spring-like primary easing' },
              { name: '--ease-out', val: 'cubic-bezier(0, 0, 0.2, 1)', color: 'var(--blue)', desc: 'Standard ease-out' }
            ].map(e => (
              <div key={e.name} className="card">
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{e.name}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--g400)', marginBottom: 16 }}>{e.val}</div>
                <div style={{ height: 4, background: 'var(--g100)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ width: '60%', height: '100%', background: e.color, borderRadius: 2, transition: `width 0.6s ${e.val}` }} />
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g400)', marginTop: 8 }}>{e.desc}</div>
              </div>
            ))}
          </div>

          <SubLabel>Fade Up</SubLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
            <div style={{ padding: 24, background: 'var(--g50)', borderRadius: 'var(--r)', textAlign: 'center' }}>
              <div className="fade-up" style={{ padding: 16, background: 'var(--white)', borderRadius: 'var(--r)', border: '1px solid var(--g150)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--g400)' }}>.fade-up (initial)</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g300)' }}>opacity: 0 · translateY(40px)</div>
              </div>
            </div>
            <div style={{ padding: 24, background: 'var(--g50)', borderRadius: 'var(--r)', textAlign: 'center' }}>
              <div className="fade-up visible" style={{ padding: 16, background: 'var(--white)', borderRadius: 'var(--r)', border: '1px solid var(--g150)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--g400)' }}>.fade-up.visible</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g300)' }}>opacity: 1 · translateY(0)</div>
              </div>
            </div>
          </div>

          <SubLabel>Scroll Indicator</SubLabel>
          <div className="dark-section" style={{ padding: 32, borderRadius: 'var(--r-lg)', display: 'flex', alignItems: 'center', gap: 24 }}>
            <div className="scroll-indicator" style={{ position: 'relative', height: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div className="scroll-line" style={{ width: 1, height: 32, background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.3))' }} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>.scroll-indicator + .scroll-line</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Animated pulse-line keyframe</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          11. RESPONSIVE BREAKPOINTS (NEW)
      ═══════════════════════════════════════════ */}
      <section className="cream-section eng-grid section-pad">
        <div className="container">
          <SectionLabel>Responsive Breakpoints</SectionLabel>
          <p style={{ color: 'var(--g500)', marginBottom: 32, maxWidth: 700 }}>
            The design system uses four breakpoints. Most layout shifts occur at 1024px (tablet) and 768px (mobile). The T2 division pages add a 1080px breakpoint.
          </p>

          <table className="specs-table" style={{ marginBottom: 32 }}>
            <thead><tr><th>Breakpoint</th><th>Target</th><th>Key Changes</th></tr></thead>
            <tbody>
              <tr><td className="mono-val">1100px</td><td>Navbar tablet</td><td>Navbar dropdown spacing tightens</td></tr>
              <tr><td className="mono-val">1080px</td><td>T2 pages</td><td>T2 hero grid stacks, advantage section stacks, service card grid shifts to 2-col</td></tr>
              <tr><td className="mono-val">1024px</td><td>Tablet / landscape</td><td>Footer 4-col → 2-col, resp-grid-3 → 2-col, division card stacks, About/WhatWeDo layout shifts, section padding reduces</td></tr>
              <tr><td className="mono-val">900px</td><td>Mobile nav</td><td>Navbar → hamburger + full-screen mobile menu accordion</td></tr>
              <tr><td className="mono-val">768px</td><td>Mobile</td><td>Footer → 1-col, resp-grids → 1-col, section padding tightens, About timeline cards shrink</td></tr>
              <tr><td className="mono-val">480px</td><td>Small phone</td><td>Trust badges wrap tighter, stat numbers reduce size</td></tr>
            </tbody>
          </table>

          <SubLabel>Layout Shift Preview</SubLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 32 }}>
            {/* Desktop */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ border: '2px solid var(--g200)', borderRadius: 'var(--r)', padding: 16, aspectRatio: '16/10', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ height: 6, background: 'var(--navy)', borderRadius: 2 }} />
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                  <div style={{ background: 'var(--g100)', borderRadius: 4 }} />
                  <div style={{ background: 'var(--g100)', borderRadius: 4 }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, height: 24 }}>
                  <div style={{ background: 'var(--g100)', borderRadius: 4 }} />
                  <div style={{ background: 'var(--g100)', borderRadius: 4 }} />
                  <div style={{ background: 'var(--g100)', borderRadius: 4 }} />
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, marginTop: 8, color: 'var(--g800)' }}>Desktop</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g400)' }}>{'>'}1024px</div>
            </div>
            {/* Tablet */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ border: '2px solid var(--g200)', borderRadius: 'var(--r)', padding: 12, aspectRatio: '3/4', maxWidth: 140, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ height: 4, width: 40, background: 'var(--navy)', borderRadius: 2 }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <div style={{ width: 12, height: 2, background: 'var(--navy)', borderRadius: 1 }} />
                    <div style={{ width: 12, height: 2, background: 'var(--navy)', borderRadius: 1 }} />
                  </div>
                </div>
                <div style={{ flex: 1, background: 'var(--g100)', borderRadius: 4 }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, height: 20 }}>
                  <div style={{ background: 'var(--g100)', borderRadius: 4 }} />
                  <div style={{ background: 'var(--g100)', borderRadius: 4 }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, height: 20 }}>
                  <div style={{ background: 'var(--g100)', borderRadius: 4 }} />
                  <div style={{ background: 'var(--g100)', borderRadius: 4 }} />
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, marginTop: 8, color: 'var(--g800)' }}>Tablet</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g400)' }}>{'<'}=1024px</div>
            </div>
            {/* Mobile */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ border: '2px solid var(--g200)', borderRadius: 'var(--r)', padding: 8, aspectRatio: '9/16', maxWidth: 90, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ height: 3, width: 24, background: 'var(--navy)', borderRadius: 2 }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <div style={{ width: 8, height: 1.5, background: 'var(--navy)', borderRadius: 1 }} />
                    <div style={{ width: 8, height: 1.5, background: 'var(--navy)', borderRadius: 1 }} />
                  </div>
                </div>
                <div style={{ flex: 1, background: 'var(--g100)', borderRadius: 3 }} />
                <div style={{ height: 14, background: 'var(--g100)', borderRadius: 3 }} />
                <div style={{ height: 14, background: 'var(--g100)', borderRadius: 3 }} />
                <div style={{ height: 14, background: 'var(--g100)', borderRadius: 3 }} />
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, marginTop: 8, color: 'var(--g800)' }}>Mobile</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g400)' }}>{'<'}=768px</div>
            </div>
          </div>

          <SubLabel>Component Behavior at Breakpoints</SubLabel>
          <table className="specs-table">
            <thead><tr><th>Component</th><th>Desktop</th><th>Tablet (1024px)</th><th>Mobile (768px)</th></tr></thead>
            <tbody>
              <tr><td>Navbar</td><td className="mono-val">Full links + mega menu</td><td className="mono-val">Full links (tight)</td><td className="mono-val">Hamburger @900px</td></tr>
              <tr><td>Footer grid</td><td className="mono-val">4-col (1.5fr 1fr 1fr 1fr)</td><td className="mono-val">2-col</td><td className="mono-val">1-col</td></tr>
              <tr><td>Division card</td><td className="mono-val">2-col grid</td><td className="mono-val">Stacked (1-col)</td><td className="mono-val">Stacked (1-col)</td></tr>
              <tr><td>.section-pad</td><td className="mono-val">80px 56px</td><td className="mono-val">64px 32px</td><td className="mono-val">48px 20px</td></tr>
              <tr><td>Navbar padding</td><td className="mono-val">0 56px</td><td className="mono-val">0 32px</td><td className="mono-val">0 20px</td></tr>
              <tr><td>T2 SubNav</td><td className="mono-val">Visible, sticky top: 72px</td><td className="mono-val">Scrollable horizontal</td><td className="mono-val">Scrollable horizontal</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          12. SHADOWS & ELEVATION (NEW)
      ═══════════════════════════════════════════ */}
      <section className="white-section section-pad">
        <div className="container">
          <SectionLabel>Shadows & Elevation</SectionLabel>
          <p style={{ color: 'var(--g500)', marginBottom: 32, maxWidth: 600 }}>
            Six elevation levels from flat to dramatic, plus special-purpose shadows for glow and inset effects.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginBottom: 32 }}>
            {[
              { level: 0, shadow: 'none', usage: 'Default / flat', label: 'Level 0' },
              { level: 1, shadow: '0 1px 3px rgba(0,0,0,0.08)', usage: 'Tabs, active nav', label: 'Level 1' },
              { level: 2, shadow: '0 4px 16px rgba(27,75,143,0.06)', usage: 'Icon hover', label: 'Level 2' },
              { level: 3, shadow: '0 8px 24px rgba(0,0,0,0.08)', usage: 'Card hover', label: 'Level 3' },
              { level: 4, shadow: '0 16px 48px rgba(0,0,0,0.1)', usage: 'Division card hover', label: 'Level 4' },
              { level: 5, shadow: '0 24px 64px rgba(0,0,0,0.25)', usage: 'Comparison cards', label: 'Level 5' }
            ].map(s => (
              <div key={s.level} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '100%', height: 80, background: 'var(--white)', borderRadius: 'var(--r-lg)',
                  border: '1px solid var(--g100)', boxShadow: s.shadow, marginBottom: 12
                }} />
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: 'var(--g800)' }}>{s.label}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g400)', marginBottom: 4 }}>{s.usage}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--g300)', wordBreak: 'break-all' }}>{s.shadow}</div>
              </div>
            ))}
          </div>

          <SubLabel>Special Shadows</SubLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '100%', height: 60, background: 'var(--green)', borderRadius: 'var(--r)',
                boxShadow: '0 4px 20px rgba(4,229,134,0.3)', marginBottom: 12
              }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: 'var(--g800)' }}>Green Glow</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g400)' }}>Primary button hover</div>
            </div>
            <div className="dark-section" style={{ padding: 24, borderRadius: 'var(--r-lg)', textAlign: 'center' }}>
              <div style={{
                width: '100%', height: 60, borderRadius: 'var(--r)',
                boxShadow: 'inset 0 0 20px rgba(4,229,134,0.06), inset 0 0 20px rgba(4,229,134,0.03)',
                border: '1px solid rgba(255,255,255,0.08)', marginBottom: 12
              }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: 'var(--green)' }}>Inset Glow</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>Pipeline step hover</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          13. GRADIENTS (NEW)
      ═══════════════════════════════════════════ */}
      <section className="cream-section eng-grid section-pad">
        <div className="container">
          <SectionLabel>Gradients</SectionLabel>

          <SubLabel>Linear Gradients</SubLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginBottom: 32 }}>
            {[
              { name: 'Division Visual', gradient: 'linear-gradient(135deg, #0D2847, #0B1D34)', usage: '.division-card-visual' },
              { name: 'Green Connector', gradient: 'linear-gradient(90deg, rgba(4,229,134,0.35), #04E586)', usage: '.process-connector' },
              { name: 'CTA Gradient', gradient: 'linear-gradient(180deg, #1B4B8F, #1A3F73)', usage: 'CTA button (T2)' },
              { name: 'Content Edge', gradient: 'linear-gradient(to bottom, rgba(4,229,134,0.25), #04E586, rgba(4,229,134,0.25), transparent)', usage: '.div-content accent' },
              { name: 'Blueprint: Engineering', gradient: 'linear-gradient(170deg, #0d1e35, #0a1628, #0c1a2e)', usage: '.div-visual.eng' },
              { name: 'Blueprint: Manufacturing', gradient: 'linear-gradient(170deg, #0b1828, #081220, #0a1524)', usage: '.div-visual.mfg' },
              { name: 'Blueprint: Corrosion', gradient: 'linear-gradient(170deg, #0c1b30, #091525, #0b1829)', usage: '.div-visual.cor' },
              { name: 'Blueprint: Rubber', gradient: 'linear-gradient(170deg, #091420, #060e18, #08111e)', usage: '.div-visual.rub' }
            ].map(g => (
              <div key={g.name}>
                <div style={{ height: 64, borderRadius: 'var(--r)', background: g.gradient, marginBottom: 8 }} />
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: 'var(--g800)' }}>{g.name}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g400)' }}>{g.usage}</div>
              </div>
            ))}
          </div>

          <SubLabel>Radial Gradients</SubLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { name: 'Green Glow', gradient: 'radial-gradient(ellipse at 50% 0%, rgba(4,229,134,0.06), transparent 70%)', bg: 'var(--dark)', usage: 'Solution card glow' },
              { name: 'Globe Shadow', gradient: 'radial-gradient(ellipse, rgba(11,29,52,0.07), transparent 70%)', bg: 'var(--g50)', usage: 'Globe section shadow' },
              { name: 'Service Card', gradient: 'radial-gradient(circle at 30% 40%, rgba(4,229,134,0.06), transparent 50%), radial-gradient(circle at 80% 70%, rgba(27,75,143,0.08), transparent 50%)', bg: 'var(--dark)', usage: 'T2 card visual' }
            ].map(g => (
              <div key={g.name}>
                <div style={{ height: 100, borderRadius: 'var(--r)', background: `${g.gradient}, ${g.bg}`, marginBottom: 8, border: '1px solid var(--g150)' }} />
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: 'var(--g800)' }}>{g.name}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g400)' }}>{g.usage}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          14. Z-INDEX SCALE (NEW)
      ═══════════════════════════════════════════ */}
      <section className="dark-section eng-grid-dark section-pad">
        <div className="container">
          <h3 style={{ marginBottom: 32 }}>Z-Index Scale</h3>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 32, maxWidth: 600 }}>
            Complete stacking context hierarchy from background to topmost overlay.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { z: 1002, label: 'Navbar brand / burger', color: 'var(--green)' },
              { z: 1001, label: 'Mobile nav overlay', color: 'rgba(4,229,134,0.6)' },
              { z: 1000, label: 'Navbar (fixed)', color: 'rgba(4,229,134,0.55)' },
              { z: 999, label: 'Mega menu wrapper', color: 'rgba(4,229,134,0.5)' },
              { z: 998, label: 'Backdrop overlay', color: 'rgba(4,229,134,0.4)' },
              { z: 105, label: 'T2 SubNav (alternate)', color: 'rgba(4,229,134,0.35)' },
              { z: 90, label: 'T2 SubNav / Sticky CTA bar', color: 'rgba(4,229,134,0.3)' },
              { z: 7, label: 'Blueprint labels', color: 'rgba(255,255,255,0.12)' },
              { z: 5, label: 'Blueprint corners, status', color: 'rgba(255,255,255,0.10)' },
              { z: 3, label: 'Content layers', color: 'rgba(255,255,255,0.08)' },
              { z: 1, label: 'Grid backgrounds, noise', color: 'rgba(255,255,255,0.05)' },
              { z: 0, label: 'Default', color: 'rgba(255,255,255,0.03)' }
            ].map(item => (
              <div key={item.z} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600, color: 'var(--green)', width: 56, textAlign: 'right', flexShrink: 0 }}>{item.z}</div>
                <div style={{ flex: 1, height: 28, background: item.color, borderRadius: 4, display: 'flex', alignItems: 'center', paddingLeft: 12 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--white)' }}>{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          15. OPACITY & TRANSPARENCY (NEW)
      ═══════════════════════════════════════════ */}
      <section className="white-section section-pad">
        <div className="container">
          <SectionLabel>Opacity & Transparency</SectionLabel>
          <p style={{ color: 'var(--g500)', marginBottom: 32, maxWidth: 700 }}>
            RGBA white and green values used on dark backgrounds for borders, text, and background fills. Consistent opacity steps create visual hierarchy.
          </p>

          <SubLabel>White RGBA Scale (dark backgrounds)</SubLabel>
          <div className="dark-section" style={{ padding: 32, borderRadius: 'var(--r-lg)', marginBottom: 32 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { val: 0.025, usage: 'Ultra-subtle bg fills' },
                { val: 0.04, usage: 'Card backgrounds' },
                { val: 0.06, usage: 'Borders, dividers' },
                { val: 0.08, usage: 'Active borders' },
                { val: 0.1, usage: 'Stronger borders' },
                { val: 0.15, usage: 'Hover borders' },
                { val: 0.3, usage: 'Muted text, separators' },
                { val: 0.5, usage: 'Secondary text' },
                { val: 0.6, usage: 'Body text on dark' },
                { val: 0.7, usage: 'Nav links, descriptions' }
              ].map(o => (
                <div key={o.val} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 80, height: 24, background: `rgba(255,255,255,${o.val})`, borderRadius: 4, flexShrink: 0 }} />
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--green)', width: 48, flexShrink: 0 }}>{o.val}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{o.usage}</div>
                </div>
              ))}
            </div>
          </div>

          <SubLabel>Usage Patterns</SubLabel>
          <table className="specs-table">
            <thead><tr><th>Element</th><th>Opacity Range</th><th>Example</th></tr></thead>
            <tbody>
              <tr><td>Backgrounds</td><td className="mono-val">.025 – .04</td><td>Card fills, glass card base</td></tr>
              <tr><td>Borders</td><td className="mono-val">.06 – .15</td><td>Dividers, card edges, hover states</td></tr>
              <tr><td>Text</td><td className="mono-val">.3 – .7</td><td>Captions (.3), body (.6), nav links (.7)</td></tr>
              <tr><td>Decorative</td><td className="mono-val">.012 – .03</td><td>Background numbers, ultra-subtle fills</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          16. TRANSITIONS & TIMING (NEW)
      ═══════════════════════════════════════════ */}
      <section className="cream-section eng-grid section-pad">
        <div className="container">
          <SectionLabel>Transitions & Timing</SectionLabel>

          <SubLabel>Duration Scale</SubLabel>
          <table className="specs-table" style={{ marginBottom: 32 }}>
            <thead><tr><th>Duration</th><th>Usage</th><th>Elements</th></tr></thead>
            <tbody>
              {[
                { dur: '0.2s', usage: 'Micro interactions', items: 'Link color, border-color, breadcrumb, footer links' },
                { dur: '0.3s', usage: 'Standard UI', items: 'Buttons, pills, card hover, nav-trigger, process-step' },
                { dur: '0.35s', usage: 'Medium components', items: 'Industry cards, tabs, comparison cards' },
                { dur: '0.4s', usage: 'Larger transitions', items: 'Sticky CTA bar, division card, sibling-nav' },
                { dur: '0.5s', usage: 'Complex transforms', items: 'Division card scale, step animations' },
                { dur: '0.6s', usage: 'Entrance / exit', items: 'Division link underline, gallery items' },
                { dur: '0.7s', usage: 'Scroll reveal', items: '.fade-up, section headers, pipeline elements' },
                { dur: '0.8s', usage: 'Slow reveal', items: '.rv (scroll-reveal T2), pipeline wrap' },
                { dur: '1s', usage: 'Dramatic entrance', items: '.rv-s (scale scroll-reveal)' }
              ].map(t => (
                <tr key={t.dur}>
                  <td className="mono-val">{t.dur}</td>
                  <td>{t.usage}</td>
                  <td style={{ fontSize: 12, color: 'var(--g500)' }}>{t.items}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <SubLabel>Hover Transform Patterns</SubLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[
              { transform: 'translateY(-1px)', label: '-1px', desc: 'Primary button' },
              { transform: 'translateY(-3px)', label: '-3px', desc: 'Cards, news, industry' },
              { transform: 'translateY(-5px)', label: '-5px', desc: 'Featured cards' },
              { transform: 'translateY(-8px)', label: '-8px', desc: 'Division cards' }
            ].map(t => (
              <div key={t.label} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '100%', height: 48, background: 'var(--white)', borderRadius: 'var(--r)',
                  border: '1px solid var(--g150)', transform: t.transform,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)', marginBottom: 12
                }} />
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: 'var(--g800)' }}>{t.label}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g400)' }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          17. FILTERS & EFFECTS (NEW)
      ═══════════════════════════════════════════ */}
      <section className="white-section section-pad">
        <div className="container">
          <SectionLabel>Filters & Effects</SectionLabel>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginBottom: 32 }}>
            <div>
              <div style={{ height: 100, borderRadius: 'var(--r-lg)', background: 'linear-gradient(135deg, var(--blue), var(--green))', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', marginBottom: 8 }}>
                <div style={{ position: 'absolute', inset: 0, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', background: 'rgba(255,255,255,0.04)' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--white)', position: 'relative', zIndex: 1 }}>backdrop-filter: blur(12px)</span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: 'var(--g800)' }}>Glass Blur</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g400)' }}>.glass-card, overlays</div>
            </div>
            <div>
              <div style={{ height: 100, borderRadius: 'var(--r-lg)', background: 'linear-gradient(135deg, var(--blue), var(--green))', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', marginBottom: 8 }}>
                <div style={{ position: 'absolute', inset: 0, backdropFilter: 'blur(24px) saturate(1.5)', WebkitBackdropFilter: 'blur(24px) saturate(1.5)', background: 'rgba(8,16,28,0.88)' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--white)', position: 'relative', zIndex: 1 }}>blur(24px) saturate(1.5)</span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: 'var(--g800)' }}>Heavy Blur + Saturate</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g400)' }}>T2 sticky nav (.topnav)</div>
            </div>
          </div>

          <SubLabel>Image Filters</SubLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 32 }}>
            <div>
              <div style={{ height: 80, borderRadius: 'var(--r)', background: 'linear-gradient(135deg, #4a9, #38c, #e74)', marginBottom: 8 }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g400)' }}>Original</div>
            </div>
            <div>
              <div style={{ height: 80, borderRadius: 'var(--r)', background: 'linear-gradient(135deg, #4a9, #38c, #e74)', filter: 'saturate(0) brightness(0.3) contrast(1.2)', marginBottom: 8 }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g400)' }}>saturate(0) brightness(0.3) contrast(1.2)</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g300)' }}>Trust band background</div>
            </div>
            <div>
              <div style={{ height: 80, borderRadius: 'var(--r)', background: 'linear-gradient(135deg, #4a9, #38c, #e74)', filter: 'saturate(0.55) brightness(0.6) contrast(1.1)', marginBottom: 8 }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g400)' }}>saturate(.55) brightness(.6) contrast(1.1)</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g300)' }}>Gallery hover state</div>
            </div>
          </div>

          <SubLabel>Other Effects</SubLabel>
          <table className="specs-table">
            <thead><tr><th>Property</th><th>Value</th><th>Usage</th></tr></thead>
            <tbody>
              <tr><td className="mono-val">mix-blend-mode</td><td className="mono-val">overlay</td><td>Noise textures (blueprint, integrated model)</td></tr>
              <tr><td className="mono-val">pointer-events</td><td className="mono-val">none</td><td>All overlay layers (grid, noise, glows)</td></tr>
              <tr><td className="mono-val">user-select</td><td className="mono-val">none</td><td>Decorative background numbers, drag-scroll cards</td></tr>
              <tr><td className="mono-val">will-change</td><td className="mono-val">transform</td><td>Service cards (hover performance)</td></tr>
              <tr><td className="mono-val">cursor</td><td className="mono-val">grab / grabbing</td><td>Drag-to-scroll galleries and timelines</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          18. KEYFRAME ANIMATIONS (NEW)
      ═══════════════════════════════════════════ */}
      <section className="dark-section eng-grid-dark section-pad">
        <div className="container">
          <h3 style={{ marginBottom: 12 }}>Keyframe Animations</h3>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 32, maxWidth: 600 }}>
            Live demos of featured animations, plus a reference table of all 25+ keyframes in the system.
          </p>

          <SubLabel style={{ color: 'var(--green)' }}>Live Demos</SubLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 48 }}>
            {/* pulse-dot */}
            <div style={{ textAlign: 'center', padding: 24 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--green)', margin: '0 auto 16px', animation: 'pulse-dot 2s infinite' }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--green)' }}>pulse-dot</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>2s infinite</div>
            </div>
            {/* pulse-line */}
            <div style={{ textAlign: 'center', padding: 24 }}>
              <div style={{ width: 1, height: 40, margin: '0 auto 16px', background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.3))', animation: 'pulse-line 2s infinite' }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--green)' }}>pulse-line</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>2s infinite</div>
            </div>
            {/* rotating ring */}
            <div style={{ textAlign: 'center', padding: 24 }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%', margin: '0 auto 16px',
                border: '1.5px dashed rgba(255,255,255,0.1)', animation: 'rr 6s linear infinite'
              }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--green)' }}>rr (rotating ring)</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>20s linear infinite</div>
            </div>
          </div>

          <h4 style={{ color: 'var(--green)', marginBottom: 16 }}>Full Animation Reference</h4>
          <table className="specs-table" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--r)' }}>
            <thead><tr><th>Name</th><th>Duration</th><th>Easing</th><th>Usage</th></tr></thead>
            <tbody>
              {[
                { name: 'pulse-dot', dur: '2s', ease: 'ease-in-out', usage: 'Hero badge indicator' },
                { name: 'pulse-line', dur: '2s', ease: 'ease-in-out', usage: 'Scroll indicator' },
                { name: 'scanDown', dur: '6s', ease: 'ease-in-out', usage: 'Blueprint scan line' },
                { name: 'bpPulse', dur: '2.5s', ease: 'ease-in-out', usage: 'Blueprint pulse circles' },
                { name: 'bubbleUp', dur: '1.8–2.6s', ease: 'var(--ease)', usage: 'Chemical industry icon' },
                { name: 'liquidSway', dur: '4s', ease: 'ease-in-out', usage: 'Liquid level animation' },
                { name: 'smokeRise', dur: '2.5–3s', ease: 'ease-out', usage: 'Petrochemical icon' },
                { name: 'towerPulse', dur: '3s', ease: 'ease-in-out', usage: 'Tower opacity pulse' },
                { name: 'boltFlash', dur: '2s', ease: 'ease-in-out', usage: 'Power industry icon' },
                { name: 'ripple', dur: '2s', ease: 'ease-out', usage: 'Water industry icon' },
                { name: 'leafSway', dur: '4s', ease: 'ease-in-out', usage: 'Fertilizer icon' },
                { name: 'pickSwing', dur: '1.2s', ease: 'var(--ease)', usage: 'Mining icon' },
                { name: 'capsulePulse', dur: '1.5s', ease: 'ease-in-out', usage: 'Pharma icon' },
                { name: 'steamUp', dur: '2–2.6s', ease: 'ease-out', usage: 'Food industry icon' },
                { name: 'rr', dur: '20s', ease: 'linear', usage: 'Hero rotating ring' },
                { name: 'dl', dur: '2.5s', ease: 'ease-out', usage: 'SVG line draw' },
                { name: 'beamFlow', dur: '4–7s', ease: 'linear', usage: 'Pipeline beam energy' },
                { name: 'globeSpin', dur: '1s', ease: 'linear', usage: 'Globe loading' },
                { name: 'grow', dur: '0.6s', ease: 'var(--ease)', usage: 'Fertilizer icon hover' },
                { name: 'pulse', dur: '2.5s', ease: 'ease-in-out', usage: 'Solution tag glow' },
                { name: 'gp', dur: '2.5s', ease: 'ease-in-out', usage: 'T2 hero dot pulse' },
                { name: 'about-lu', dur: '1.1s', ease: 'var(--ease)', usage: 'About hero line reveal' },
                { name: 'about-fi', dur: '0.8–1.2s', ease: 'default', usage: 'About hero fade-in' },
                { name: 'about-fs', dur: '0.9s', ease: 'var(--ease)', usage: 'About hero fade+slide' },
                { name: 'about-pulse', dur: '2s', ease: 'ease-in-out', usage: 'About badge dot' },
                { name: 'about-spin', dur: '40s', ease: 'linear', usage: 'About stamp rotation' },
                { name: 'about-scroll-pulse', dur: '2s', ease: 'ease-in-out', usage: 'About scroll indicator' }
              ].map(a => (
                <tr key={a.name}>
                  <td className="mono-val" style={{ color: 'var(--green)' }}>{a.name}</td>
                  <td className="mono-val">{a.dur}</td>
                  <td className="mono-val">{a.ease}</td>
                  <td>{a.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          19. IMAGE PATTERNS (NEW)
      ═══════════════════════════════════════════ */}
      <section className="cream-section eng-grid section-pad">
        <div className="container">
          <SectionLabel>Image Patterns</SectionLabel>

          <SubLabel>Placeholder Gradients</SubLabel>
          <p style={{ color: 'var(--g500)', marginBottom: 24, maxWidth: 600 }}>
            When images are absent, gradient fills maintain visual consistency.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 32 }}>
            <div>
              <div style={{ height: 120, borderRadius: 'var(--r)', background: 'linear-gradient(135deg, var(--g100), var(--g200))' }} />
              <MonoLabel>News card placeholder</MonoLabel>
            </div>
            <div>
              <div style={{ height: 120, borderRadius: 'var(--r)', background: 'linear-gradient(135deg, var(--dark), var(--navy))' }} />
              <MonoLabel>Division card visual</MonoLabel>
            </div>
            <div>
              <div style={{ height: 120, borderRadius: 'var(--r)', background: 'linear-gradient(140deg, #0c1f3a, #1a4580)' }} />
              <MonoLabel>T2 service card (v1)</MonoLabel>
            </div>
          </div>

          <SubLabel>T2 Service Card Variants</SubLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
            {[
              { name: 'v1', gradient: 'linear-gradient(140deg, #0c1f3a, #1a4580)' },
              { name: 'v2', gradient: 'linear-gradient(140deg, #091624, #12305a)' },
              { name: 'v3', gradient: 'linear-gradient(140deg, #0b2040, #1a4075)' },
              { name: 'v4', gradient: 'linear-gradient(140deg, #070e1a, #0e2545)' }
            ].map(v => (
              <div key={v.name}>
                <div style={{ height: 80, borderRadius: 'var(--r)', background: v.gradient }} />
                <MonoLabel>.{v.name}</MonoLabel>
              </div>
            ))}
          </div>

          <SubLabel>Image Treatment: Object-Fit</SubLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
            <div>
              <div style={{ height: 160, borderRadius: 'var(--r)', background: 'linear-gradient(135deg, #4a9, #38c)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--white)', background: 'rgba(0,0,0,0.3)', padding: '4px 12px', borderRadius: 4 }}>object-fit: cover</span>
                </div>
              </div>
              <MonoLabel>Gallery images, background fills</MonoLabel>
            </div>
            <div>
              <div style={{ height: 160, borderRadius: 'var(--r)', background: 'linear-gradient(135deg, #4a9, #38c)', position: 'relative', overflow: 'hidden', filter: 'saturate(0.15) brightness(0.6) contrast(1.15)' }}>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--white)', background: 'rgba(0,0,0,0.3)', padding: '4px 12px', borderRadius: 4 }}>desaturated treatment</span>
                </div>
              </div>
              <MonoLabel>About page images (desat + contrast)</MonoLabel>
            </div>
          </div>

          <SubLabel>Gallery Mosaic Grid</SubLabel>
          <div style={{
            display: 'grid', gridTemplateColumns: '1.3fr .7fr 1fr',
            gridTemplateRows: '1fr 1fr', gap: 12, height: 200, marginBottom: 8
          }}>
            <div style={{ gridRow: '1 / 3', background: 'linear-gradient(135deg, var(--dark), var(--navy))', borderRadius: 'var(--r)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>span 2 rows</span>
            </div>
            <div style={{ background: 'linear-gradient(135deg, var(--dark), var(--blue))', borderRadius: 'var(--r)' }} />
            <div style={{ background: 'linear-gradient(135deg, var(--dark), var(--blue))', borderRadius: 'var(--r)' }} />
            <div style={{ background: 'linear-gradient(135deg, var(--dark), var(--blue))', borderRadius: 'var(--r)' }} />
            <div style={{ background: 'linear-gradient(135deg, var(--dark), var(--blue))', borderRadius: 'var(--r)' }} />
          </div>
          <MonoLabel>grid-template-columns: 1.3fr .7fr 1fr · first-child spans 2 rows</MonoLabel>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          20. PAGE PATTERNS (NEW)
      ═══════════════════════════════════════════ */}
      <section className="white-section section-pad">
        <div className="container">
          <SectionLabel>Page Patterns</SectionLabel>
          <p style={{ color: 'var(--g500)', marginBottom: 32, maxWidth: 700 }}>
            Each page follows a scoped CSS pattern with a wrapper class (.about-page, .wwd-page, .t3-page). Components are isolated to avoid conflicts.
          </p>

          <SubLabel>Page Architecture</SubLabel>
          <table className="specs-table" style={{ marginBottom: 32 }}>
            <thead><tr><th>Page</th><th>Route</th><th>Scope Class</th><th>Hero Type</th><th>Key Components</th></tr></thead>
            <tbody>
              <tr><td>Home</td><td className="mono-val">/</td><td className="mono-val">—</td><td className="mono-val">Dark (3D)</td><td>HeroScene, IntegratedModel, GlobalPresence, Divisions</td></tr>
              <tr><td>About</td><td className="mono-val">/about/our-story</td><td className="mono-val">.about-page</td><td className="mono-val">Dark (particles)</td><td>HeroParticles, drag-scroll timeline, image reveal, GlobalPresence, CountUp</td></tr>
              <tr><td>What We Do</td><td className="mono-val">/what-we-do</td><td className="mono-val">.wwd-page</td><td className="mono-val">White (particles)</td><td>HeroParticles, 5-tab integration model, drag-scroll gallery, capability matrix</td></tr>
              <tr><td>Division (T2)</td><td className="mono-val">/what-we-do/:slug</td><td className="mono-val">.t2-page</td><td className="mono-val">Dark (blueprint)</td><td>T2 Hero, SubNav, ServiceGrid, AdvDiagram, FlowSteps</td></tr>
              <tr><td>Service (T3)</td><td className="mono-val">/what-we-do/:div/:svc</td><td className="mono-val">.t3-page</td><td className="mono-val">Dark (photo)</td><td>Sibling nav, rating system, drag-scroll gallery, specs table</td></tr>
            </tbody>
          </table>

          <SubLabel>Shared Interaction Patterns</SubLabel>
          <table className="specs-table" style={{ marginBottom: 32 }}>
            <thead><tr><th>Pattern</th><th>Used In</th><th>Behavior</th></tr></thead>
            <tbody>
              <tr><td>Drag-to-scroll</td><td className="mono-val">About timeline, WhatWeDo gallery, T3 gallery</td><td>mouseDown/Move/Up with 1.5x multiplier, cursor: grab/grabbing, hidden scrollbar</td></tr>
              <tr><td>Dot indicators</td><td className="mono-val">About timeline, WhatWeDo gallery</td><td>Active dot expands to 24px pill (blue), inactive 8px circle (g200), clickable</td></tr>
              <tr><td>Prev/Next buttons</td><td className="mono-val">About timeline, WhatWeDo gallery</td><td>40px circle, g200 border, hover: blue border + shadow, scrollBy one card width</td></tr>
              <tr><td>ScrollReveal</td><td className="mono-val">All pages</td><td>IntersectionObserver, translateY(24px) → 0, opacity 0 → 1, threshold 0.15</td></tr>
              <tr><td>CountUp</td><td className="mono-val">About stats, home stats</td><td>Animated number counter, triggers on IntersectionObserver</td></tr>
              <tr><td>Image reveal wipe</td><td className="mono-val">About manifesto</td><td>::after pseudo scaleX(1→0) with 1.2s transition, desaturated → partial color</td></tr>
            </tbody>
          </table>

          <SubLabel>Navbar Adaptation</SubLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <div className="dark-section" style={{ padding: 20, borderRadius: 'var(--r-lg)', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--green)', marginBottom: 4 }}>Dark Hero Pages</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>Home, About, Divisions, Services</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>White text → blue text on scroll</div>
            </div>
            <div style={{ padding: 20, borderRadius: 'var(--r-lg)', background: 'var(--white)', border: '1px solid var(--g150)', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--blue)', marginBottom: 4 }}>White Hero Pages</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g400)' }}>What We Do</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g300)', marginTop: 4 }}>Blue text always</div>
            </div>
            <div style={{ padding: 20, borderRadius: 'var(--r-lg)', background: 'var(--surface)', border: '1px solid var(--g150)', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--blue)', marginBottom: 4 }}>Scrolled State</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g400)' }}>All pages (after 50px)</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--g300)', marginTop: 4 }}>White bg + shadow + blue text</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
