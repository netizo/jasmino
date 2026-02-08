import { useEffect, useRef } from 'react';

export default function T2CTA({ data }) {
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
            // The HTML puts .rv on cta-in
            const rv = sectionRef.current.querySelector('.rv');
            if (rv) observer.observe(rv);
        }

        return () => observer.disconnect();
    }, [data]);

    return (
        <section className="cta" ref={sectionRef}>
            <div className="cta-in rv">
                <div>
                    <h2 className="cta-h">
                        {data.cta.title} <em>{data.cta.titleEm}</em>
                    </h2>
                    <p className="cta-desc">
                        {data.cta.desc}
                    </p>
                </div>
                <div className="cta-btns">
                    <a className="btn btn-p" href="#">
                        Start a Conversation
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                    <a className="btn btn-s" href="#">
                        Download Brochure
                    </a>
                </div>
            </div>
        </section>
    );
}
