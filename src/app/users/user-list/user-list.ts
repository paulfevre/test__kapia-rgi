import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap/modal";

import type { User } from "../user";
import { UsersApi } from "../users-api";
import { NgbdModalConfirm } from "./user-list-delete-modal";

@Component({
  selector: "app-user-list",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: "./user-list.html",
  styleUrl: "./user-list.scss",
})
export class UserList {
  private readonly usersApi = inject(UsersApi);
  private readonly modalService = inject(NgbModal);

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
      ? "Impossible de charger les utilisateurs."
      : undefined,
  );

  deleteUserModal(user: User) {
    const modalRef = this.modalService.open(NgbdModalConfirm);
    modalRef.componentInstance.user = user;
    modalRef.componentInstance.delete.subscribe(() => {
      this.usersApi.delete(user.id).subscribe(() => {
        // Suppression de la ligne de l'utilisateur
        this.usersResource.value.update((users: readonly User[]) =>
          users.filter((needle: User) => needle.id !== user.id),
        );
      });
    });
  }
}
