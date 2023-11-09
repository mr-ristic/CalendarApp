import mockEvents from '../../test/mockEvents';
import mockUsers from '../../test/mockUsers';
import { CalendarStoreModel } from './CalendarStore';

describe('CalendarStore test', () => {
  it('should get items and set it in the store', async () => {
    const instance = CalendarStoreModel.create({});

    expect(instance).toBeTruthy();

    instance.getUsers = jest.fn(async (): Promise<void> => {
      instance.setProp('users', mockUsers.data);
    });
    expect(instance.users.length).toBe(0);

    await instance.getUsers();

    expect(instance.users.length).toBe(mockUsers.data.length);
    expect(instance.users[0].email).toBe(mockUsers.data[0].email);
    expect(instance.users[10].avatar).toBe(mockUsers.data[10].avatar);
  });

  it('should get evenets and set it the map', async () => {
    const instance = CalendarStoreModel.create({});

    expect(instance).toBeTruthy();

    instance.getEvents = jest.fn(async (): Promise<void> => {
      instance.setProp('events', mockEvents.data);
    });
    expect(instance.events.length).toBe(0);

    await instance.getEvents();

    expect(instance.events.length).toBe(mockEvents.data.length);
    expect(instance.getEventsMap['2023-11-03'].length).toBe(38);
  });
});
