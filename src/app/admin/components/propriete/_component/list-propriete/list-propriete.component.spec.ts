import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProprieteComponent } from './list-propriete.component';

describe('ListProprieteComponent', () => {
  let component: ListProprieteComponent;
  let fixture: ComponentFixture<ListProprieteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListProprieteComponent]
    });
    fixture = TestBed.createComponent(ListProprieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
