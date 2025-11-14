import { useState } from 'react';
// Importiamo il Service per comunicare con il Backend
import { register } from '../services/utilisateurService'; 

const RegisterPage = () => {
    
    
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        motDePasse: ''
    });
    // Stato per il feedback visivo (messaggio di successo/errore)
    const [message, setMessage] = useState('');

    // aggiorna lo stato ad ogni digitazione
    const handleChange = (e) => {
        setFormData({
            ...formData, // Mantiene i valori degli altri campi
            [e.target.name]: e.target.value // Aggiorna il campo corrente
        });
        setMessage(''); // Resetta i messaggi quando l'utente inizia a digitare
    };

    // invia i dati all'API
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setMessage('Registrazione in corso...'); 

        try {
            // Chiama il Service e attende la risposta del Backend
            const response = await register(formData);

            if (response.success) {
                // SUCCESSO: Mostra messaggio verde e resetta il form
                setFormData({ nom: '', prenom: '', email: '', motDePasse: '' });
                setMessage('Registrazione effettuata con successo!');
            } else {
                // FALLIMENTO (Errore 409 dal Backend): Mostra messaggio rosso/arancio
                setMessage('Errore: ' + response.message);
            }

        } catch (error) {
            // Errore di rete (es. Backend spento)
            console.error("Errore di rete/connessione:", error);
            setMessage('Errore: Impossibile connettersi al server. Verifica il Backend.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Iscrizione Utente</h2>
            
            {/* Blocco per mostrare il messaggio di feedback */}
            {message && (
                <div className={'alert ' + (message.includes('successo') ? 'alert-success' : 'alert-danger')}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {/* Campo NOM */}
                <div className="mb-3">
                    <label htmlFor="nom" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="nom" name="nom" value={formData.nom} onChange={handleChange} required />
                </div>

                {/* Campo COGNOME */}
                <div className="mb-3">
                    <label htmlFor="prenom" className="form-label">Cognome</label>
                    <input type="text" className="form-control" id="prenom" name="prenom" value={formData.prenom} onChange={handleChange} required />
                </div>

                {/* Campo EMAIL */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                {/* Campo PASSWORD */}
                <div className="mb-3">
                    <label htmlFor="motDePasse" className="form-label">Password</label>
                    <input type="password" className="form-control" id="motDePasse" name="motDePasse" value={formData.motDePasse} onChange={handleChange} required />
                </div>

                <button type="submit" className="btn btn-primary">
                    Registrati
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;