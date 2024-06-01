import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncSpinnerComponent } from './async-spinner.component';

describe('AsyncSpinnerComponent', () => {
  let component: AsyncSpinnerComponent;
  let fixture: ComponentFixture<AsyncSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsyncSpinnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsyncSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
