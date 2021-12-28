import { App } from 'App';

test('add new record to the list of records', () => {
    //Arrange
    const inputObject = {
        id: 100,
        text: 'New test task',
        type: 'Task',
        completed: false,
        migrated: false,
        scheduled: false,
        collection: 'Inbox',
        deadline: new Date()
    }
    const expectedValue = 'New test task'


})