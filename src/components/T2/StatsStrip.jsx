import { useRef } from 'react';
import CountUp from '../CountUp';
import { useStagger } from '../../hooks/useGsap';

export default function T2StatsStrip({ data }) {
  const sectionRef = useStagger('.t2-stat', { stagger: 0.1, y: 24 });

  const stats = data.statsStrip || data.hero?.stats || [];
  if (!stats.length) return null;

  return (
    <section className="t2-stats" ref={sectionRef}>
      <div className="t2-stats-grid-bg" />
      <div className="t2-stats-in">
        {stats.map((stat, i) => (
          <div key={i} className="t2-stat">
            <div className="t2-stat-num">
              <CountUp end={stat.num} suffix={stat.suffix || ''} />
            </div>
            <div className="t2-stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
