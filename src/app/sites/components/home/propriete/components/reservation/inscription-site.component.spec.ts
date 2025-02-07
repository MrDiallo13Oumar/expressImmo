import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionSiteComponent } from './inscription-site.component';

describe('InscriptionSiteComponent', () => {
  let component: InscriptionSiteComponent;
  let fixture: ComponentFixture<InscriptionSiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InscriptionSiteComponent]
    });
    fixture = TestBed.createComponent(InscriptionSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
