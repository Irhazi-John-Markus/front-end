import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentSituation } from './current-situation';

describe('CurrentSituation', () => {
  let component: CurrentSituation;
  let fixture: ComponentFixture<CurrentSituation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentSituation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentSituation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
