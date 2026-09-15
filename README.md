# Test technique Angular — Gestion d'utilisateurs

## TODO

- [x] Initialisation du repo et du projet
- [x] Installation des modules complémentaires (NgBootstrap)
- [ ] Popin d'édition d'un utilisateur
- [x] Modal de suppression d'un utilisateur
- [x] Page de détails d'un utilisateur
- [x] Linter `npm run format:check`
- [x] Tests `npm run test`

Bienvenue, et merci du temps que vous consacrez à cet exercice.

Le projet est un **Angular 22** fonctionnel : la liste des utilisateurs est déjà
chargée depuis l'API et affichée. Votre travail porte sur les trois
fonctionnalités décrites plus bas.

**Durée : 1 h 15.** L'énoncé est volontairement plus large que ce qui tient dans
ce temps, et c'est délibéré : nous regardons ce que vous choisissez de faire et
comment vous le faites, pas le nombre de cases cochées. Une fonctionnalité
solide vaut mieux que trois ébauchées. Dites ce que vous avez arbitré dans la
section [Vos notes](#vos-notes).

---

## Démarrer

```bash
npm install
npm start        # http://localhost:4200
npm test         # Vitest
npm run format   # Prettier
```

Sur StackBlitz, l'installation et le serveur démarrent automatiquement.

---

## Ce qui est à faire

### 1. Éditer un utilisateur

Depuis la liste, permettre la modification de **avatar, nom, email, âge, statut**.
Une **modal** est souhaitée.

- La liste reflète la modification sans rechargement complet.
- Le formulaire est validé (email valide, âge cohérent, nom obligatoire) et
  l'enregistrement est impossible tant qu'il est invalide.
- On peut annuler sans effet de bord.

### 2. Supprimer un utilisateur

Depuis la liste, avec **confirmation** avant l'appel réseau.

- La ligne disparaît après confirmation.
- Annuler la confirmation ne supprime rien.

### 3. Page détail d'un utilisateur

Une route dédiée affichant une **card** avec **avatar, nom, email, âge, statut**.

- Accessible depuis le bouton chevron de la liste.
- L'URL est partageable : ouvrir directement `/users/3` fonctionne.
- Les états chargement / erreur / introuvable sont gérés.

---

## API

Base : `https://my-json-server.typicode.com/rferraioli/demo`

| Méthode  | Route        | Réponse vérifiée                     |
| -------- | ------------ | ------------------------------------ |
| `GET`    | `/users`     | `200` — `User[]` (30 entrées)        |
| `GET`    | `/users/:id` | `200` — `User` · `404` si id inconnu |
| `PUT`    | `/users/:id` | `200` — l'objet envoyé, `id` inclus  |
| `DELETE` | `/users/:id` | `200` — `{}` · `404` si id inconnu   |

Corps attendu par le `PUT` :

```json
{
  "avatarUrl": "https://i.pravatar.cc/150?u=90953",
  "color": "#3CCD4C",
  "email": "jkfnrr@hoovf.tc",
  "name": "RhuZicvVd7",
  "state": "France",
  "age": 34
}
```

> **Important :** `my-json-server` est **en lecture seule**. `PUT` et `DELETE`
> répondent en succès mais **ne persistent rien** : après un `DELETE`, la liste
> compte toujours 30 utilisateurs. L'état affiché doit donc être tenu côté
> front — c'est volontaire, et c'est une partie de l'exercice.
>
> Le CORS est ouvert (`GET,HEAD,PUT,PATCH,POST,DELETE`), les appels passent
> depuis le navigateur sans proxy.

---

## Ce qui est déjà en place

| Sujet     | Choix fait                                                        |
| --------- | ----------------------------------------------------------------- |
| Framework | Angular 22, standalone, **zoneless**, TypeScript 6 en mode strict |
| État      | Signaux ; `rxResource` pour le chargement de la liste             |
| HTTP      | `provideHttpClient(withFetch())`, URL de base injectée par token  |
| Routing   | Lazy loading par feature, `withComponentInputBinding()` activé    |
| Tests     | Vitest, 4 tests d'exemple (`users-api`, `user-list`)              |
| UI        | Bootstrap 5.3 + Bootstrap Icons, via npm                          |
| Budgets   | JS et CSS séparés — le CSS vendor ne masque pas une régression JS |

Vous êtes libre d'ajouter des dépendances (`@angular/cdk` par exemple) et de
réorganiser ce qui existe si vous le justifiez.

---

## Ce que nous regardons

Dans l'ordre d'importance :

1. **Correction** — les fonctionnalités marchent, y compris les cas limites
   (erreur réseau, id inexistant, liste vide).
2. **Modernité du code Angular** — signaux, `input()` / `output()`, nouveau
   control flow (`@if` / `@for` avec `track`), `inject()`, `OnPush`.
   Pas de `NgModule`, pas de `subscribe()` manuel non désabonné, pas de `any`.
3. **Architecture** — séparation accès données / état / présentation,
   composants raisonnablement petits, typage explicite.
4. **Accessibilité** — la modal piège le focus, se ferme sur `Échap` et rend le
   focus ; les contrôles ont un libellé accessible.
5. **Tests** — en 1 h 15 nous n'attendons pas une suite complète : un test sur
   la partie que vous jugez la plus risquée suffit à montrer comment vous
   testez.
6. **Cohérence** — `npm run format:check` et `npm test` passent, pas de code mort
   ni de `console.log` oublié.

---

## Vos notes

> Remplacez ce bloc : décisions structurantes, compromis assumés, ce que vous
> auriez fait avec plus de temps, et ce que vous n'avez pas terminé.
