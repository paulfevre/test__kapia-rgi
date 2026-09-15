import {Component, computed, inject, ResourceRef, WritableSignal} from "@angular/core";
import {rxResource} from "@angular/core/rxjs-interop";
import {ActivatedRoute} from '@angular/router';

import {User} from "../user";
import {UsersApi} from "../users-api";

@Component({
  imports: [],
  selector: "app-user-details",
  styleUrl: "./user-details.scss",
  templateUrl: "./user-details.html",
})
export class UserDetails {
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly usersApi = inject(UsersApi);

  protected id = this.activatedRoute.snapshot.params['id'];

  /**
   * Chargement de l'utilisateur. `rxResource` expose la requête sous forme de
   * signaux (`value` / `isLoading` / `error`), annule la requête en cours si
   * les paramètres changent, et offre `reload()` pour réessayer.
   */
  protected readonly userResource: ResourceRef<User|undefined> = rxResource({
    stream: () => this.usersApi.find(this.id),
  });

  protected readonly user: WritableSignal<User|undefined> = this.userResource.value;
  protected readonly isLoading = this.userResource.isLoading;
  protected readonly errorMessage = computed(() =>
      this.userResource.error()
          ? 'Impossible de charger l\'utilisateur.'
          : undefined
  );
}
