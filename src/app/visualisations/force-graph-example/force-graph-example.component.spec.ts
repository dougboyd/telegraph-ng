import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForceGraphExampleComponent } from './force-graph-example.component';

describe('ForceGraphExampleComponent', () => {
  let component: ForceGraphExampleComponent;
  let fixture: ComponentFixture<ForceGraphExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForceGraphExampleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForceGraphExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
