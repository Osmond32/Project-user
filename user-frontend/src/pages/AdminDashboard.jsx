import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../services/utilisateurService';
import { deleteUser } from '../services/utilisateurService';

const AdminDashboard = () => {


    const navigate = useNavigate();

    // securitè
    useEffect(() => {
        // Recupera le chiavi di sessione
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('userRole');

        // Se no token o no admin 
        if (!token || userRole !== 'admin') {

            navigate('/login', { replace: true });
        }
    }, [navigate]); // 1 fois

    // se tutto questo è valido, continua il codice sotto

    // Inizializza gli stati per i dati (la lista degli utenti)
    const [users, setUsers] = useState([]); //si riempirà con la lista degli utenti nel back
    const [loading, setLoading] = useState(true); // Stato di caricamento
    const [error, setError] = useState(null);

    // La logica di fetching dei dati (chiamata API) andrà qui...

    useEffect(() => {
        // Definiamo la funzione asincrona per il fetching
        const fetchUsers = async () => {
            // L'API è protetta, quindi questa chiamata può fallire per 403 Forbidden
            const response = await getAllUsers();

            if (response.success) {
                // Successo: Aggiorna lo stato con i dati ricevuti
                setUsers(response.data);
                setError(null); // Pulisce eventuali errori precedenti
            } else {

                setError(response.message);
            }


            setLoading(false); //fine caricamento
        };

        // Eseguiamo la funzione fetchUsers solo se l'utente è Admin (cioè, se non è stato reindirizzato)
        if (localStorage.getItem('userRole') === 'admin') {
            fetchUsers();
        } else {
            // Se non è admin, non carichiamo ma finiamo lo stato di loading
            setLoading(false);
        }

    }, []);

    const handleDelete = async (userId) => {
        // Opzionale: Aggiungere una conferma utente qui (es. window.confirm)
        if (!window.confirm("Sei sicuro di voler eliminare questo utente?")) {
            return;
        }

        const response = await deleteUser(userId);

        if (response.success) {
            // Successo: Aggiorna la lista degli utenti nel Frontend
            // Usiamo il 'filtro' per rimuovere l'utente eliminato dallo stato attuale
            setUsers(users.filter(user => user.id !== userId));

            // Opzionale: Mostra un messaggio di successo all'utente
            alert(response.message || "Utente eliminato con successo!");
        } else {
            // Fallimento: Mostra l'errore
            setError(response.message);
        }
    };




    { loading && <p>Caricamento dati...</p> }
    { error && <div className="alert alert-danger">{error}</div> }


    return (
        <div className="container mt-5">
            <h1>Dashboard Amministratore</h1>
            <p>Accesso consentito. Utente: {localStorage.getItem('userRole')}</p>




            {!loading && !error && users.length > 0 && (
                <table className="table table-striped mt-4">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Cognome</th>
                            <th>Email</th>
                            <th>Ruolo</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.nom}</td>
                                <td>{user.prenom}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>

                                    <button
                                        className="btn btn-sm btn-warning me-2" onClick={() => navigate('/admin/edit/' + user.id)}>Modifica
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}> Elimina
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            )}

            {!loading && !error && users.length === 0 && (
                <div className="alert alert-info mt-4">Nessun utente trovato.</div>
            )}
        </div>
    );
};

export default AdminDashboard;