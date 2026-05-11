import mysql from 'mysql2/promise';
import 'dotenv/config'; // Questo carica le variabili dal file .env

// Usiamo la stringa di connessione (URI) che è più pratica per il cloud
const connectionString = process.env.MYSQL_URL || {
    host: "localhost",
    user: "root",
    password: "Pixelwhisky",
    database: "gestione_utenti",
    port: 3306
};

const connexion = mysql.createPool(connectionString);

// Test della connessione
connexion.getConnection()
    .then(() => console.log("database OK 🟢 (Cloud/Env)"))
    .catch(error => {
        console.error("database KO 🔴", error);
        // Piccolo trucco: se fallisce, stampiamo l'URL usato (senza password) per debug
        console.log("Stai provando a connetterti a:", process.env.MYSQL_URL ? "URL Cloud" : "Localhost");
    });

export default connexion;