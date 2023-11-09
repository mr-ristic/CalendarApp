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

    calendarStore.getEvents = jest.fn(async (): Promise<void> => {
      calendarStore.setProp('events', mockEvents.data);
    });
  });

  it('should get items and set it in the store', async () => {
    expect(calendarStore.users.length).toBe(0);

    await calendarStore.getUsers();

    expect(calendarStore.users.length).toBe(mockUsers.data.length);
    expect(calendarStore.users[0].email).toBe(mockUsers.data[0].email);
    expect(calendarStore.users[10].avatar).toBe(mockUsers.data[10].avatar);
  });

  it('should get evenets and set it the map', async () => {
    expect(calendarStore.events.length).toBe(0);

    await calendarStore.getEvents();

    expect(calendarStore.events.length).toBe(mockEvents.data.length);
    expect(calendarStore.getEventsMap['2023-11-03'].length).toBe(38);
  });

  it('should select user', async () => {
    calendarStore.selectUser(mockUsers.data[7].id);

    expect(calendarStore.selectedUser?.id).toBe(mockUsers.data[7].id);
  });
});
