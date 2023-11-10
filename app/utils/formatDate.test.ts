import { convertEventTimesToTimeZone, addDayAndFormatDate } from '../utils/formatDate';

const mockEvents = [
  {
    id: 1,
    title: 'Mock Event 1',
    date: '2022-01-01',
    startTime: '06:00',
    endTime: '12:00'
  },
  {
    id: 2,
    title: 'Mock Event 2',
    date: '2022-01-02',
    startTime: '15:00',
    endTime: '17:00'
  },
  {
    id: 55,
    title: "L'AquilPreturo Airport",
    date: '2023-11-14',
    startTime: '03:32',
    endTime: '19:23',
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
  it('should convert event times to the specified timezone', () => {
    const event = mockEvents[0];
    const user = mockUsers[0];
    const { convertedDate, convertedStartTime, convertedEndTime } = convertEventTimesToTimeZone(
      event.date,
      event.startTime,
      event.endTime,
      user.timezone,
      'Europe/Belgrade'
    );
    expect(convertedDate).toEqual('2021-12-31');
    expect(convertedStartTime).toEqual('21:00');
    expect(convertedEndTime).toEqual('03:00');
  });

  it('should convert event times to the when end time going to new day', () => {
    const event = mockEvents[1];
    const user = mockUsers[1];
    const { convertedDate, convertedStartTime, convertedEndTime } = convertEventTimesToTimeZone(
      event.date,
      event.startTime,
      event.endTime,
      user.timezone,
      'Europe/Belgrade'
    );
    expect(convertedDate).toEqual('2022-01-02');
    expect(convertedStartTime).toEqual('23:00');
    expect(convertedEndTime).toEqual('01:00');
  });
  it('should test another date', () => {
    const event = mockEvents[2];
    const user = mockUsers[2];
    const { convertedDate, convertedStartTime, convertedEndTime } = convertEventTimesToTimeZone(
      event.date,
      event.startTime,
      event.endTime,
      user.timezone,
      'Europe/Belgrade'
    );
    expect(convertedDate).toEqual('2023-11-13');
    expect(convertedStartTime).toEqual('20:32');
    expect(convertedEndTime).toEqual('12:23');
  });

  it('should format dates without zero', () => {
    expect(addDayAndFormatDate('2023-11-04', 1)).toBe('2023-11-05');
  });
});
