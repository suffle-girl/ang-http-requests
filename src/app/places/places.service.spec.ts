import { TestBed, waitForAsync } from "@angular/core/testing";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { PlacesService } from "./places.service";
import { UserPlacesComponent } from "./user-places/user-places.component";
import { of } from "rxjs";

describe("Component: UserPlaces", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserPlacesComponent],
      providers: [
        {
          provide: PlacesService,
          useValue: {
            loadUserPlaces: () => of([]),
            removeUserPlace: () => of({}),
            loadedUserPlaces: of([]),
          },
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
  });

  it("should call removeUserPlace on the service when onRemovePlace is triggered", () => {
    let fixture = TestBed.createComponent(UserPlacesComponent);
    let component = fixture.debugElement.componentInstance;
    const service = TestBed.inject(PlacesService);

    const dummyPlace = { id: "1", title: "Test" } as any;
    const spy = spyOn(service, "removeUserPlace").and.returnValue(of({}));

    component.onRemovePlace(dummyPlace);
    expect(spy).toHaveBeenCalledWith(dummyPlace);
  });

  it("should fetch data successfully (async)", waitForAsync(() => {
    const fixture = TestBed.createComponent(UserPlacesComponent);
    const component = fixture.componentInstance;
    const service = TestBed.inject(PlacesService);

    const dummyPlace = { id: "1", title: "Test" } as any;
    spyOn(service, "removeUserPlace").and.returnValue(of({}));

    component.onRemovePlace(dummyPlace);

    fixture.whenStable().then(() => {
      // By this point, async tasks have resolved
      expect(service.removeUserPlace).toHaveBeenCalledWith(dummyPlace);
      // You could also assert component state updates if it has any
    });
  }));
});
