import { InjectionToken } from '@angular/core';

/**
 * URL de base de l'API.
 *
 * Injectée via un token plutôt que codée en dur dans le service : la valeur
 * reste substituable par environnement et surchargeable dans les tests
 * (`{ provide: API_BASE_URL, useValue: '/api' }`).
 */
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
  providedIn: 'root',
  factory: () => 'https://my-json-server.typicode.com/rferraioli/demo',
});
