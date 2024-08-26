import useAuth from "hooks/useAuth";
import { Axe, CircleHelp, Cookie, Home, PanelTopDashed, Tally5, PenTool } from "lucide-react";
import { Link } from "react-router-dom";


const HeaderNavigationLinks = () =>
{
    const { auth } = useAuth();

    return (
        <nav className="landing-page-nav">
            <ul className="landing-page-links">
                <li>
                    <Link to="/" className="landing-page-link">
                        <Home color="black" />
                        <span>Home</span>
                    </Link>
                </li>
                {
                    auth?.role === 'ADMIN' && <>
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
                        <li>
                            <Link to="/leaderboard" className="landing-page-link">
                                <Tally5 color="black" />
                                <span>Leaderboard</span>
                            </Link>
                        </li>
                    </>
                }
                <li>
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
                </li>
                <li>
                    <Link to="/creator-portal" className="landing-page-link">
                        <PenTool color="black" />
                        <span>Creator Portal</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
export default HeaderNavigationLinks;