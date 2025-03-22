import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheLocataireComponent } from './fiche-locataire.component';

describe('FicheLocataireComponent', () => {
  let component: FicheLocataireComponent;
  let fixture: ComponentFixture<FicheLocataireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FicheLocataireComponent]
    });
    fixture = TestBed.createComponent(FicheLocataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
