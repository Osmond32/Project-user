import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../services/utilisateurService";


const UserDashboard = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState(null); //un solo utent
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const loggedInUserId = localStorage.getItem('userId');// utente loggato

    useEffect(() => {

        if (!token || !loggedInUserId) {
            navigate('/login', { replace: true }); // serve per non far tornare indietro l'utente
        }
    }, [navigate, token, loggedInUserId]); // esegui il codice solo se uno di questi elementi cambia



    useEffect(() => {

        const fetchUser = async () => {
            const response = await getUserById(loggedInUserId); //usa id utente

            if (response.success && response.data.length > 0) {
                setUser(response.data[0]);
                setError(null);
            } else {
                setError(response.message || "Impossibile caricare dati profilo");
            }
            setLoading(false);//messagg caricamento

        };
        if (loggedInUserId) {
            fetchUser();
        }
    }, [loggedInUserId])


    return (
        <div className="container mt-5">
            <h1>Il Mio Profilo Utente</h1>
            <p>Benvenuto nell'area privata. Il tuo ruolo attuale è: {localStorage.getItem('userRole')}</p>
            
            {user && ( 
                <div className="card p-4">
                    <h3>Dettagli Account:</h3>
                    <p><strong>Nome:</strong> {user.nom}</p>
                    <p><strong>Cognome:</strong> {user.prenom}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    
                    <button 
                        className="btn btn-warning me-2" 
                        onClick={() => navigate('/admin/edit/' + user.id)}
                    >
                        Modifica il mio Account
                    </button>
                    <button className="btn btn-danger">Elimina il mio Account</button>
                </div>
            )}
            
      
        </div>
    );
};
export default UserDashboard;