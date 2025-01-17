import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprieteComponent } from './propriete.component';

describe('ProprieteComponent', () => {
  let component: ProprieteComponent;
  let fixture: ComponentFixture<ProprieteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProprieteComponent]
    });
    fixture = TestBed.createComponent(ProprieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
