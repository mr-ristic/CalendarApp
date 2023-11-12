import mockEvents from '../../test/mockEvents';
import mockUsers from '../../test/mockUsers';
import { CalendarStore, CalendarStoreModel } from './CalendarStore';
import { getSnapshot } from 'mobx-state-tree';

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
    calendarStore.getEvents();
    expect(calendarStore.findUser(calendarStore.events[0].userId.id)).toBe(
      calendarStore.events[0].userId
    );
  });

  it('should get evenets and set it the map', async () => {
    calendarStore.getEvents();

    expect(calendarStore.events.length).toBe(1076);
    expect(calendarStore.getEventsMap['2023-11-11'].length).toBe(19);
  });

  it('should select user', async () => {
    calendarStore.selectUser(mockUsers.data[7].id);

    expect(calendarStore.selectedUser?.id).toBe(mockUsers.data[7].id);
  });

  it('should select date and filter dates', () => {
    calendarStore.selectUser(null);
    calendarStore.selectDate(mockEvents.data[11].date);
    expect(calendarStore.getEventsMapForSelectedDate.length).toBe(23);
  });

  it('shoulld display time in correct time zone when split into 2 - UTC+9 -> UTC+1', () => {
    calendarStore.selectDate('2023-11-18');

    expect(calendarStore.getEventsMapForSelectedDate.find(({ id }) => id === '23')?.summary).toBe(
      'Luchingu'
    );
    expect(calendarStore.getEventsMapForSelectedDate.find(({ id }) => id === '23')?.start).toBe(
      '2023-11-18 22:25:41'
    );
    expect(calendarStore.getEventsMapForSelectedDate.find(({ id }) => id === '23')?.end).toBe(
      '2023-11-18 23:59:00'
    );

    calendarStore.selectDate('2023-11-19');

    expect(calendarStore.getEventsMapForSelectedDate.find(({ id }) => id === '23')?.summary).toBe(
      'Luchingu'
    );
    expect(calendarStore.getEventsMapForSelectedDate.find(({ id }) => id === '23')?.start).toBe(
      '2023-11-19 00:00:00'
    );
    expect(calendarStore.getEventsMapForSelectedDate.find(({ id }) => id === '23')?.end).toBe(
      '2023-11-19 00:25:41'
    );
  });

  it('should test marked map', () => {
    calendarStore.selectDate('2023-11-03');
    expect(calendarStore.getMarkedMap['2023-11-03'].selected).toBe(true);
    expect(calendarStore.getMarkedMap['2023-11-03'].marked).toBe(true);
    expect(calendarStore.getMarkedMap['2023-11-03'].activeOpacity).toBe(13);

    expect(calendarStore.getMarkedMap['2023-11-13'].selected).toBe(undefined);
    expect(calendarStore.getMarkedMap['2023-11-13'].marked).toBe(true);
    expect(calendarStore.getMarkedMap['2023-11-13'].activeOpacity).toBe(undefined);
  });

  it('should test getUsersList', () => {
    calendarStore.selectUser(11);
    expect(calendarStore.getUsersList.find((user) => user.id === 11)?.isSelected).toBe(true);
    expect(calendarStore.getUsersList.find((user) => user.id === 12)?.isSelected).toBe(false);
  });

  it('should test filtering of events per user selected', () => {
    calendarStore.getEvents();
    calendarStore.selectUser(18);
    expect(calendarStore.getUsersList.find((user) => user.id === 18)?.isSelected).toBe(true);
    expect(calendarStore.getEventsMap['2023-11-25'].length).toBe(1);
  });

  it('should create snapshot', () => {
    expect(getSnapshot(calendarStore.events)).toMatchSnapshot();
  });
});
