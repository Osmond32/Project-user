import connexion from "../config/bdd.js"

export const getUtilisateurByEmail = async (email) =>{
    const selectUtilisateurByEmail = `
    SELECT id, email, password, role 
    FROM users
    WHERE email = ?;    
    `
    const[response] = await connexion.query(selectUtilisateurByEmail, [email]);
    return response
};

export const addUtilisateur = async (nom, prenom, email, motDePasse) => {
    const insertUtilisateur = `
    INSERT INTO users (nom, prenom, email, password)
    VALUES (?,?,?,?);
    `
    // rôle par défaut: joueur (idRole = 1)
    const [result] = await connexion.query(insertUtilisateur,[nom, prenom, email, motDePasse]);

    return result;
};

export const getAllUtilisateurs = async () => {
    const selectAllUtilisateur = `
    SELECT id, nom, prenom, email, role FROM users;
    `
    const [response] = await connexion.query(selectAllUtilisateur);
    return response
}

export const getUtilisateurById = async (id) => {
    const  SelectUtilisateurById =`
    SELECT id, nom, prenom, email, role
    FROM users
    WHERE id =?;
    `
    const [response] = await connexion.query(SelectUtilisateurById, [id]);
    return response;
} 

export const updateUtilisateur = async (nom, prenom, email,  motDePasse, id) => {
    const updateUtilisateur = `
    UPDATE users
    SET nom = ?, prenom = ?, email = ?, password = ?
    WHERE id = ?;
    `;

    const [result] = await connexion.query(updateUtilisateur, [nom, prenom, email, motDePasse, id]);

    return result;
}

export const deleteUtilisateur = async (id) => {
    const deleteUtilisateur = `
    DELETE FROM users
    WHERE id = ?; 
    `;
    const [result] = await connexion.query(deleteUtilisateur,[id]);

    return result;
};