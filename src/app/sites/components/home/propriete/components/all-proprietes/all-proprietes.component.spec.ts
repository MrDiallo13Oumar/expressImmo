import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProprietesComponent } from './all-proprietes.component';

describe('AllProprietesComponent', () => {
  let component: AllProprietesComponent;
  let fixture: ComponentFixture<AllProprietesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllProprietesComponent]
    });
    fixture = TestBed.createComponent(AllProprietesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
