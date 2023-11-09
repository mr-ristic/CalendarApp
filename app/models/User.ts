import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { withSetPropAction } from './helpers/withSetPropAction';

/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types
  .model('User')
  .props({
    id: types.identifierNumber,
    firstName: types.string,
    lastName: types.string,
    email: types.string,
    avatar: types.string,
    timezone: types.string
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})); // eslint-disable-line @typescript-eslint/no-unused-vars

export interface User extends Instance<typeof UserModel> {}
export interface UserSnapshotOut extends SnapshotOut<typeof UserModel> {}
export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> {}
