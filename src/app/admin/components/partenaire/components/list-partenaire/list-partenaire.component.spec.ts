import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPartenaireComponent } from './list-partenaire.component';

describe('ListPartenaireComponent', () => {
  let component: ListPartenaireComponent;
  let fixture: ComponentFixture<ListPartenaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPartenaireComponent]
    });
    fixture = TestBed.createComponent(ListPartenaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
