import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPartenaireComponent } from './details-partenaire.component';

describe('DetailsPartenaireComponent', () => {
  let component: DetailsPartenaireComponent;
  let fixture: ComponentFixture<DetailsPartenaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsPartenaireComponent]
    });
    fixture = TestBed.createComponent(DetailsPartenaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
