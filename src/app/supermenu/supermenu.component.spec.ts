import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupermenuComponent } from './supermenu.component';

describe('SupermenuComponent', () => {
  let component: SupermenuComponent;
  let fixture: ComponentFixture<SupermenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupermenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupermenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
