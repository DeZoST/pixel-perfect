# 🎮 La Cité des Pixels - Pixel Perfect 🏆

![Cité des Pixels](https://github.com/DeZoST/pixel-perfect/blob/main/client/public/images/logo-cite.png)

## 🌟 Configuration du Projet

1. **Cloner le projet**
2. **Générer les clés JWT** :
   Exécutez le script shell `./server/jwt.sh` pour générer les clés privées et publiques.
3. **Configurer les variables d'environnement** :
   Créez les fichiers `.env` à partir des fichiers `.env.example` dans les dossiers `client` et `server`.
4. **Démarrer le projet** :
   Exécutez la commande `docker compose up -d` à la racine du projet.

## 🚀 Informations Techniques

-   **Ports par défaut** :
    Le serveur fonctionne sur le port **3000** et le client sur le port **5173**. Vous pouvez les modifier dans le fichier `docker-compose.yml`.
-   **Migrations SQL** :
    Si vous modifiez les fichiers de migrations SQL, supprimez le fichier `./server/src/db/database.db` et redémarrez le serveur pour appliquer les changements.
-   **Déploiement urgent** :
    En cas de modifications urgentes du code, n'oubliez pas de faire un **docker compose down** suivi d'un **docker compose up -d --build** pour que les changements soient pris en compte.

## 📚 Informations pour les Modérateurs

-   **Changer d'équipe** :
    Les joueurs peuvent changer d'équipe en visitant la page **/switch-team**. Ils y seront automatiquement redirigés s'ils ne font partie d'aucune équipe lors de la première connexion.
-   **Graphe pour OBS** :
    La page du graphe pour OBS est accessible à l'adresse **/vote-graph**.
-   **Statut de connexion** :
    Un joueur est considéré comme connecté s'il est sur la page **/game**.
-   **Reset du jeu** :
    Lors de la réinitialisation du jeu, tous les votes sont **supprimés**.
