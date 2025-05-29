import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchZipcodeComponent } from './search-zipcode.component';

describe('SearchZipcodeComponent', () => {
  let component: SearchZipcodeComponent;
  let fixture: ComponentFixture<SearchZipcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchZipcodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchZipcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
