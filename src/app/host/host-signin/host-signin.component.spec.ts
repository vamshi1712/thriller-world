import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostSigninComponent } from './host-signin.component';

describe('HostSigninComponent', () => {
  let component: HostSigninComponent;
  let fixture: ComponentFixture<HostSigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostSigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
