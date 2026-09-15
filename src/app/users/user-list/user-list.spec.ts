import { TestBed } from "@angular/core/testing";
import { Observable, of, throwError } from "rxjs";
import { userStub } from "../../../testing/user.stub";
import type { User } from "../user";
import { UsersApi } from "../users-api";
import { UserList } from "./user-list";

/** Monte le composant avec une couche HTTP simulée. */
async function setup(list: () => Observable<readonly User[]>) {
  TestBed.configureTestingModule({
    providers: [{ provide: UsersApi, useValue: { list } }],
  });

  const fixture = TestBed.createComponent(UserList);
  await fixture.whenStable();

  return fixture.nativeElement as HTMLElement;
}

describe("UserList", () => {
  it("affiche une ligne par utilisateur", async () => {
    const element = await setup(() =>
      of([userStub({ id: 1, name: "Ada" }), userStub({ id: 2, name: "Alan" })]),
    );

    const rows = element.querySelectorAll("tbody tr");
    expect(rows).toHaveLength(2);
    expect(rows[0]?.textContent).toContain("Ada");
    expect(rows[1]?.textContent).toContain("Alan");
  });

  it("affiche un état vide quand la liste est vide", async () => {
    const element = await setup(() => of([]));

    expect(element.textContent).toContain("Aucun utilisateur à afficher");
  });

  it("affiche une erreur et propose de réessayer quand le chargement échoue", async () => {
    const element = await setup(() =>
      throwError(() => new Error("network down")),
    );

    expect(element.querySelector('[role="alert"]')?.textContent).toContain(
      "Impossible de charger les utilisateurs.",
    );
    expect(
      element.querySelector('[role="alert"] button')?.textContent,
    ).toContain("Réessayer");
  });
});
