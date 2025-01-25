import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardValidationComponent } from './card-validation.component';

describe('CardValidationComponent', () => {
  let component: CardValidationComponent;
  let fixture: ComponentFixture<CardValidationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardValidationComponent]
    });
    fixture = TestBed.createComponent(CardValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
