// tslint:disable:no-any les attributs sont des types any
// tslint:disable:no-floating-promises pour le before each
import { HttpClientModule } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./communication.service";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [HttpClientModule],
      providers: [CommunicationService],
    }).compileComponents();
  }));

  it("should create the app", async(() => {
    const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
    const app: any = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'client'`, async(() => {
    const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
    const app: any = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("INF3710");
  }));
});
