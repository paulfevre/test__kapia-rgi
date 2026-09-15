import { SlicePipe } from "@angular/common";
import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap/modal";

import { User } from "../user";

@Component({
  selector: "ngbd-modal-confirm",
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Supprimer un utilisateur</h4>
      <button
        type="button"
        class="btn-close"
        aria-describedby="modal-title"
        (click)="modal.dismiss('Cross click')"
      ></button>
    </div>
    <div class="modal-body">
      <p>
        <strong
          >Êtes-vous sûr de vouloir supprimer
          <span class="text-primary">"{{ user.name }}"</span> ?</strong
        >
      </p>
      <div>
        <em>Toutes ses informations seront supprimées :</em>
        <ul>
          <li>
            ID :
            <strong>{{ user.id }}</strong>
          </li>
          <li>
            Nom :
            <strong>{{ user.name }}</strong>
          </li>
          <li>
            E-mail :
            <strong>{{ user.email }}</strong>
          </li>
          <li>
            Age :
            <strong>{{ user.age }}</strong>
          </li>
          <li>
            Avatar :
            @if (user.avatarUrl) {
              <strong [title]="user.avatarUrl">
                {{ user.avatarUrl | slice: 0 : 30 }}
                ...
              </strong>
            }
          </li>
          <li>
            Couleur :
            <strong>{{ user.color }}</strong>
          </li>
          <li>
            Statut :
            <strong>{{ user.state }}</strong>
          </li>
        </ul>
      </div>
      <p>
        <strong class="text-danger">Ceci ne peut pas être annulé !</strong>
      </p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="modal.dismiss('cancel click')"
      >
        Cancel
      </button>
      <button type="button" class="btn btn-danger" (click)="deleteUser()">
        Ok
      </button>
    </div>
  `,
  imports: [SlicePipe],
})
export class NgbdModalConfirm {
  readonly modal = inject(NgbActiveModal);
  @Input() user!: User;
  @Output() delete: EventEmitter<any> = new EventEmitter();

  deleteUser() {
    this.delete.emit(this.user);
    this.modal.close();
  }
}
