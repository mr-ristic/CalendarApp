import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { withSetPropAction } from './helpers/withSetPropAction';
import { UserModel } from './User';
import { EventModel } from './Event';
import mockUsers from '../../test/mockUsers';

/**
 * Model description here for TypeScript hints.
 */
export const CalendarStoreModel = types
  .model('CalendarStore')
  .props({
    users: types.optional(types.array(UserModel), []),
    events: types.optional(types.map(EventModel), {})
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    async getUsers() {
      // TODO add a real api call
      const response = mockUsers.data;
      self.setProp('users', response);
    }
  }));

export interface CalendarStore extends Instance<typeof CalendarStoreModel> {}
export interface CalendarStoreSnapshotOut extends SnapshotOut<typeof CalendarStoreModel> {}
export interface CalendarStoreSnapshotIn extends SnapshotIn<typeof CalendarStoreModel> {}
export const createCalendarStoreDefaultModel = () => types.optional(CalendarStoreModel, {});
