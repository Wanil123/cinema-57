# 5:7 — Festival de films

Prototype d'application web bilingue pour découvrir une programmation de films, consulter les détails d'une séance et parcourir un formulaire de réservation. Le dépôt sépare l'interface React des fonctions serveur nécessaires aux comptes, aux réservations et à l'administration.

[Voir l'aperçu de l'interface](https://wanil123.github.io/cinema-57/)

> **Portée de l'aperçu :** GitHub Pages héberge uniquement la partie statique. Les comptes, l'enregistrement des réservations et l'espace d'administration nécessitent une API et une base de données configurées séparément. Ce projet est une démonstration technique, pas une billetterie en production.

## Ce que montre le projet

- Navigation et contenu en français et en anglais.
- Pages de programmation, genres, fiches de films et actualités.
- Parcours de réservation et interfaces de connexion et d'administration.
- API locale Express avec SQLite; fonctions Netlify pour certains parcours serveur.
- Interface responsive avec animations et composants réutilisables.

## Technologies

**Interface :** React, React Router, Vite, Tailwind CSS, Framer Motion et GSAP.

**Serveur :** Node.js, Express, SQLite et fonctions Netlify.

## Démarrer en local

```bash
npm ci
npm run dev
```

L'interface est alors disponible à l'adresse indiquée par Vite. Pour essayer les parcours qui appellent `/api`, lancer également le serveur local dans un second terminal :

```bash
npm run server
```

Le serveur local utilise le port `3005` par défaut et Vite redirige les requêtes `/api` vers lui. Avant de le lancer, définissez `JWT_SECRET` dans l'environnement (valeur aléatoire privée d'au moins 32 octets). Il n'y a plus de secret ni de compte administrateur par défaut. Les anciens jetons deviennent invalides après rotation de ce secret.

Pour créer ou remplacer le compte administrateur local, définissez `ADMIN_NAME`, `ADMIN_EMAIL` et `ADMIN_PASSWORD` dans votre environnement, puis exécutez `npm run setup:admin`. Le mot de passe doit compter au moins 12 caractères et au plus 72 octets. Ne commitez jamais `.env`, une base SQLite ni ses fichiers WAL/SHM. Si l'ancien compte de démonstration existe, cette commande le remplace; vérifiez ensuite qu'il ne permet plus de connexion.

Sur Netlify, configurez `JWT_SECRET`, `TURSO_DATABASE_URL` et `TURSO_AUTH_TOKEN` comme variables secrètes destinées aux fonctions, puis redéployez. `node setup-turso.js` lit les variables depuis l'environnement; avec `ADMIN_NAME`, `ADMIN_EMAIL` et `ADMIN_PASSWORD`, il configure ou fait tourner le compte administrateur Turso. Il ne faut plus passer le jeton Turso en argument de commande. **Ne déployez pas avant de faire tourner le JWT et l'ancien mot de passe administrateur dans la base réellement utilisée.**

Le formulaire enregistre une *demande* de réservation, sans paiement, contrôle de stock ni courriel automatique. Les routes d'authentification et de réservation publiques exigent encore une protection anti-abus/rate limiting au niveau de l'hébergement avant ouverture de cette API au public. L'aperçu GitHub Pages reste statique.

Vérifications : `npm test`, `npm run lint`, `npm run build`, `npm audit`.

## Structure

| Dossier | Rôle |
| --- | --- |
| `src/` | Pages, composants, traductions et données de l'interface |
| `server/` | API Express et stockage SQLite local |
| `netlify/functions/` | Fonctions serveur pour un déploiement compatible Netlify |
| `public/` | Médias et ressources statiques |

---

**English:** A bilingual film-festival web prototype built with React and an optional Express API. The GitHub Pages link is a static interface preview; account, reservation and admin workflows require a separately configured backend.
