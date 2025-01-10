import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationSiteComponent } from './reservation-site.component';

describe('ReservationSiteComponent', () => {
  let component: ReservationSiteComponent;
  let fixture: ComponentFixture<ReservationSiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationSiteComponent]
    });
    fixture = TestBed.createComponent(ReservationSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
