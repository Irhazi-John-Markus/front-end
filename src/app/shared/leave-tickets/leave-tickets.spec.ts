import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveTickets } from './leave-tickets';

describe('LeaveTickets', () => {
  let component: LeaveTickets;
  let fixture: ComponentFixture<LeaveTickets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveTickets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveTickets);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
