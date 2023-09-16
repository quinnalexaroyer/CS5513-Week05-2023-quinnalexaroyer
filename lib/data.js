import fs from 'fs';
import path from 'path';
const dataDir = path.join( process.cwd(), 'data' );
export function getSortedList() {
  const filePath = path.join(dataDir, 'presidents.json');
  const jsonString = fs.readFileSync(filePath, 'utf8');
  let presidentsData = JSON.parse(jsonString);
  presidentsData.sort(
    function(x,y) {
      return x.name.localeCompare(y.name);
    }
  )
  return presidentsData.map(
    function(it) {
      return {id:it.id.toString(), name:it.name};
    }
  )
}
export function getAllIds() {
  const filePath = path.join(dataDir, 'presidents.json');
  const jsonString = fs.readFileSync(filePath, 'utf8');
  const presidentsData = JSON.parse(jsonString);
  return presidentsData.map(
    function(it) {
      return {params: {id:it.id.toString()}};
    }
  )
}
export async function getStateName(abbr) {
  const filePath = path.join(dataDir, 'states.json');
  const jsonString = fs.readFileSync(filePath, 'utf8');
  const stateData = JSON.parse(jsonString);
  if(stateData.hasOwnProperty(abbr)) {
    return stateData[abbr];
  } else {
    return abbr;
  }
}
export async function getData(theID) {
  const filePath = path.join(dataDir, 'presidents.json');
  const jsonString = fs.readFileSync(filePath, 'utf8');
  const presidentsData = JSON.parse(jsonString);
  const objectMatch = presidentsData.filter(
    function(it) {
      return it.id.toString() === theID.toString();
    }
  );
  let toReturn;
  if(objectMatch.length > 0) {
    toReturn = objectMatch[0];
  } else {
    toReturn = {"name":"Undefined"};
  }
  return toReturn;
}

