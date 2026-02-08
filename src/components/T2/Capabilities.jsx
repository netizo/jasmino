import { useEffect, useRef } from 'react';

export default function T2Capabilities({ data }) {
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
            const rvs = sectionRef.current.querySelectorAll('.rv, .tgrid');
            rvs.forEach(el => observer.observe(el));
        }

        return () => observer.disconnect();
    }, [data]);

    return (
        <section className="tsec" ref={sectionRef}>
            <div className="tsec-in">
                <div className="overline rv">Capabilities</div>
                <h2 className="sec-h rv rd1">
                    {data.capabilitiesHeader?.title} <em>{data.capabilitiesHeader?.titleEm}</em>
                </h2>
                <p className="sec-desc rv rd2">
                    {data.capabilitiesHeader?.desc}
                </p>

                <div className="tgrid rv rd3">
                    {data.capabilities.map((col, i) => (
                        <div key={i}>
                            <div className="tcol-h">{col.title}</div>
                            <div className="trows">
                                {col.items.map((item, j) => (
                                    <div key={j} className="trow">
                                        <div className="trow-abbr">{item.icon}</div>
                                        <div className="trow-info">
                                            <strong>{item.name}</strong>
                                            <span>{item.desc}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
