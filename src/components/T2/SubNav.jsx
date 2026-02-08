import { Link, useLocation } from 'react-router-dom';

export default function T2SubNav() {
    const location = useLocation();
    const currentSlug = location.pathname.split('/').pop();

    const links = [
        { name: 'Engineering Design', slug: 'engineering-design' },
        { name: 'Equipment Manufacturing', slug: 'equipment-manufacturing' },
        { name: 'Corrosion Protection', slug: 'corrosion-protection' },
        { name: 'Rubber Products', slug: 'rubber-products' }
    ];

    return (
        <nav className="topnav">
            <div className="topnav-in">
                <span className="nav-tag">What We Do</span>
                {links.map(link => (
                    <Link
                        key={link.slug}
                        to={`/what-we-do/${link.slug}`}
                        className={`nl ${currentSlug === link.slug ? 'active' : ''}`}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
