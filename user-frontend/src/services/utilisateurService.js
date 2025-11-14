//permette di far comunicare il back col front, quindi fa comunicare 



import axios from 'axios';


const API_URL = 'http://localhost:3000/api';

export const register = async (userData) => {
    try {
        const response = await axios.post(API_URL + '/addUtilisateur', userData);

        // Successo: restituisce l'oggetto con flag 'success: true'
        return {
            success: true,
            data: response.data
        };

    } catch (error) {
        // Fallimento: restituisce l'oggetto con flag 'success: false' e i dati dell'errore
        let errorMessage = "Errore di connessione al server.";

        if (error.response) {
            errorMessage = error.response.data.message || "Errore sconosciuto.";
        }

        return {
            success: false,
            message: errorMessage
        };
    }
};

export const login = async (userData) => {
    try {
        const response = await axios.post(API_URL + '/loginUtilisateur', userData);

        return {
            success: true,
            data: response.data  //okkkkkk
        };

    } catch (error) {
        let errorMessage = "Errore connessione";

        if (error.response) {
            errorMessage = error.response.data.message || "Errore sconosciuto.";
        }

        return {
            success: false,
            message: errorMessage
        }
    }
}

export const getUserById = async (userId) => {
    const token = localStorage.getItem('token'); 
    
    if (!token) {
        return { success: false, message: "Utente non autenticato." };
    }

    try {
        const config = {
            headers: {
                Authorization: 'Bearer ' + token 
            }
        };

        // Chiamata GET all'endpoint /utilisateurById/:id
        const response = await axios.get(API_URL + '/utilisateurById/' + userId, config); 
        
        return { 
            success: true, 
            data: response.data 
        };
        
    } catch (error) {
        let errorMessage = "Errore durante il recupero dell'utente per l'editing.";

        if (error.response) {
            errorMessage = error.response.data.message || error.message; 
        }
        
        return { 
            success: false, 
            message: errorMessage 
        };
    }
};


export const getAllUsers = async () => {
    // Recupera il Token JWT dal browser
    const token = localStorage.getItem('token');


    if (!token) {
        // Se il token non c'è, restituisce un errore senza fare la chiamata API
        return { success: false, message: "Utente non autenticato. Effettuare il login." };
    }

    try {
        // Configurazione dell'Header Authorization (Essenziale per la sicurezza)
        const config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        };

        // 4. Chiamata GET all'endpoint protetto
        const response = await axios.get(API_URL + '/allUtilisateurs', config);

        return {
            success: true,
            data: response.data
        };

    } catch (error) {
        let errorMessage = "Errore durante il recupero degli utenti.";

        if (error.response) {
            // Include l'errore 403 Forbidden dal Middleware Admin
            errorMessage = error.response.data.message || error.message;
        }

        return {
            success: false,
            message: errorMessage
        };
    }
};


export const deleteUser = async (userId) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return { success: false, message: "Utente non autenticato. Effettuare il login." };
    }

    try {
        // Configurazione per inviare il Token nell'Header 'Authorization'
        const config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        };

        // Chiamata DELETE all'endpoint /deleteUtilisateur/:id
        const response = await axios.delete(`${API_URL}/deleteUtilisateur/${userId}`, config);

        return {
            success: true,
            message: response.data.message // Messaggio di successo dal Backend
        };

    } catch (error) {
        let errorMessage = "Errore durante l'eliminazione dell'utente.";

        if (error.response) {
            errorMessage = error.response.data.message || error.message;
        }

        return {
            success: false,
            message: errorMessage
        };
    }
};



export const updateUser = async (userId, userData) => { 
    const token = localStorage.getItem('token');

    if (!token) {
        return { success: false, message: "Utente non autenticato. Effettuare il login." };
    }

    try {
        const config = {
            headers: { Authorization: 'Bearer ' + token }
        };


        const response = await axios.put(API_URL + '/updateUtilisateur/' + userId, userData, config);

        return {
            success: true,
            message: response.data.message 
        };

    } catch (error) {
        let errorMessage = "Errore durante la modifica dell'utente."; // Specifico per l'errore di PUT

        if (error.response) {
            errorMessage = error.response.data.message || error.message;
        }

        return {
            success: false,
            message: errorMessage
        };
    }
};



