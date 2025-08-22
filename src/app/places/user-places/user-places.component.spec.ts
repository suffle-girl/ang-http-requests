import { TestBed } from "@angular/core/testing";
import { UserPlacesComponent } from "./user-places.component";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { UserService } from "./user.service";

describe("Component: UserPlaces", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserPlacesComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
  });

  it("should create the app", () => {
    let fixture = TestBed.createComponent(UserPlacesComponent);
    let component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it("should use the user name from the service", () => {
    let fixture = TestBed.createComponent(UserPlacesComponent);
    let component = fixture.debugElement.componentInstance;
    let userService = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    expect(userService.user.name).toEqual(component.user.name);
  });

  it("should display the user name if user is logged in", () => {
    let fixture = TestBed.createComponent(UserPlacesComponent);
    let component = fixture.debugElement.componentInstance;
    component.isLoggedIn = true;
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("p").textContent).toContain(
      component.user.name
    );
  });

  it("shouldn't display the user name if user is logged in", () => {
    let fixture = TestBed.createComponent(UserPlacesComponent);
    let component = fixture.debugElement.componentInstance;
    component.isLoggedIn = false;
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("p").textContent).not.toContain(
      component.user.name
    );
  });
});
