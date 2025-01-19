import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsLocataireComponent } from './details-locataire.component';

describe('DetailsLocataireComponent', () => {
  let component: DetailsLocataireComponent;
  let fixture: ComponentFixture<DetailsLocataireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsLocataireComponent]
    });
    fixture = TestBed.createComponent(DetailsLocataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
