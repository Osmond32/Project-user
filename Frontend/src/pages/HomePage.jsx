import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/background.jpg';

const HomePage = () => {
    const navigate = useNavigate();

    const sectionStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        color: '#f8f9fa',
        paddingTop: '50px',
        paddingBottom: '50px'
    };

    return (
        <div style={sectionStyle}>
            <div className="container text-center mt-5">
                <header className="py-5">
                    <h1 className="display-4 fw-bold mb-3">
                        Gestione Utenti Centralizzata 🔐 / Gestion Utilisateurs Centralisée
                    </h1>
                    
                </header>

                <section className="row justify-content-center">
                    <div className="col-lg-8 mb-4">
                        <div className="card shadow-sm p-4">
                            <h2 className="h4 mb-3">Descrizione Progetto / Description du Projet</h2>
                            <p className="text-start">
                                Questo progetto dimostra l'implementazione di un'API RESTful sicura (Node.js + Express) con architettura MVC, che utilizza il Token JWT per l'autorizzazione basata sui ruoli (Admin vs Utente standard) e un frontend React per l'interazione utente.
                                <br />
                                <br />
                                Ce projet démontre la mise en œuvre d'une API RESTful sécurisée (Node.js + Express) avec architecture MVC, utilisant le Token JWT pour l'autorisation basée sur les rôles (Admin vs Utilisateur standard) et un frontend React pour l'interaction utilisateur.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mt-4">
                    <h2 className="h5 mb-4">Inizia Qui / Commencez Ici</h2>


                    <button
                        className="btn btn-primary btn-lg me-3"
                        onClick={() => navigate('/login')}
                    >
                        Accedi / Se Connecter
                    </button>


                    <button
                        className="btn btn-outline-success btn-lg"
                        onClick={() => navigate('/register')}
                    >
                        Registrati / S'inscrire
                    </button>
                </section>
            </div>
        </div>
    );
};

export default HomePage;