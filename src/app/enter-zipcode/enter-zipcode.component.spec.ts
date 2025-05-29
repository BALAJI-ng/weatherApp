import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterZipcodeComponent } from './enter-zipcode.component';

describe('EnterZipcodeComponent', () => {
  let component: EnterZipcodeComponent;
  let fixture: ComponentFixture<EnterZipcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterZipcodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterZipcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
