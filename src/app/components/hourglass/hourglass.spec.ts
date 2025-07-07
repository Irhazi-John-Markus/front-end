import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hourglass } from './hourglass';

describe('Hourglass', () => {
  let component: Hourglass;
  let fixture: ComponentFixture<Hourglass>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hourglass]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hourglass);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
