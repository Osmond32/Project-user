import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser} from '../services/utilisateurService';

const EditUserPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});

   
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(''); // Per il feedback di successo/errore

    //  aggiorna lo stato ad ogni digitazione
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setMessage(''); 
    };
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Invio modifica in corso...'); 
        
       
        
        try {
           
            const response = await updateUser(id, formData);

            if (response.success) {
                
                setMessage("Utente modificato con successo!");
                
                // Reindirizza l'Admin alla dashboard per vedere i risultati
                navigate('/admin', { replace: true }); 
            } else {
               
                setMessage("Errore: " + response.message);
            }

        } catch (error) {
            
            console.error("Errore di rete/connessione:", error);
            setMessage('Errore: Impossibile connettersi al server. Verifica il Backend.');
        }
    };



    useEffect(() => {
        // ... (La logica di useEffect che scarica i dati e chiama setFormData(response.data[0])) ...
        const fetchUserData = async () => {
            
            const response = await getUserById(id);
         

            if (response.success && response.data.length > 0) {

                // Setta i dati per il pre-popolamento
                setFormData(response.data[0]);
                setLoading(false);
            } else {
                setError(response.message || "Utente non trovato o accesso negato.");
                setLoading(false);

            }
        };
        fetchUserData();

    }, [id, navigate]);



    if (loading) return <div className="container mt-5">Caricamento dati utente...</div>;
    if (error) return <div className="container mt-5 alert alert-danger">Errore: {error}</div>;


    return (
        <div className="container mt-5">
            <h2>Modifica Utente #{id}</h2>

            {message && (
                <div className={`alert ${message.includes('successo') ? 'alert-success' : 'alert-danger'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="nom" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="nom" name="nom" value={formData.nom || ''} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="prenom" className="form-label">Cognome</label>
                    <input type="text" className="form-control" id="prenom" name="prenom" value={formData.prenom || ''} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email (Non modificabile)</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email || ''} onChange={handleChange} disabled />
                </div>

                <div className="mb-3">
                    <label htmlFor="motDePasse" className="form-label">Nuova Password</label>
                    <input type="password" className="form-control" id="motDePasse" name="motDePasse" value={formData.motDePasse || ''} onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-warning me-2">Salva Modifiche</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin')}>Annulla</button>
            </form>
        </div>
    );
};

export default EditUserPage;