// File: index.js

import express from 'express';
import cors from 'cors';
import connexion from './config/bdd.js'
import utilisateurRoutes from './routes/utilisateurRoute.js';


const app = express();

const PORT = 3000;

app.use(cors()); // per evitare che tutti si vengono a connettere alla mia api

app.use(express.json());

app.use('/api', utilisateurRoutes); //chiama le route

app.listen(PORT, () =>{
   console.log('Serveur démarré sur le port 3000 🟢​'); 
})