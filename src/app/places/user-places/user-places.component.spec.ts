import { TestBed } from "@angular/core/testing";
import { UserPlacesComponent } from "./user-places.component";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";

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
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
