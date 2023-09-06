// 1. import Person.js
import person from './person.js';

// 2. Define three person objects as specified
const charles = person("Charles", 20, false, "https://picsum.photos/200");
const mary = person("Mary", 23, false, "https://picsum.photos/200?grayscale");
const jane = person("Jane", 30, true, "https://picsum.photos/seed/picsum/200");

// 3. Add 15 years to Jane's age
jane.addAge(15);

// 4. Set Charles' age to 80 years
charles.setAge(80);

// 5. Display Charles' information using querySelectors
const charlesImg = document.querySelector("#charles img");
const charlesInfo = document.querySelector("#charles .info");

// a. Set Charles' avatar as the image source
charlesImg.src = charles.avatar;

// b. Display Charles' information using Template literals
charlesInfo.innerHTML = `
  <p>Name: ${charles.fullName}</p>
  <p>Age: ${charles.age} years old</p>
  <p>Gender: ${!charles.isMale ? "Laki-laki" : "Perempuan"}</p>
`;

// 6. Display information for Mary and Jane using querySelectors
const maryImg = document.querySelector("#mary img");
const maryInfo = document.querySelector("#mary .info");
const janeImg = document.querySelector("#jane img");
const janeInfo = document.querySelector("#jane .info");

// a. Set Mary's and Jane's avatars as the image source
maryImg.src = mary.avatar;
janeImg.src = jane.avatar;

// b. Display Mary's and Jane's information using Template literals
maryInfo.innerHTML = `
  <p>Name: ${mary.fullName}</p>
  <p>Age: ${mary.age} years old</p>
  <p>Gender: ${!mary.isMale ? "Laki-laki" : "Perempuan"}</p>
`;

janeInfo.innerHTML = `
  <p>Name: ${jane.fullName}</p>
  <p>Age: ${jane.age} years old</p>
  <p>Gender: ${!jane.isMale ? "Laki-laki" : "Perempuan"}</p>
`;

// 7. Combine Charles' object with job information using spread operator
const charlesJob = { job: "Programmer" };
const charlesJobInfo = { ...charles, ...charlesJob };

// 8. Define fullName and job properties of Charles using object destructuring
const { fullName, job } = charlesJobInfo;

// a. Display Charles' job information using a query selector
const charlesJobInfoSelector = document.querySelector("#charles .jobInfo");

// b. Display Charles' job information using Template literals
charlesJobInfoSelector.innerHTML = `
  <p>Name: ${fullName}</p>
  <p>Job: ${job}</p>
`;