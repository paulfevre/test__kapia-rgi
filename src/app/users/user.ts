/** Utilisateur tel que renvoyé par l'API. */
export interface User {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly age: number;
  readonly avatarUrl: string;
  /** Couleur d'affichage du statut, au format hexadécimal (ex. `#0b1c2a`). */
  readonly color: string;
  /** Statut de l'utilisateur. Peut être une chaîne vide. */
  readonly state: string;
}

/**
 * Champs modifiables d'un utilisateur : corps des requêtes `PUT`.
 * Dérivé de `User` pour que le modèle reste l'unique source de vérité.
 */
export type UserDraft = Omit<User, "id">;
