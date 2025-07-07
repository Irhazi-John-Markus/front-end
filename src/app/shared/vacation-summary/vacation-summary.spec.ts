import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationSummary } from './vacation-summary';

describe('VacationSummary', () => {
  let component: VacationSummary;
  let fixture: ComponentFixture<VacationSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacationSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacationSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
