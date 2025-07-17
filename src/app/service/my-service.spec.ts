  import { TestBed } from '@angular/core/testing';
  import { MyService } from './my-service';

  describe('MyService', () => {
    let service: MyService;

    beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(MyService);
    });

it('should format duration correctly', () => {
  expect(service.formatDuration(3661)).toBe('1h 1m 1s');
  expect(service.formatDuration(7265)).toBe('2h 1m 5s');
});

it('should calculate total time correctly', () => {
  const times = [3600, 1800, 900]; 
  expect(service.calculateTotalTime(times)).toBe(6300);
});
    it('should return greeting', () => {
      expect(service.getGreeting()).toBe('Welcome');
    });
  });