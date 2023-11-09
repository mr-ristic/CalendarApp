import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { withSetPropAction } from './helpers/withSetPropAction';
import { UserModel } from './User';

/**
 * EventModel represents an event with a specific start and end time.
 * @property {number} id - The unique identifier for an event.
 * @property {string} title - The title of the event.
 * @property {string} date - The date of the event (ISO formatted string).
 * @property {string} startTime - The start time of the event (24-hour format).
 * @property {string} endTime - The end time of the event (24-hour format).
 * @property {string} location - The location where the event will take place.
 * @property {boolean} isAllDay - Indicates whether the event lasts all day.
 * @property {types.reference} userId - A reference to the user associated with the event.
 */
export const EventModel = types
  .model('Event')
  .props({
    id: types.identifierNumber,
    title: types.string,
    date: types.string,
    startTime: types.string,
    endTime: types.string,
    location: types.string,
    isAllDay: types.boolean,
    userId: types.reference(UserModel)
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})); // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Event extends Instance<typeof EventModel> {}
export interface EventSnapshotOut extends SnapshotOut<typeof EventModel> {}
export interface EventSnapshotIn extends SnapshotIn<typeof EventModel> {}
