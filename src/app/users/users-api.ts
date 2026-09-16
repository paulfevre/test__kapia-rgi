import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { API_BASE_URL } from "../core/api-base-url";
import type { User } from "./user";

/**
 * Accès HTTP aux utilisateurs. Cette couche ne fait que transporter la donnée :
 * pas d'état, pas de logique de présentation.
 */
@Injectable({ providedIn: "root" })
export class UsersApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  /** `GET /users` — liste complète des utilisateurs. */
  list(): Observable<readonly User[]> {
    return this.http.get<readonly User[]>(`${this.baseUrl}/users`);
  }

  /** `GET /users/:id` — Recherche d'un utilisateur. */
  find(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  /** `PUT /users/:id` — Modification d'un utilisateur. */
  edit(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/${user.id}`, user);
  }

  /** `DELETE /users/:id` — Suppression d'un utilisateur. */
  delete(id: number): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl}/users/${id}`);
  }
}
