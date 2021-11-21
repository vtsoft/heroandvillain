import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperhumanComponent } from './superhuman.component';

describe('SuperhumanComponent', () => {
  let component: SuperhumanComponent;
  let fixture: ComponentFixture<SuperhumanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperhumanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperhumanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
