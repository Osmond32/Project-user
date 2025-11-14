import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    
    const navigate = useNavigate();

    const handleLogout = () => {

            //elimina
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        navigate('/', { replace: true }); // impedisce che possa tornare indietro
    };

    const isAuthenticated = !!localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                
                <a className="navbar-brand" onClick={() => navigate('/')}>Gestione Utenti</a>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        
                        {isAuthenticated ? (
                            <>
                                {/* Link Dashboard Utente */}
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => navigate('/dashboard')}>Dashboard Utente</a>
                                </li>

                                {/*  SOLO agli admin) */}
                                {userRole === 'admin' && (
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={() => navigate('/admin')}>Dashboard Admin</a>
                                    </li>
                                )}
                                
                               
                                <li className="nav-item">
                                    <button className="btn btn-outline-light" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            /* Link Login/Registrazione (visibili se non loggato) */
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => navigate('/login')}>Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => navigate('/register')}>Registrati</a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;