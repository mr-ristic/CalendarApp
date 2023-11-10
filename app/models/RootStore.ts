import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { CalendarStoreModel } from './CalendarStore';

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model('RootStore').props({
  calendarStore: types.optional(CalendarStoreModel, {} as any)
});

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
