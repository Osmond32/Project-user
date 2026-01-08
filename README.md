Ce projet est une Application Full-Stack conçue pour illustrer la mise en œuvre d'une architecture Backend/Frontend séparée, avec un accent principal sur la sécurité de 
l'authentification et l'efficacité des opérations CRUD (Create, Read, Update, Delete).
Le système est construit autour d'un principe de séparation des préoccupations (MVC), garantissant que chaque
composant a un rôle bien défini, de la gestion de la base de données à l'interface utilisateur dynamique.

Backend: Le Moteur Sécurisé
Le Backend (développé avec Node.js, Express et MySQL) agit comme une API RESTful. Son rôle principal est la gestion sécurisée des données et de l'autorisation:
Authentification Sécurisée: Tous les mots de passe des utilisateurs sont enregistrés de manière irréversible via le Hachage (bcrypt).
Autorisation JWT: Le système met en œuvre les JSON Web Tokens (JWT) pour l'autorisation. Après la connexion, le serveur émet un jeton signé utilisé par les Middlewares pour vérifier l'accès:
Contrôle du Jeton: L'utilisateur est-il connecté?
Contrôle du Rôle: L'utilisateur est-il un Admin?
Logique CRUD: L'API fournit des endpoints dédiés pour toutes les opérations de gestion des utilisateurs (inscription, connexion, modification, suppression).

Frontend: L'Interface Dynamique
Le Frontend (développé avec React) est une application à page unique (SPA) rapide et réactive qui communique exclusivement via HTTP avec le Backend:
Gestion de Session: Après la connexion, le Jeton JWT et le Rôle sont sauvegardés dans le localStorage pour maintenir la session active.
Navigation Conditionnelle: La Navbar et les Routes sont dynamiques et s'adaptent automatiquement à l'état de l'utilisateur (affichent "Déconnexion" si connecté; affichent "Dashboard Admin" uniquement si l'utilisateur a le rôle Admin).
Pages Fonctionnelles:
Les formulaires d'Inscription et de Connexion sont des Formulaires Contrôlés qui gèrent l'envoi des données et le feedback utilisateur de manière asynchrone.
Le Dashboard Administrateur récupère et affiche la liste complète des utilisateurs et inclut les fonctionnalités de Modification et de Suppression (Delete) sans recharger la page...

