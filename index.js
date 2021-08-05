import {
  read, write, edit, add,
} from './jsonFileStorage.mjs';

const logItems = (arr) =>
{
  arr.forEach((item, i) => {
    console.log(`${i + 1}. - ${item}`);
  });
};
const showHandler = (err, jsonObj) =>
{
  const { todo } = jsonObj;
  const { done } = jsonObj;
  console.log('To-Do: ');
  logItems(todo);

  console.log('Done: ');
  logItems(done);
};

const command = process.argv[2];
const optInput = process.argv[3];

const startObj = {
  todo: [],
  done: [],
};

const completeHandler = (err, jsonObj) =>
{
  const { todo } = jsonObj;
  const { done } = jsonObj;

  if (todo.length > 0) {
    const doneItem = todo.splice(optInput - 1, 1);
    done.push(doneItem);
    console.log(`I have marked item ${optInput}, "${doneItem}" as complete`);
  }

  jsonObj.todo = todo;
  jsonObj.done = done;
};

switch (command)
{
  case 'reset':
    write('data.json', startObj, () => { console.log('list reset'); });
    break;

  case 'show':
    read('data.json', showHandler);
    break;

  case 'add':
    add('data.json', 'todo', optInput, () => {
      console.log(`I have added "${optInput}" to your to-do list.`);
    });
    break;
  case 'complete':
    edit('data.json', completeHandler, () => { read('data.json', showHandler); });

    break;

  default:
    console.log('no command given');
    break;
}
