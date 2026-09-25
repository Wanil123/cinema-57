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

Le serveur local utilise le port `3005` par défaut et Vite redirige les requêtes `/api` vers lui. **Ne déployez pas le serveur de démonstration tel quel en production** : la gestion des secrets et du compte d'administration doit être revue avant toute exposition publique.

## Structure

| Dossier | Rôle |
| --- | --- |
| `src/` | Pages, composants, traductions et données de l'interface |
| `server/` | API Express et stockage SQLite local |
| `netlify/functions/` | Fonctions serveur pour un déploiement compatible Netlify |
| `public/` | Médias et ressources statiques |

---

**English:** A bilingual film-festival web prototype built with React and an optional Express API. The GitHub Pages link is a static interface preview; account, reservation and admin workflows require a separately configured backend.
