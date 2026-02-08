import { useEffect, useRef } from 'react';

export default function T2Gallery({ data }) {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('vis');
                }
            });
        }, { threshold: 0.1 });

        if (sectionRef.current) {
            sectionRef.current.classList.add('rv-s'); // Add reveal class
            observer.observe(sectionRef.current);
        }

        const handleScroll = () => {
            if (!sectionRef.current || !gridRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const ratio = rect.top / window.innerHeight;

            if (ratio < 1.2 && ratio > -1.2) {
                const images = gridRef.current.querySelectorAll('.gal-item img');
                images.forEach((img, i) => {
                    img.style.transform = `scale(1.06) translateY(${ratio * (12 + i * 4)}px)`;
                });
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, [data]);

    return (
        <section className="gallery" ref={sectionRef}>
            <div className="gal-frame"></div>

            <div className="gal-overlay">
                <div className="gal-overlay-tag">{data.gallery.overlayTag || 'Engineering in Action'}</div>
                <div className="gal-overlay-title">
                    <span dangerouslySetInnerHTML={{ __html: data.gallery.overlayTitle.replace(/(scale|rubber|lives|corrosion|precision)/gi, '<em>$1</em>') }} />
                </div>
            </div>

            <div className="gal-ct">01 — 0{data.gallery.items.length}</div>

            <div className="gal-mosaic" ref={gridRef}>
                {data.gallery.items.map((item, i) => (
                    <div key={i} className="gal-item">
                        <img
                            src={item.img || `https://via.placeholder.com/800x600?text=${item.title}`}
                            alt={item.title}
                            loading="lazy"
                        />
                        <div className="gal-cap">
                            <span className="gal-tag">{item.tag}</span>
                            <span className="gal-title">{item.title}</span>
                            <span className="gal-sub">{item.sub}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
