import { useEffect, useRef } from 'react';

export default function T2Advantage({ data }) {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('vis');
                }
            });
        }, { threshold: 0.1 });

        if (sectionRef.current) {
            const rvs = sectionRef.current.querySelectorAll('.rv');
            rvs.forEach(el => observer.observe(el));
        }

        return () => observer.disconnect();
    }, [data]);

    return (
        <section className="adv" ref={sectionRef}>
            <div className="adv-in">
                <div className="rv">
                    <div className="adv-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.5">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                    </div>
                    <h2 className="adv-h">
                        {data.advantage.title} <em>{data.advantage.titleEm}</em>
                    </h2>
                    <p className="adv-desc">
                        {data.advantage.desc}
                    </p>
                    <ul className="adv-list">
                        {data.advantage.list.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div className="adv-visual rv rd2">
                    <div className="adv-diagram">
                        <div dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 500 500" fill="none">${data.advantage.diagram}</svg>` }} style={{ width: '100%', height: 'auto', maxHeight: '100%', opacity: 0.85 }} />
                    </div>
                </div>
            </div>
        </section>
    );
}
