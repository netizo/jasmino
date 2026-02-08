import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { divisions } from '../../data/divisions';

export default function T2ServiceGrid({ data }) {
    const { divisionSlug } = useParams();
    const division = divisions.find(d => d.slug === divisionSlug);
    const serviceSlugMap = {};
    if (division) {
        division.services.forEach(s => { serviceSlugMap[s.name] = s.slug; });
    }
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
            const rvs = sectionRef.current.querySelectorAll('.rv, .scard');
            rvs.forEach(el => observer.observe(el));
        }

        return () => observer.disconnect();
    }, [data]);

    return (
        <section className="svcs" ref={sectionRef}>
            <div className="svcs-in">
                <div className="overline rv">Our Services</div>
                <h2 className="sec-h rv rd1">
                    {data.services.title} <em>{data.services.titleEm}</em>
                </h2>
                <p className="sec-desc rv rd2">
                    {data.services.desc}
                </p>

                <div className="sgrid">
                    {data.services.items.map((item, i) => (
                        <article key={i} className="scard" style={{ '--i': i }}>
                            <div className={`scard-visual v${(i % 4) + 1}`}>
                                <span className="scard-ix">{item.num}</span>
                                <div className="scard-stat">
                                    <span className="scard-stat-num">{item.num}</span>
                                    <span className="scard-stat-label">{item.title}</span>
                                </div>
                                <div className="scard-ev">
                                    {item.evidence && item.evidence.map((ev, j) => (
                                        <div key={j} style={{ display: 'contents' }}>
                                            {j > 0 && <i className="ev-dot"></i>}
                                            <span>{ev}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="scard-body">
                                <h3 className="scard-title">{item.title}</h3>
                                <p className="scard-desc">{item.desc}</p>

                                <div className="scard-tags">
                                    {item.tags.map((tag, j) => (
                                        <span key={j} className="stag">
                                            <span>{tag}</span>
                                        </span>
                                    ))}
                                </div>

                                <Link className="scard-link" to={serviceSlugMap[item.title] ? `/what-we-do/${divisionSlug}/${serviceSlugMap[item.title]}` : '#'}>
                                    Explore Service
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
