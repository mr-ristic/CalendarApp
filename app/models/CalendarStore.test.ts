import mockEvents from '../../test/mockEvents';
import mockUsers from '../../test/mockUsers';
import { CalendarStore, CalendarStoreModel } from './CalendarStore';

describe('CalendarStore test', () => {
  let calendarStore: CalendarStore;

  beforeAll(async () => {
    calendarStore = CalendarStoreModel.create({});

    calendarStore.getUsers = jest.fn(async (): Promise<void> => {
      calendarStore.setProp('users', mockUsers.data);
    });
  });

  it('should get items and set it in the store', async () => {
    expect(calendarStore.users.length).toBe(0);

    await calendarStore.getUsers();

    expect(calendarStore.users.length).toBe(mockUsers.data.length);
    expect(calendarStore.users[0].email).toBe(mockUsers.data[0].email);
    expect(calendarStore.users[10].avatar).toBe(mockUsers.data[10].avatar);
  });

  it('should find and get user from event user id', async () => {
    await calendarStore.getEvents();
    expect(calendarStore.findUser(calendarStore.events[0].userId.id)).toBe(
      calendarStore.events[0].userId
    );
  });

  it('should get evenets and set it the map', async () => {
    await calendarStore.getEvents();

    expect(calendarStore.events.length).toBe(1774);
    expect(calendarStore.getEventsMap['2023-11-03'].length).toBe(71);
  });

  it('should select user', async () => {
    calendarStore.selectUser(mockUsers.data[7].id);

    expect(calendarStore.selectedUser?.id).toBe(mockUsers.data[7].id);
  });

  it('should select date and filter dates', () => {
    calendarStore.selectDate(mockEvents.data[11].date);
    expect(calendarStore.getEventsMapForSelectedDate.length).toBe(55);
  });

  it('shoulld display time in correct time zone when split into 2', () => {
    calendarStore.selectDate('2023-11-13');
    //  {
    //   id: 55,
    //   title: "L'Aquila–Preturo Airport",
    //   date: '2023-11-14',
    //   startTime: '3:32',
    //   endTime: '19:23',
    //   location: 'Kolbudy',
    //   isAllDay: false,
    //   userId: 13
    // }
    // /{
    //   id: 13,
    //   firstName: 'Ax',
    //   lastName: 'Rapps',
    //   email: 'arappsc@aol.com',
    //   avatar: 'https://robohash.org/voluptatemfugareiciendis.png?size=50x50&set=set1',
    //   timezone: 'America/Regina'
    // },
    expect(calendarStore.getEventsMapForSelectedDate.find(({ id }) => id === 55)?.location).toBe(
      'Kolbudy'
    );
    expect(calendarStore.getEventsMapForSelectedDate.find(({ id }) => id === 55)?.startTime).toBe(
      '20:32'
    );
    expect(calendarStore.getEventsMapForSelectedDate.find(({ id }) => id === 55)?.endTime).toBe(
      '23:59'
    );
    expect(calendarStore.getEventsMapForSelectedDate.find(({ id }) => id === 55)?.date).toBe(
      '2023-11-13'
    );

    calendarStore.selectDate('2023-11-14');

    expect(calendarStore.getEventsMapForSelectedDate.find(({ id }) => id === 55)?.location).toBe(
      'Kolbudy'
    );
    expect(calendarStore.getEventsMapForSelectedDate.find(({ id }) => id === 55)?.startTime).toBe(
      '00:00'
    );
    expect(calendarStore.getEventsMapForSelectedDate.find(({ id }) => id === 55)?.endTime).toBe(
      '12:23'
    );
    expect(calendarStore.getEventsMapForSelectedDate.find(({ id }) => id === 55)?.date).toBe(
      '2023-11-14'
    );
  });

  it('should test marked map', () => {
    calendarStore.selectDate('2023-11-03');
    expect(calendarStore.getMarkedMap['2023-11-03'].selected).toBe(true);
    expect(calendarStore.getMarkedMap['2023-11-03'].marked).toBe(true);
    expect(calendarStore.getMarkedMap['2023-11-03'].activeOpacity).toBe(71);

    expect(calendarStore.getMarkedMap['2023-11-13'].selected).toBe(undefined);
    expect(calendarStore.getMarkedMap['2023-11-13'].marked).toBe(true);
    expect(calendarStore.getMarkedMap['2023-11-13'].activeOpacity).toBe(undefined);
  });
});
