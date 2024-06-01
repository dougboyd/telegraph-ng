import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatePersonOpportunityComponent } from './relate-person-opportunity.component';

describe('RelatePersonOpportunityComponent', () => {
  let component: RelatePersonOpportunityComponent;
  let fixture: ComponentFixture<RelatePersonOpportunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatePersonOpportunityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RelatePersonOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
