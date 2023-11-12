import { Instance, SnapshotOut, SnapshotIn, types, ReferenceIdentifier } from 'mobx-state-tree';
import { withSetPropAction } from './helpers/withSetPropAction';
import { UserModel } from './User';
import { EventModel, EventSnapshotIn } from './Event';
import mockUsers from '../../test/mockUsers';
import mockEvents from '../../test/mockEvents';
import {
  convertEventTimesToTimeZone,
  formatDateObject,
  addDayAndFormatDate,
  formatDate
} from '../utils/formatDate';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import { MarkedDates } from 'react-native-calendars/src/types';
import { UserProps } from 'app/components/types';
import { TimelineProps } from 'react-native-calendars';
import { getRandomInteger } from '../utils/misc';

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
        (accumulator: { [key: string]: SnapshotOut<TimelineProps['events']> }, currentEvent) => {
          // Check if there's a selected user and if the current event belongs to them
          if (self.selectedUser && currentEvent.userId !== self.selectedUser) {
            return accumulator;
          }
          const { date } = currentEvent;

          if (!accumulator[date]) {
            accumulator[date] = [];
          }
          // img little hack
          const participant = self.findUser(getRandomInteger(1, 20));
          accumulator[date].push({
            id: `${currentEvent.id}`,
            start: `${currentEvent.startTime}`,
            end: `${currentEvent.endTime}`,
            title: currentEvent.title,
            summary: currentEvent.location,
            color: participant?.avatar
          });
          return accumulator;
        },
        {} as { [key: string]: TimelineProps['events'] }
      );
    },
    get getEventsMapForSelectedDate() {
      return this.getEventsMap[self.selectedDate];
    },
    get getMarkedMap(): MarkedDates {
      const eventsMap = this.getEventsMap;
      const markedMap: MarkedDates = {};

      for (const [date, events] of Object.entries(eventsMap)) {
        const markedProps: MarkingProps = {
          marked: true
        };
        if (date === formatDateObject(new Date())) markedProps.today = true;
        if (date === self.selectedDate) {
          markedProps.selected = true;
          // hack till we fork the lib and use opacity as nuber of events
          markedProps.activeOpacity = events.length;
        }
        markedMap[date] = markedProps;
      }

      return markedMap;
    },
    get getUsersList(): UserProps[] {
      return self.users.map(({ id, ...rest }) => {
        return {
          id,
          isSelected: id === self.selectedUser?.id,
          count: self.events.filter((event) => event.userId.id === id).length,
          ...rest
        };
      });
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
        if (
          Number(formatDate(convertedStartTime, 'HH')) > Number(formatDate(convertedEndTime, 'HH'))
        ) {
          response.push(
            {
              ...event,
              startTime: convertedStartTime,
              endTime: `${dateBeforeMidghnight} 23:59:00`,
              date: dateBeforeMidghnight
            },
            {
              ...event,
              startTime: `${dateAfterMidghnight} 00:00:00`,
              endTime: convertedEndTime,
              date: dateAfterMidghnight
            }
          );
          return;
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
    selectUser(userId: number | null) {
      self.setProp('selectedUser', userId);
    },
    selectDate(date: string) {
      self.setProp('selectedDate', date);
    },
    createNewEvent(date: string, userId: ReferenceIdentifier) {
      const user = self.findUser(getRandomInteger(1, 20));
      const randomStartHour = getRandomInteger(10, 23);
      const event = EventModel.create({
        id: getRandomInteger(1000, 10000),
        title: `${user?.firstName} ${user?.lastName}`,
        date,
        startTime: `${date} ${randomStartHour}:00:00`,
        endTime: `${date} ${randomStartHour + 1}:00:00`,
        location: 'Belgrade',
        isAllDay: false,
        userId
      });
      self.setProp('events', [...self.events, event] as any[]);
    }
  }));

export interface CalendarStore extends Instance<typeof CalendarStoreModel> {}
export interface CalendarStoreSnapshotOut extends SnapshotOut<typeof CalendarStoreModel> {}
export interface CalendarStoreSnapshotIn extends SnapshotIn<typeof CalendarStoreModel> {}
export const createCalendarStoreDefaultModel = () => types.optional(CalendarStoreModel, {});
