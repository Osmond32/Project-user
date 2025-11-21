import { useState } from 'react';

import { register } from '../services/utilisateurService'; 

const RegisterPage = () => {
    
    
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        motDePasse: ''
    });
    
    const [message, setMessage] = useState('');

    // aggiorna lo stato ad ogni digitazione
    const handleChange = (e) => {
        setFormData({
            ...formData, // Mantiene i valori degli altri campi
            [e.target.name]: e.target.value // Aggiorna il campo corrente
        });
        setMessage(''); // Resetta i messaggi quando l'utente inizia a digitare
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setMessage('Registrazione in corso...'); 

        try {
            
            const response = await register(formData);

            if (response.success) {
                
                setFormData({ nom: '', prenom: '', email: '', motDePasse: '' });
                setMessage('Registrazione effettuata con successo!');
            } else {
                
                setMessage('Errore: ' + response.message);
            }

        } catch (error) {
           
            console.error("Errore di rete/connessione:", error);
            setMessage('Errore: Impossibile connettersi al server. Verifica il Backend.');
        }
    };

    return (
        <div className="container mt-5">

            <div className='row justify-content-center'>
            <div className='col-md-6 bg-white p-4 rounded shadow'>
            
            <h2 className='text-center mb-4'>Iscrizione Utente</h2>
            
           
            {message && (
                <div className={'alert ' + (message.includes('successo') ? 'alert-success' : 'alert-danger')}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit}>
               
                <div className="mb-3">
                    <label htmlFor="nom" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="nom" name="nom" value={formData.nom} onChange={handleChange} required />
                </div>

                
                <div className="mb-3">
                    <label htmlFor="prenom" className="form-label">Cognome</label>
                    <input type="text" className="form-control" id="prenom" name="prenom" value={formData.prenom} onChange={handleChange} required />
                </div>

                
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                
                <div className="mb-3">
                    <label htmlFor="motDePasse" className="form-label">Password</label>
                    <input type="password" className="form-control" id="motDePasse" name="motDePasse" value={formData.motDePasse} onChange={handleChange} required />
                </div>

                <button type="submit" className="btn btn-primary">
                    Registrati
                </button>
            </form>
            </div>
            </div>


        </div>
    );
};

export default RegisterPage;