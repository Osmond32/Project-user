import * as utilisateurModel from '../models/utilisateurModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'CHIAVE_MOLTO_SEGRETA_PER_IL_PROGETTO';


export const addUtilisateur = async (req, res) => {


    const { nom, prenom, email, motDePasse} = req.body;

    try {

        const utilisateurExistant = await utilisateurModel.getUtilisateurByEmail(email);
        if (utilisateurExistant.length > 0) {
            return res.status(409).json({ message: "'email è gia utilizzata" });
        }
        const mdpHash = bcrypt.hashSync(motDePasse, 10);
        const result = await utilisateurModel.addUtilisateur(nom, prenom, email, mdpHash);

        res.status(201).json({
            message: "Utilizzatore creato con successo!",
            userId: result.insertId
        });

    } catch (error) {

        console.error("Errore nell'aggiunta de l'utilizzatore", error);
        res.status(500).json({ message: "Erreur serveur lors de la tentative d'inscription." });
    }
};




export const loginUtilisateur = async (req, res) => {

    //  Estrazione delle credenziali dalla richiesta POST
    const { email, motDePasse } = req.body;



    try {

        const utilisateurExistant = await utilisateurModel.getUtilisateurByEmail(email);

     
        if (utilisateurExistant.length === 0) {
            return res.status(401).json({ message: "Credenziali non valide." });
        }

        // L'utente esiste. Estraiamo l'oggetto utente (è il primo elemento dell'array)
        const user = utilisateurExistant[0];

        // Confronto Password: Confronta la password fornita con l'hash del DB
        // La funzione bcrypt.compare è asincrona e restituisce true o false
        const isMatch = await bcrypt.compare(motDePasse, user.password);

        if (!isMatch) {
            // Se il confronto fallisce (false), la password è sbagliata
            return res.status(401).json({ message: "Credenziali non valide." });
        }

// Successo: Generazione e invio del Token JWT
        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            JWT_SECRET, 
            { expiresIn: '1h' } 
        );

        // Invia la risposta con il token
        res.status(200).json({ 
            message: "Login riuscito", 
            token: token, // <-- IL NUOVO DATO FONDAMENTALE
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });
        

    } catch (error) {
        // Gestione degli errori del server o del database
        console.error("Errore nel controller loginUtilisateur:", error);
        res.status(500).json({ message: "Erreur serveur lors de la tentative de connexion." });
    }
};

export const getAllUtilisateurs = async ( req,res) =>{
    try {
        const utilisateurs = await utilisateurModel.getAllUtilisateurs();
        res.status(200).json(utilisateurs)
    } catch (error) {
        console.error("Errore recupero utilizzatori",error)
    }
}

export const getUtilisateurById = async (req, res) => {

    const id = req.params.id;

    try {
        const utilisateurById = await utilisateurModel.getUtilisateurById(id);
        if (utilisateurById.length === 0){// se non trovare users
           return res.status(404).json({ message: "Utilisateur non trouvé" }); 
        }
        res.status(200).json(utilisateurById ); // restituisce primo elemento <------ abbiamo eliminat [] dentro(vedere se ci sn possibili problemi in futuro)
    } catch (error) {
        console.error("une erreur est survenue lors recuperation pèar ID", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

export const updateUtilisateur = async (req,res) => {

    const {nom, prenom, email, motDePasse} = req.body;
    const idUtilisateur = req.params.id;

    try {

        const existant = await utilisateurModel.getUtilisateurById(idUtilisateur);

        if (existant.length === 0){

            res.status(404).json({message: "utilisateur inconnu"})

        } else {

        const mdpHash = bcrypt.hashSync(motDePasse, 10);

        const updatedUtilisateur = await utilisateurModel.updateUtilisateur(nom, prenom, email, mdpHash, idUtilisateur);

        res.status(200).json({message: "utilisateur modifié", updatedUtilisateur});
        }
    } catch (error) {
     
        res.status(500);
        console.error(error);
    }
};

export const deleteUtilisateur = async(req,res) => {
    const idUtilisateur = req.params.id;

    try {
        const existant = await utilisateurModel.deleteUtilisateur(idUtilisateur)
         if(existant.length === 0){
            res.status(404).json({message: "utilisateur inconnu"});
        } else {
            const deletedUtilisateur = await utilisateurModel.deleteUtilisateur(idUtilisateur);

            res.status(200).json({message: "utilisateur supprimé", deletedUtilisateur});
        }

    } catch (error) {
        console.error(error);
    }
}