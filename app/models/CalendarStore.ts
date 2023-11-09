import { Instance, getSnapshot, SnapshotOut, SnapshotIn, types } from 'mobx-state-tree';
import { withSetPropAction } from './helpers/withSetPropAction';
import { UserModel } from './User';
import { EventModel, Event } from './Event';
import mockUsers from '../../test/mockUsers';
import mockEvents from '../../test/mockEvents';

/**
 * Model description here for TypeScript hints.
 */
export const CalendarStoreModel = types
  .model('CalendarStore')
  .props({
    users: types.optional(types.array(UserModel), []),
    events: types.optional(types.array(EventModel), []),
    selectedUser: types.maybeNull(types.reference(UserModel))
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get getEventsMap() {
      return self.events.reduce(
        (accumulator: { [key: string]: SnapshotOut<Event>[] }, currentEvent) => {
          const { date } = currentEvent;
          if (!accumulator[date]) {
            accumulator[date] = [];
          }
          const eventSnapshot = getSnapshot(currentEvent);
          accumulator[date].push(eventSnapshot);
          return accumulator;
        },
        {} as { [key: string]: SnapshotOut<Event>[] }
      );
    },
    hasUser(userId: number) {
      return self.users.some((user) => user.id === userId);
    }
  }))

  .actions((self) => ({
    async getUsers() {
      // TODO add a real api call
      const response = mockUsers.data;
      self.setProp('users', response);
    },
    async getEvents() {
      // TODO: Add a real API call here
      const response = mockEvents.data;
      self.setProp('events', response);
    },
    selectUser(userId: number) {
      if (self.hasUser(userId)) self.setProp('selectedUser', userId);
    }
  }));

export interface CalendarStore extends Instance<typeof CalendarStoreModel> {}
export interface CalendarStoreSnapshotOut extends SnapshotOut<typeof CalendarStoreModel> {}
export interface CalendarStoreSnapshotIn extends SnapshotIn<typeof CalendarStoreModel> {}
export const createCalendarStoreDefaultModel = () => types.optional(CalendarStoreModel, {});
