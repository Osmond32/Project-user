import jwt from 'jsonwebtoken';


const JWT_SECRET = 'CHIAVE_MOLTO_SEGRETA_PER_IL_PROGETTO';

// Funzione principale del Middleware per verificare l'autenticazione
export const checkAuth = (req, res, next) => {
    
    // Il token arriva nel formato: "Bearer [il tuo token lungo]"
    const authHeader = req.headers.authorization;
    
    // Controllo 1: Verifica se l'header 'Authorization' è presente
    if (!authHeader) {
        // 401: Non autorizzato - Header mancante
        return res.status(401).json({ message: "Accesso negato. Token non fornito." });
    }

    // Estrae il token rimuovendo il prefisso "Bearer "
    const token = authHeader.split(' ')[1];

    try {
        // 3. Verifica del Token: Usa la chiave segreta per decodificarlo
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // 4. Se la verifica ha successo: Aggiunge i dati dell'utente alla richiesta (req)
        req.user = decoded; 

        // 5. Passa al Controller successivo
        next(); 

    } catch (error) {
        // 6. Errore di verifica: Token non valido (scaduto, alterato, ecc.)
        // 401: Non autorizzato
        return res.status(401).json({ message: "Token non valido o scaduto." });
    }
};

// Funzione aggiuntiva per l'Autorizzazione (Controllo del Ruolo)
export const checkAdmin = (req, res, next) => {
    // Il middleware checkAuth ha già verificato il token e ha messo i dati in req.user
    
    // Controllo del Ruolo: Verifica se il ruolo è 'admin'
    if (req.user && req.user.role === 'admin') {
        // Se è Admin, passa al Controller
        next();
    } else {
        // 403: Proibito (L'utente è loggato, ma non ha i permessi necessari)
        return res.status(403).json({ message: "Accesso proibito. Richiede privilegi di amministratore." });
    }
};