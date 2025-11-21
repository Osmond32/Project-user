import * as utilisateurController from '../controllers/utilisateurController.js';

import express from "express";
import { checkAuth, checkAdmin } from '../middlewares/Middleware.js';

const router = express.Router(); // creiamo una const per nn scrivere ogni volta expres....

router.post('/addUtilisateur', utilisateurController.addUtilisateur);
router.post('/loginUtilisateur', utilisateurController.loginUtilisateur);
router.get('/allUtilisateurs', utilisateurController.getAllUtilisateurs);
router.get('/utilisateurById/:id', utilisateurController.getUtilisateurById);
router.put('/updateUtilisateur/:id', utilisateurController.updateUtilisateur)
router.delete('/deleteUtilisateur/:id', [checkAuth,checkAdmin],utilisateurController.deleteUtilisateur)



export default router 