import {
  Instance,
  getSnapshot,
  SnapshotOut,
  SnapshotIn,
  types,
  ReferenceIdentifier
} from 'mobx-state-tree';
import { withSetPropAction } from './helpers/withSetPropAction';
import { UserModel } from './User';
import { EventModel, Event, EventSnapshotIn } from './Event';
import mockUsers from '../../test/mockUsers';
import mockEvents from '../../test/mockEvents';
import {
  convertEventTimesToTimeZone,
  formatDateObject,
  addDayAndFormatDate
} from '../utils/formatDate';

/**
 * Model description here for TypeScript hints.
 */
export const CalendarStoreModel = types
  .model('CalendarStore')
  .props({
    users: types.optional(types.array(UserModel), []),
    events: types.optional(types.array(EventModel), []),
    selectedUser: types.maybeNull(types.reference(UserModel)),
    selectedDate: types.optional(types.string, formatDateObject(new Date())),
    timzeone: 'Europe/Belgrade'
  })
  .actions(withSetPropAction)
  .views((self) => ({
    hasUser(userId: number) {
      return self.users.some((user) => user.id === userId);
    },
    findUser(userId: ReferenceIdentifier) {
      return self.users.find((user) => {
        if (user.id === userId) return user;
        return null;
      });
    }
  }))
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
    get getEventsMapForSelectedDate() {
      return this.getEventsMap[self.selectedDate];
    }
  }))
  .actions((self) => ({
    async getUsers() {
      // TODO add a real api call
      const response = mockUsers.data;
      self.setProp('users', response);
    },
    getEvents() {
      // TODO: Add a real API call here
      const response: EventSnapshotIn[] = [];
      mockEvents.data.forEach((event) => {
        const user = self.findUser(event.userId);
        const userTimezone = user ? user.timezone : 'UTC';

        const { convertedDate, convertedStartTime, convertedEndTime } = convertEventTimesToTimeZone(
          event.date,
          event.startTime,
          event.endTime,
          userTimezone,
          self.timzeone
        );

        let dateBeforeMidghnight = convertedDate;
        let dateAfterMidghnight = event.date;

        if (convertedDate === event.date) {
          dateBeforeMidghnight = event.date;
          dateAfterMidghnight = addDayAndFormatDate(event.date, 1);
        }
        if (Number(convertedStartTime.slice(0, 2)) > Number(convertedEndTime.slice(0, 2))) {
          response.push(
            {
              ...event,
              startTime: convertedStartTime,
              endTime: '23:59',
              date: dateBeforeMidghnight
            },
            {
              ...event,
              startTime: '00:00',
              endTime: convertedEndTime,
              date: dateAfterMidghnight
            }
          );
        }

        response.push({
          ...event,
          date: convertedDate,
          startTime: convertedStartTime,
          endTime: convertedEndTime
        });
      });

      self.setProp('events', response);
    },
    selectUser(userId: number) {
      if (self.hasUser(userId)) self.setProp('selectedUser', userId);
    },
    selectDate(date: string) {
      self.setProp('selectedDate', date);
    }
  }));

export interface CalendarStore extends Instance<typeof CalendarStoreModel> {}
export interface CalendarStoreSnapshotOut extends SnapshotOut<typeof CalendarStoreModel> {}
export interface CalendarStoreSnapshotIn extends SnapshotIn<typeof CalendarStoreModel> {}
export const createCalendarStoreDefaultModel = () => types.optional(CalendarStoreModel, {});
