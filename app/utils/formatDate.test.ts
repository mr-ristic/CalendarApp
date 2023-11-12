import { convertEventTimesToTimeZone, addDayAndFormatDate } from '../utils/formatDate';

const mockEvents = [
  {
    id: 1,
    title: 'Mock Event 1',
    date: '2022-01-01',
    startTime: '2022-01-01 06:00:00',
    endTime: '2022-01-01 12:00:00'
  },
  {
    id: 2,
    title: 'Mock Event 2',
    date: '2022-01-02',
    startTime: '2022-01-02 15:00:00',
    endTime: '2022-01-02 17:00:00'
  },
  {
    id: 55,
    title: "L'AquilPreturo Airport",
    date: '2023-11-14',
    startTime: '2023-11-14 21:32:00',
    endTime: '2023-11-14 23:23:00',
    location: 'Kolbudy',
    userId: 13
  }
];

const mockUsers = [
  {
    id: 1,
    name: 'Mock User 1',
    timezone: 'America/Los_Angeles'
  },
  {
    id: 2,
    name: 'Mock User 2',
    timezone: 'Asia/Yakutsk'
  },
  {
    id: 3,
    name: 'Mock User 3',
    timezone: 'America/Regina'
  }
];

describe('convertEventTimesToTimeZone', () => {
  it('should convert event times to the specified timezone UTC-8 -> UTC+1 ', () => {
    const event = mockEvents[0];
    const user = mockUsers[0];
    const { convertedDate, convertedStartTime, convertedEndTime } = convertEventTimesToTimeZone(
      event.startTime,
      event.endTime,
      user.timezone,
      'Europe/Belgrade'
    );
    expect(convertedDate).toEqual('2022-01-01');
    expect(convertedStartTime).toEqual('2022-01-01 15:00:00');
    expect(convertedEndTime).toEqual('2022-01-01 21:00:00');
  });

  it('should convert event times from UTC+9 -> UTC+1', () => {
    const event = mockEvents[1];
    const user = mockUsers[1];
    const { convertedDate, convertedStartTime, convertedEndTime } = convertEventTimesToTimeZone(
      event.startTime,
      event.endTime,
      user.timezone,
      'Europe/Belgrade'
    );
    expect(convertedDate).toEqual('2022-01-02');
    expect(convertedStartTime).toEqual('2022-01-02 07:00:00');
    expect(convertedEndTime).toEqual('2022-01-02 09:00:00');
  });

  it('should test another date UTC-6 -> UTC+1', () => {
    const event = mockEvents[2];
    const user = mockUsers[2];
    const { convertedDate, convertedStartTime, convertedEndTime } = convertEventTimesToTimeZone(
      event.startTime,
      event.endTime,
      user.timezone,
      'Europe/Belgrade'
    );
    expect(convertedDate).toEqual('2023-11-15');
    expect(convertedStartTime).toEqual('2023-11-15 04:32:00');
    expect(convertedEndTime).toEqual('2023-11-15 06:23:00');
  });

  it('should format dates without zero', () => {
    expect(addDayAndFormatDate('2023-11-04', 1)).toBe('2023-11-05');
  });
});
