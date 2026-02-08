import { useEffect, useRef } from 'react';

export default function T2Flow({ data }) {
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
        <section className="flowsec" ref={sectionRef}>
            <div className="flowsec-in">
                <div style={{ textAlign: 'center' }}>
                    <div className="overline rv" style={{ justifyContent: 'center' }}>Service Flow</div>
                    <h2 className="sec-h rv rd1" style={{ color: '#fff', maxWidth: 500, margin: '0 auto 8px' }}>
                        {data.flow.title} <em>{data.flow.titleEm}</em>
                    </h2>
                    <p className="sec-desc rv rd2" style={{ color: 'rgba(255,255,255,0.35)', margin: '0 auto' }}>
                        {data.flow.desc}
                    </p>
                </div>

                <div className="frow rv rd3">
                    {data.flow.steps.map((step, i) => (
                        <div key={i} style={{ display: 'contents' }}>
                            <div className="fstep">
                                <div className="fstep-ring">
                                    <span>0{i + 1}</span>
                                </div>
                                <div className="fstep-name">{step.title}</div>
                                <div className="fstep-desc">{step.desc}</div>
                            </div>

                            {i < data.flow.steps.length - 1 && (
                                <div className="fconn">
                                    <svg width="40" height="12" viewBox="0 0 40 12">
                                        <path d="M0 6h36M32 1l6 5-6 5" stroke="rgba(4,229,134,0.25)" strokeWidth="1.2" fill="none" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flow-fb rv rd4">
                    <span>← Continuous feedback loops between all disciplines →</span>
                </div>
            </div>
        </section>
    );
}
