// import mysql2 module
import mysql from 'mysql2/promise';

// creation de la connexion à la base de données
const connexion = mysql.createPool({
    //parametre de connexion
    host:"localhost",
    user:"root",
    password:"Pixelwhisky",
    database:"gestione_utenti", // modificare sempre il nome della database che ho creato
    port: 3306
});

// test de la connexion
connexion.getConnection()
// si la connexion est réussie
    .then(() => 
    console.log("database OK 🟢​"))
    // si la connexion échoue
    .catch(error => console.error("database KO 🔴​", error));

// exportation de la connexion
export default connexion;