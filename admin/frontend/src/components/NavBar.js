import { Link } from "react-router-dom";

export default function NavBar(){
    return(
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-3">
            <div className="container">
                <Link className="navbar-brand" to="/"><h2>Dashboard</h2></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/"><h4>Users</h4></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/posts"><h4>Posts</h4></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/stats"><h4>Statistics</h4></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}