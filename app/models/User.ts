import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { withSetPropAction } from './helpers/withSetPropAction';

/**
 * UserModel represents a user with personal information.
 * @property {number} id - The unique identifier for a user.
 * @property {string} firstName - The user's first name.
 * @property {string} lastName - The user's last name.
 * @property {string} email - The user's email address.
 * @property {string} avatar - The URL to the user's avatar image.
 * @property {string} timezone - The user's timezone.
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
