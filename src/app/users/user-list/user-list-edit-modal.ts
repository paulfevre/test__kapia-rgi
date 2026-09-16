import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap/modal";

import type { User } from "../user";

@Component({
  selector: "ngbd-modal-edit",
  imports: [ReactiveFormsModule],
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Modifier un utilisateur</h4>
      <button
        type="button"
        class="btn-close"
        aria-describedby="modal-title"
        (click)="modal.dismiss('Cross click')"
      ></button>
    </div>
    <form [formGroup]="form" (ngSubmit)="save()">
      <div class="modal-body">
        <div class="mb-3">
          <label class="form-label" for="user-name">Nom</label>
          <input
            id="user-name"
            type="text"
            class="form-control"
            formControlName="name"
          />
        </div>
        <div class="mb-3">
          <label class="form-label" for="user-email">E-mail</label>
          <input
            id="user-email"
            type="email"
            class="form-control"
            formControlName="email"
          />
        </div>
        <div class="mb-3">
          <label class="form-label" for="user-age">Âge</label>
          <input
            id="user-age"
            type="number"
            min="0"
            class="form-control"
            formControlName="age"
          />
        </div>
        <div class="mb-3">
          <label class="form-label" for="user-avatar-url">Avatar (URL)</label>
          <input
            id="user-avatar-url"
            type="text"
            class="form-control"
            formControlName="avatarUrl"
          />
        </div>
        <div class="mb-3">
          <label class="form-label" for="user-color">Couleur</label>
          <input
            id="user-color"
            type="color"
            class="form-control form-control-color"
            formControlName="color"
          />
        </div>
        <div class="mb-3">
          <label class="form-label" for="user-state">Statut</label>
          <input
            id="user-state"
            type="text"
            class="form-control"
            formControlName="state"
          />
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-outline-secondary"
          (click)="modal.dismiss('cancel click')"
        >
          Annuler
        </button>
        <button type="submit" class="btn btn-primary" [disabled]="form.invalid">
          Enregistrer
        </button>
      </div>
    </form>
  `,
})
export class NgbdModalEdit implements OnInit {
  private readonly fb = inject(FormBuilder);
  readonly modal = inject(NgbActiveModal);

  @Input() user!: User;
  @Output() edit = new EventEmitter<User>();

  readonly form = this.fb.nonNullable.group({
    name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    age: [0, [Validators.required, Validators.min(0)]],
    avatarUrl: [""],
    color: [""],
    state: [""],
  });

  ngOnInit(): void {
    const { id: _id, ...draft } = this.user;
    this.form.setValue(draft);
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }
    this.edit.emit({
      ...this.form.getRawValue(),
      id: this.user.id,
      age: Number(this.form.getRawValue().age),
    });
    this.modal.close();
  }
}
