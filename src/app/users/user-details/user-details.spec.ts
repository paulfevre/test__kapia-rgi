import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";

import { userStub } from "../../../testing/user.stub";
import type { User } from "../user";
import { UsersApi } from "../users-api";
import { UserDetails } from "./user-details";

/**
 * `UsersApi` simulé : chaque appel à `find()` reçoit son propre `Subject`,
 * que le test résout (`next`), rejette (`error`) ou laisse pendante pour
 * observer l'état « chargement ».
 */
class UsersApiStub {
  readonly requests: Subject<User>[] = [];
  readonly ids: number[] = [];

  find(id: number) {
    this.ids.push(id);
    const request = new Subject<User>();
    this.requests.push(request);
    return request.asObservable();
  }

  /** Requête émise par le i-ème appel à `find()`. */
  requestAt(index: number): Subject<User> {
    return this.requests[index] as Subject<User>;
  }
}

describe("UserDetails", () => {
  const USER_ID = 9;
  const USER_NAME = 'Loïc';
  const USER_EMAIL = 'alequesne8@vkontakte.ru';
  const USER_AGE = 33;
  const USER_AVATAR_URL = 'https://robohash.org/architectoestea.png?size=150x150&set=set1';
  const USER_COLOR = '#1fb2cd';
  const USER_STATE = '';

  let fixture: ComponentFixture<UserDetails>;
  let usersApi: UsersApiStub;

  beforeEach(() => {
    usersApi = new UsersApiStub();

    TestBed.configureTestingModule({
      imports: [UserDetails],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: USER_ID } } } },
        { provide: UsersApi, useValue: usersApi },
      ],
    });

    fixture = TestBed.createComponent(UserDetails);
  });

  it("appelle find() avec l'id de la route", () => {
    fixture.detectChanges();
    expect(usersApi.ids).toEqual([USER_ID]);
  });

  it("affiche un indicateur de chargement tant que la requête est en cours", () => {
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('[role="status"]')).not.toBeNull();
    expect(root.querySelector(".card")).toBeNull();
  });

  it("affiche le détail de l'utilisateur reçu", async () => {
    const user = userStub({
      id: USER_ID,
      name: USER_NAME,
      email: USER_EMAIL,
      age: USER_AGE,
      avatarUrl: USER_AVATAR_URL,
      color: USER_COLOR,
      state: USER_STATE,
    });

    fixture.detectChanges();
    usersApi.requestAt(0).next(user);
    usersApi.requestAt(0).complete();

    await fixture.whenStable();
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector("h5.card-title")?.textContent?.trim()).toBe(USER_NAME);
    expect(root.querySelector("li.active")?.textContent).toContain(USER_NAME);
    expect(root.querySelector("li.active")?.textContent).toContain(`#${USER_ID}`);
    expect(root.querySelector('a[href^="mailto:"]')?.getAttribute("href")).toBe(`mailto:${USER_EMAIL}`);
    expect(root.textContent).toContain(`${USER_AGE} ans`);
  });

  it("masque les champs absents de l'utilisateur", async () => {
    const user = userStub({ email: "", age: 0, state: "" });

    fixture.detectChanges();
    usersApi.requestAt(0).next(user);
    usersApi.requestAt(0).complete();

    await fixture.whenStable();
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(root.textContent).not.toContain("ans");
  });

  it("affiche une erreur et propose de réessayer quand la requête échoue", async () => {
    fixture.detectChanges();
    usersApi.requestAt(0).error(new Error("network down"));

    await fixture.whenStable();
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('[role="alert"]')?.textContent).toContain(
      "Impossible de charger l'utilisateur."
    );
    expect(root.querySelector(".card")).toBeNull();

    // `reload()` relance `find()` avec le même id.
    root.querySelector("button")?.dispatchEvent(new Event("click"));
    fixture.detectChanges();
    expect(usersApi.ids).toEqual([USER_ID, USER_ID]);
    expect(fixture.nativeElement.querySelector(".card")).toBeNull();
  });

  it("réaffiche l'utilisateur après une relance réussie", async () => {
    fixture.detectChanges();
    usersApi.requestAt(0).error(new Error("network down"));
    await fixture.whenStable();
    fixture.detectChanges();

    (fixture.nativeElement.querySelector("button") as HTMLButtonElement).dispatchEvent(
      new Event("click")
    );
    fixture.detectChanges();
    usersApi.requestAt(1).next(userStub({ id: USER_ID }));
    usersApi.requestAt(1).complete();

    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector("h5.card-title")).not.toBeNull();
  });
});