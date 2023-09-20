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
export function getAllStates() {
  const filePath = path.join(dataDir, 'states.json');
  const jsonString = fs.readFileSync(filePath, 'utf8');
  const statesData = JSON.parse(jsonString);
  return Object.keys(statesData).map(
    function(it) {
      return {params: {id:it}};
    }
  );
}
export function getAllParties() {
  const filePath = path.join(dataDir, 'presidents.json');
  const jsonString = fs.readFileSync(filePath, 'utf8');
  const presidentsData = JSON.parse(jsonString);
  let partyList = Array();
  presidentsData.forEach((it) => {
    if(!partyList.includes(it.party)) {
      partyList.push(it.party);
    }
  });
  return partyList.map(
    function(it) {
      return {params: {id:it}};
    }
  );
}
export function getAllOccupations() {
  const filePath = path.join(dataDir, 'occupations.json');
  const jsonString = fs.readFileSync(filePath, 'utf8');
  const occupationData = JSON.parse(jsonString);
  let jobList = Array();
  occupationData.forEach((it) => {
    let slug = makeSlug(it.job);
    if(!jobList.includes(slug)) {
      jobList.push(slug);
    }
  });
  return jobList.map(
    function(it) {
      return {params: {id:it}};
    }
  );
}
function getStateName(abbr) {
  const filePath = path.join(dataDir, 'states.json');
  const jsonString = fs.readFileSync(filePath, 'utf8');
  const stateData = JSON.parse(jsonString);
  if(stateData.hasOwnProperty(abbr)) {
    return stateData[abbr];
  } else {
    return abbr;
  }
}
function getOccupationsForPresident(theID) {
  const filePath = path.join(dataDir, 'occupations.json');
  const jsonString = fs.readFileSync(filePath, 'utf8');
  const occupationData = JSON.parse(jsonString);
  const objectMatch = occupationData.filter(
    function(it) {
      return it.id.toString() == theID.toString();
    }
  );
  return objectMatch;
}
function makeSlug(s) {
  return s.replace(" ", "-");
}
function reverseSlug(s) {
  return s.replace("-", " ");
}
function getOccupationSlugs(occupationObjects) {
  let occupationList = Array();
  occupationObjects.forEach((it) => {
    occupationList.push({job:it.job, slug:makeSlug(it.job)});
  });
  return occupationList;
}
export async function getData(theID) {
  const filePath = path.join(dataDir, 'presidents.json');
  const jsonString = fs.readFileSync(filePath, 'utf8');
  const presidentsData = JSON.parse(jsonString);
  const objectMatch = presidentsData.filter(
    function(it) {
      return it.id.toString() == theID.toString();
    }
  );
  const prevMatch = presidentsData.filter(
    function(thePrev) {
      let prevID = parseInt(theID)-1;
      return thePrev.id.toString() == prevID.toString();
    }
  );
  const nextMatch = presidentsData.filter(
    function(theNext) {
      let nextID = parseInt(theID)+1;
      return theNext.id.toString() == nextID.toString();
    }
  );
  let toReturn;
  if(objectMatch.length > 0) {
    const president = objectMatch[0];
    const stateName = getStateName(president.homestate);
    const occupations = getOccupationSlugs(getOccupationsForPresident(theID));
    let returnPrevMatch;
    if(prevMatch.length > 0) {
      returnPrevMatch = prevMatch[0];
    } else {
      returnPrevMatch = {};
    }
    let returnNextMatch;
    if(nextMatch.length > 0) {
      returnNextMatch = nextMatch[0];
    } else {
      returnNextMatch = {}
    }
    toReturn = {president:objectMatch[0],
                stateName:stateName,
                prev:returnPrevMatch,
                next:returnNextMatch,
                occupations:occupations,
                birthdate:writeDate(objectMatch[0].birthdate),
                deathdate:writeDate(objectMatch[0].deathdate),
                startTerm:writeDate(objectMatch[0].startTerm),
                endTerm:writeDate(objectMatch[0].endTerm)
               };
  } else {
    toReturn = {};
  }
  return toReturn;
}
export async function getDataByState(abbr) {
  const stateName = getStateName(abbr);
  const filePath = path.join(dataDir, 'presidents.json');
  const jsonString = fs.readFileSync(filePath, 'utf8');
  const presidentsData = JSON.parse(jsonString);
  const objectMatch = presidentsData.filter(
    function(it) {
      return it.homestate == abbr;
    }
  );
  return {stateName:stateName, data:objectMatch};
}
export async function getDataByParty(partyName) {
  const filePath = path.join(dataDir, 'presidents.json');
  const jsonString = fs.readFileSync(filePath, 'utf8');
  const presidentsData = JSON.parse(jsonString);
  const objectMatch = presidentsData.filter(
    function(it) {
      return it.party == partyName;
    }
  );
  return objectMatch;
}
export async function getDataByOccupation(slug) {
  const jobFilePath = path.join(dataDir, 'occupations.json');
  const jsonJobString = fs.readFileSync(jobFilePath, 'utf8');
  const occupationData = JSON.parse(jsonJobString);
  const presidentFilePath = path.join(dataDir, 'presidents.json');
  const jsonPresidentString = fs.readFileSync(presidentFilePath, 'utf8');
  const presidentsData = JSON.parse(jsonPresidentString);
  const objectMatch = occupationData.filter(
    function(it) {
      return it.job == reverseSlug(slug);
    }
  );
  let presidentList = Array()
  objectMatch.forEach((it) => {
    presidentList.push(presidentsData.filter(
      function(that) {
        return that.id == it.id;
      }
    )[0])
  });
  return presidentList;
}
function monthName(m) {
  switch(m) {
  case 1:
    return "January";
    break;
  case 2:
    return "February";
    break;
  case 3:
    return "March";
    break;
  case 4:
    return "April";
    break;
  case 5:
    return "May";
    break;
  case 6:
    return "June";
    break;
  case 7:
    return "July";
    break;
  case 8:
    return "August";
    break;
  case 9:
    return "September";
    break;
  case 10:
    return "October";
    break;
  case 11:
    return "November";
    break;
  case 12:
    return "December";
    break;
  }
}
function isDigit(d) {
  return d == '0' || d == '1' || d == '2' || d == '3' || d == '4'
      || d == '5' || d == '6' || d == '7' || d == '8' || d == '9';
}
function writeDate(d) {
  if(  isDigit(d[0])
    && isDigit(d[1])
    && isDigit(d[2])
    && isDigit(d[3])
    && isDigit(d[5])
    && isDigit(d[6])
    && isDigit(d[8])
    && isDigit(d[9])
  ) {
    return (monthName(parseInt(d.slice(5,7)))
          + " " + parseInt(d.slice(8,10)).toString()
          + ", " + parseInt(d.slice(0,4)).toString());
  } else {
    return d;
  }
}