// File: index.js

import express from 'express';
import cors from 'cors';
import connexion from './config/bdd.js'
import utilisateurRoutes from './routes/utilisateurRoute.js';


const app = express();

const PORT = 3000;

app.use(cors());

app.use(express.json());

app.use('/api', utilisateurRoutes);

app.listen(PORT, () =>{
   console.log('Serveur démarré sur le port 3000 🟢​'); 
})