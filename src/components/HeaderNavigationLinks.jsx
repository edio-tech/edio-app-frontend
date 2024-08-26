import useAuth from "hooks/useAuth";
import { Axe, CircleHelp, Cookie, Home, PanelTopDashed, Tally5, PenTool } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";


const HeaderNavigationLinks = () =>
{
    const location = useLocation();
    const { auth } = useAuth();

    return (
        <nav className="landing-page-nav">
            <ul className="landing-page-links">
                {
                    auth?.role === 'ADMIN' && <>
                        {/* <li>
                            <Link to="/" className="landing-page-link">
                                <Home color="black" />
                                <span>Home</span>
                            </Link>
                        </li> */}
                        <li>
                            <Link to="/admin/all-creators" className="landing-page-link">
                                <PanelTopDashed color="black" />
                                <span>Creators</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/demo/create-demo" className="landing-page-link">
                                <Axe color="black" />
                                <span>Demo</span>
                            </Link>
                        </li>
                        {/* <li>
                            <Link to="/leaderboard" className="landing-page-link">
                                <Tally5 color="black" />
                                <span>Leaderboard</span>
                            </Link>
                        </li> */}
                        <li>
                            <Link to="/creator-portal" className="landing-page-link">
                                <PenTool color="black" />
                                <span>Creator Portal</span>
                            </Link>
                        </li>
                    </>
                }
                {/* <li>
                    <Link to="/support" className="landing-page-link">
                        <CircleHelp color="black" />
                        <span>Help</span>
                    </Link>
                </li>
                <li>
                    <Link to="/privacy" className="landing-page-link">
                        <Cookie color="black" />
                        <span>Privacy</span>
                    </Link>
                </li> */}
                
                {
                    location.pathname === '/' && <>
                        {/* New anchor links for the landing page */}
                        <li>
                            <a href="#hero" className="landing-page-link">
                                <span>About</span>
                            </a>
                        </li>
                        <li>
                            <a href="#creators" className="landing-page-link">
                                <span>Creators</span>
                            </a>
                        </li>
                        <li>
                            <a href="#learners" className="landing-page-link">
                                <span>Learners</span>
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className="landing-page-link">
                                <span>Contact</span>
                            </a>
                        </li>
                    </>
                }
                
            </ul>
        </nav>
    )
}
export default HeaderNavigationLinks;