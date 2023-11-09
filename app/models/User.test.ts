import { getSnapshot, onSnapshot } from 'mobx-state-tree';
import { UserModel } from './User';
import mockUsers from '../../test/mockUsers';

describe('UserModel test', () => {
  it('should be created with correct props', () => {
    const oneUser = mockUsers.data[4];
    const user = UserModel.create(oneUser);

    expect(user.firstName).toEqual(mockUsers.data[4].firstName);
    expect(user.lastName).toEqual(mockUsers.data[4].lastName);
    expect(user.avatar).toEqual(mockUsers.data[4].avatar);
  });

  it('should create an instance of a model ', () => {
    const oneUser = mockUsers.data[6];
    const userInstance = UserModel.create(oneUser);

    expect(getSnapshot(userInstance)).toMatchSnapshot();
  });

  it('should update proprety with a action ', () => {
    const oneUser = mockUsers.data[9];
    const userInstance = UserModel.create(oneUser);

    let snapshot: any;

    onSnapshot(userInstance, (newSnapshot) => {
      snapshot = newSnapshot;
    });

    userInstance.setProp('email', 'mr@markoristic.net');
    expect(snapshot.email).toBe('mr@markoristic.net');
  });
});
