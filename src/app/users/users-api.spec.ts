import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { userStub } from '../../testing/user.stub';
import { API_BASE_URL } from '../core/api-base-url';
import type { User } from './user';
import { UsersApi } from './users-api';

const BASE_URL = 'https://api.test';

describe('UsersApi', () => {
  let usersApi: UsersApi;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        // L'URL de base est injectée : le test ne dépend pas de l'API réelle.
        { provide: API_BASE_URL, useValue: BASE_URL },
      ],
    });

    usersApi = TestBed.inject(UsersApi);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  // Échoue si une requête a été émise sans être consommée par le test.
  afterEach(() => httpTesting.verify());

  it('appelle GET /users et transmet la liste reçue', () => {
    const expected = [userStub({ id: 1 }), userStub({ id: 2 })];
    let received: readonly User[] | undefined;

    usersApi.list().subscribe((users) => (received = users));

    const request = httpTesting.expectOne(`${BASE_URL}/users`);
    expect(request.request.method).toBe('GET');

    request.flush(expected);
    expect(received).toEqual(expected);
  });
});
