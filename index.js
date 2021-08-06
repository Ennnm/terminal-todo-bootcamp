import {
  replaceOneElement,
  read, write, edit, add, remove,
} from './jsonFileStorage.mjs';

const command = process.argv[2];
const optInput = process.argv[3];
const optTxt = process.argv[4];
const jsonFilePath = 'data.json';
const startObj = {
  todo: [],
  done: [],
};

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

const removeHandler = (err, output) => {
  if (output === null || output === '')
  {
    console.log(`Have failed to remove Item ${optInput}`);
  }
  else if (output !== '')
  {
    console.log(`I have removed Item ${optInput}, "${output}"`);
  }
};

const replaceHandler = (err, contents) => {
  if (err || contents[0] === '')
  {
    console.log(`failed to edit item ${optInput} to ${contents[1]}`);
  }
  else
  {
    console.log(`I have edited Item "${contents[0]}" with "${contents[1]}"`);
  }
};

switch (command)
{
  case 'reset':
    write(jsonFilePath, startObj, () => { console.log('list reset'); });
    break;

  case 'show':
    read(jsonFilePath, showHandler);
    break;

  case 'add':
    add(jsonFilePath, 'todo', optInput, () => {
      console.log(`I have added "${optInput}" to your to-do list.`);
    });
    break;

  case 'complete':
    edit(jsonFilePath, completeHandler, () => { read('data.json', showHandler); });
    break;

  case 'remove':
    remove(jsonFilePath, 'todo', optInput, removeHandler);
    break;

  case 'edit':
    replaceOneElement(jsonFilePath, 'todo', optInput, optTxt, replaceHandler);
    break;

  default:
    console.log('no command given');
    break;
}
