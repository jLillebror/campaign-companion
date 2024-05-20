import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <div className="container-fluid">
        <Link style={{ textDecoration: 'none' }} href="/" passHref>
          <div className="navbar-brand">Campaign Companion</div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link style={{ textDecoration: 'none' }} href="/campaigns/main" passHref>
                <div className="nav-link">Campaigns</div>
              </Link>
            </li>
            <li className="nav-item">
              <Link style={{ textDecoration: 'none' }} href="/characters/main" passHref>
                <div className="nav-link">Characters</div>
              </Link>
            </li>
            <li className="nav-item">
              <Link style={{ textDecoration: 'none' }} href="/notes/main" passHref>
                <div className="nav-link">Notes</div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
