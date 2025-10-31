import { describe, it, expect } from 'vitest';
import { Event, EventForm } from '../../types';
import { generateRecurringEvents } from '../../utils/eventUtils';

describe('generateRecurringEvents', () => {
  const baseEventForm: EventForm = {
    title: '반복 테스트 이벤트',
    date: '2025-01-01',
    startTime: '09:00',
    endTime: '10:00',
    description: '테스트 설명',
    location: '테스트 장소',
    category: '업무',
    repeat: {
      type: 'daily',
      interval: 1,
      endDate: '2025-01-05',
    },
    notificationTime: 10,
  };

  describe('TC-001: 일일 반복 이벤트 생성', () => {
    it('시작일부터 종료일까지 매일 이벤트를 생성한다', () => {
      const eventForm: EventForm = {
        ...baseEventForm,
        date: '2025-01-01',
        repeat: {
          type: 'daily',
          interval: 1,
          endDate: '2025-01-05',
        },
      };

      const result = generateRecurringEvents(eventForm);

      expect(result).toHaveLength(5);
      expect(result[0].date).toBe('2025-01-01');
      expect(result[1].date).toBe('2025-01-02');
      expect(result[2].date).toBe('2025-01-03');
      expect(result[3].date).toBe('2025-01-04');
      expect(result[4].date).toBe('2025-01-05');
    });

    it('모든 이벤트가 고유한 id를 가진다', () => {
      const eventForm: EventForm = {
        ...baseEventForm,
        repeat: {
          type: 'daily',
          interval: 1,
          endDate: '2025-01-05',
        },
      };

      const result = generateRecurringEvents(eventForm);

      const ids = result.map((event) => event.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(5);
    });

    it('모든 이벤트가 동일한 repeat.id를 공유한다', () => {
      const eventForm: EventForm = {
        ...baseEventForm,
        repeat: {
          type: 'daily',
          interval: 1,
          endDate: '2025-01-05',
        },
      };

      const result = generateRecurringEvents(eventForm);

      const repeatIds = result.map((event) => event.repeat.id);
      const uniqueRepeatIds = new Set(repeatIds);

      expect(uniqueRepeatIds.size).toBe(1);
      expect(result[0].repeat.id).toBeDefined();
      expect(result[0].repeat.id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      );
    });

    it('각 이벤트가 repeat.type = "daily"를 가진다', () => {
      const eventForm: EventForm = {
        ...baseEventForm,
        repeat: {
          type: 'daily',
          interval: 1,
          endDate: '2025-01-05',
        },
      };

      const result = generateRecurringEvents(eventForm);

      result.forEach((event) => {
        expect(event.repeat.type).toBe('daily');
        expect(event.repeat.interval).toBe(1);
        expect(event.repeat.endDate).toBe('2025-01-05');
      });
    });
  });

  describe('TC-002: 주간 반복 이벤트 생성', () => {
    it('시작일과 동일한 요일에 주간 반복 이벤트를 생성한다', () => {
      const eventForm: EventForm = {
        ...baseEventForm,
        date: '2025-01-06', // Monday
        repeat: {
          type: 'weekly',
          interval: 1,
          endDate: '2025-01-27',
        },
      };

      const result = generateRecurringEvents(eventForm);

      expect(result).toHaveLength(4);
      expect(result[0].date).toBe('2025-01-06'); // Monday
      expect(result[1].date).toBe('2025-01-13'); // Monday
      expect(result[2].date).toBe('2025-01-20'); // Monday
      expect(result[3].date).toBe('2025-01-27'); // Monday

      // Verify all dates are Mondays
      result.forEach((event) => {
        const date = new Date(event.date);
        expect(date.getUTCDay()).toBe(1); // Monday = 1
      });
    });

    it('모든 주간 반복 이벤트가 동일한 repeat.id를 공유한다', () => {
      const eventForm: EventForm = {
        ...baseEventForm,
        date: '2025-01-06',
        repeat: {
          type: 'weekly',
          interval: 1,
          endDate: '2025-01-27',
        },
      };

      const result = generateRecurringEvents(eventForm);

      const repeatIds = result.map((event) => event.repeat.id);
      const uniqueRepeatIds = new Set(repeatIds);

      expect(uniqueRepeatIds.size).toBe(1);
    });

    it('각 이벤트가 repeat.type = "weekly"를 가진다', () => {
      const eventForm: EventForm = {
        ...baseEventForm,
        date: '2025-01-06',
        repeat: {
          type: 'weekly',
          interval: 1,
          endDate: '2025-01-27',
        },
      };

      const result = generateRecurringEvents(eventForm);

      result.forEach((event) => {
        expect(event.repeat.type).toBe('weekly');
      });
    });
  });

  describe('TC-003: 월간 반복 이벤트 생성 (일반 날짜)', () => {
    it('매월 동일한 날짜에 이벤트를 생성한다', () => {
      const eventForm: EventForm = {
        ...baseEventForm,
        date: '2025-01-15',
        repeat: {
          type: 'monthly',
          interval: 1,
          endDate: '2025-04-30',
        },
      };

      const result = generateRecurringEvents(eventForm);

      expect(result).toHaveLength(4);
      expect(result[0].date).toBe('2025-01-15');
      expect(result[1].date).toBe('2025-02-15');
      expect(result[2].date).toBe('2025-03-15');
      expect(result[3].date).toBe('2025-04-15');
    });

    it('모든 월간 반복 이벤트가 동일한 repeat.id를 공유한다', () => {
      const eventForm: EventForm = {
        ...baseEventForm,
        date: '2025-01-15',
        repeat: {
          type: 'monthly',
          interval: 1,
          endDate: '2025-04-30',
        },
      };

      const result = generateRecurringEvents(eventForm);

      const repeatIds = result.map((event) => event.repeat.id);
      const uniqueRepeatIds = new Set(repeatIds);

      expect(uniqueRepeatIds.size).toBe(1);
    });

    it('각 이벤트가 repeat.type = "monthly"를 가진다', () => {
      const eventForm: EventForm = {
        ...baseEventForm,
        date: '2025-01-15',
        repeat: {
          type: 'monthly',
          interval: 1,
          endDate: '2025-04-30',
        },
      };

      const result = generateRecurringEvents(eventForm);

      result.forEach((event) => {
        expect(event.repeat.type).toBe('monthly');
      });
    });
  });

  describe('TC-006: 모든 이벤트가 동일한 repeat.id 공유', () => {
    it('생성된 모든 이벤트가 동일한 repeat.id를 가진다', () => {
      const eventForm: EventForm = {
        ...baseEventForm,
        date: '2025-01-01',
        repeat: {
          type: 'daily',
          interval: 1,
          endDate: '2025-01-05',
        },
      };

      const result = generateRecurringEvents(eventForm);

      const repeatIds = result.map((event) => event.repeat.id);
      const uniqueRepeatIds = new Set(repeatIds);

      expect(uniqueRepeatIds.size).toBe(1);
    });

    it('repeat.id가 UUID v4 형식이다', () => {
      const eventForm: EventForm = {
        ...baseEventForm,
        repeat: {
          type: 'daily',
          interval: 1,
          endDate: '2025-01-05',
        },
      };

      const result = generateRecurringEvents(eventForm);

      const repeatId = result[0].repeat.id;
      expect(repeatId).toBeDefined();
      expect(repeatId).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      );
    });

    it('repeat.id가 event.id와 다르다', () => {
      const eventForm: EventForm = {
        ...baseEventForm,
        repeat: {
          type: 'daily',
          interval: 1,
          endDate: '2025-01-05',
        },
      };

      const result = generateRecurringEvents(eventForm);

      result.forEach((event) => {
        expect(event.id).not.toBe(event.repeat.id);
      });
    });
  });

  describe('TC-007: 모든 이벤트가 고유한 event.id 보유', () => {
    it('생성된 모든 이벤트가 고유한 id를 가진다', () => {
      const eventForm: EventForm = {
        ...baseEventForm,
        date: '2025-01-01',
        repeat: {
          type: 'daily',
          interval: 1,
          endDate: '2025-01-05',
        },
      };

      const result = generateRecurringEvents(eventForm);

      const ids = result.map((event) => event.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(result.length);
      expect(uniqueIds.size).toBe(5);
    });

    it('각 event.id가 UUID v4 형식이다', () => {
      const eventForm: EventForm = {
        ...baseEventForm,
        repeat: {
          type: 'daily',
          interval: 1,
          endDate: '2025-01-05',
        },
      };

      const result = generateRecurringEvents(eventForm);

      result.forEach((event) => {
        expect(event.id).toMatch(
          /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        );
      });
    });
  });
});
