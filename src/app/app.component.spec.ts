import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Eddies editor aka Eddietor'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.webTitle).toEqual('Eddies editor aka Eddietor');
  });

  it(`should have the correct github url.'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const link = fixture.debugElement.nativeElement.querySelector("a");
    expect(link.getAttribute('href')).toBe('https://github.com/gizmo10475/jsramverk-editor')
  });
});
