import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/utilisateurService";





const LoginPage = () => {

    const [formData, setFormData] = useState({
        email: '',
        motDePasse: ''
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData, // Mantiene i valori degli altri campi
            [e.target.name]: e.target.value // Aggiorna il campo corrente
        });
        setMessage(''); // Resetta i messaggi quando l'utente inizia a digitare
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Login in corso...');

        try {
            const response = await login(formData);
            if (response.success) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userRole', response.data.user.role)
                localStorage.setItem('userId', response.data.user.id);
                navigate('admin', { replace: true }); //replace true è per sostituire la pagina attuale con admin

            } else {
                setMessage('Errore' + response.message)
            }

        } catch (error) {
            console.error("Errore di rete", error);
            setMessage('Errore: Impossibile connettersi al server. Verifica il Backend.')
        }

    }


   

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">

                <div className="col-md-6 bg-white p-4 rounded shadow">



                    <h2 className="text-center mb-4">Accesso Utente (Login)</h2>


                    {message && (
                        <div className={'alert ' + (message.includes('successo') ? 'alert-success' : 'alert-danger')}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>


                        <div className="mb-3">
                            <label htmlFor="motDePasse" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="motDePasse"
                                name="motDePasse"
                                value={formData.motDePasse}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Accedi
                        </button>
                    </form>
                </div>





            </div>
        </div>
    );
};




export default LoginPage;