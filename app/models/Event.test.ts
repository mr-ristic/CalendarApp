import { getSnapshot, onSnapshot } from 'mobx-state-tree';
import { EventModel } from './Event';
import mockEvents from '../../test/mockEvents';

describe('EventModel test', () => {
  it('should be created with correct props', () => {
    const instance = EventModel.create(mockEvents.data[0]);

    expect(instance).toBeTruthy();
    expect(instance.date).toBe(mockEvents.data[0].date);
  });

  it('should create an instance of a model ', () => {
    const event = mockEvents.data[66];
    const userInstance = EventModel.create(event);

    expect(getSnapshot(userInstance)).toMatchSnapshot();
  });

  it('should update proprety with a action ', () => {
    const event = mockEvents.data[99];
    const userInstance = EventModel.create(event);

    let snapshot: any;

    onSnapshot(userInstance, (newSnapshot) => {
      snapshot = newSnapshot;
    });

    userInstance.setProp('title', 'Meeting with Marko');
    expect(snapshot.title).toBe('Meeting with Marko');
  });
});
