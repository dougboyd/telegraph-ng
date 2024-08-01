import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundViewComponent } from './round-view.component';

describe('RoundViewComponent', () => {
  let component: RoundViewComponent;
  let fixture: ComponentFixture<RoundViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoundViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoundViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
