import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProprieteComponent } from './details-propriete.component';

describe('DetailsProprieteComponent', () => {
  let component: DetailsProprieteComponent;
  let fixture: ComponentFixture<DetailsProprieteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsProprieteComponent]
    });
    fixture = TestBed.createComponent(DetailsProprieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
