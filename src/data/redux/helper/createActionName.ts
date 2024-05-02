import {name as appName} from '../../../../app.json';

// create a method to create redux action name
export default function createActionName(
  reducerName: string,
  actionName: string,
) {
  return `${appName}/${reducerName}/${actionName}`;
}
