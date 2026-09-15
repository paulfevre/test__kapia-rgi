import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import type { User } from '../user';
import { UsersApi } from '../users-api';

@Component({
  selector: 'app-user-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList {
  private readonly usersApi = inject(UsersApi);

  /**
   * Chargement de la liste. `rxResource` expose la requête sous forme de
   * signaux (`value` / `isLoading` / `error`), annule la requête en cours si
   * les paramètres changent, et offre `reload()` pour réessayer.
   */
  protected readonly usersResource = rxResource({
    stream: () => this.usersApi.list(),
    defaultValue: [] as readonly User[],
  });

  protected readonly users = this.usersResource.value;
  protected readonly isLoading = this.usersResource.isLoading;
  protected readonly errorMessage = computed(() =>
    this.usersResource.error()
      ? 'Impossible de charger les utilisateurs.'
      : undefined
  );
}
