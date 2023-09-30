import { dog_env } from './env.js';

// Deklarasi
let savedPetList = localStorage.getItem('petList');
let petList;
if (savedPetList) {
    try {
        petList = JSON.parse(savedPetList);
    } catch (e) {
        console.error("Error parsing pet list:", e);
    }
}

const searchParams = new URLSearchParams(window.location.search);

let currentPage = parseInt(searchParams.get("page"));
if (!currentPage || isNaN(currentPage)) currentPage = 1;

const getBreedsImage = async (sortBy = "asc") => {
    const apiUrl = `${dog_env.endpoint}/v1/images/search`;
    const queryParams = new URLSearchParams({
        include_categories: 'true',
        include_breeds: 'true',
        has_breeds: 'true',
        order: sortBy,
        page: currentPage,
        limit: '10',
    });

    const response = await fetch(`${apiUrl}?${queryParams}`, {
      method: "GET",
      headers: { 
          "x-api-key": dog_env.API_KEY,
          Accept: "application/json"
       },
     });

     if (!response.ok) throw new Error(`HTTP error! status:${response.status}`);

     return response.json();
};

const fetchImage =(sortBy)=>{
   getBreedsImage(sortBy)
     .then((data) => {
       localStorage.setItem("petList", JSON.stringify(data));
       renderComponent(data);
     })
     .catch((error) => console.error("Error fetching data:", error));
};

fetchImage();

// 11. Definisikan selector untuk dropdown menu, search form dan search input element
const dropdownElement = document.querySelector(".dropdownMenu");
const formElement = document.querySelector(".searchForm");
const searchInputElement= document.querySelector(".searchInput");

// pagination
const prevPageElement= document.querySelector(".prevPagination");
const pageOneElement= document.querySelector(".pageOne");
const pageTwoElement= document.querySelector(".pageTwo");
const pageThreeElement= document.querySelector(".pageThree");
const nextPageElement= document.querySelector(".nextPagination");


const PetCardComponent = (pet) => {
  // 13a. tampilkan nilai dari breeds dari array ke 0
  const firstBreed = pet.breeds[0] || { name: "Unknown Breed" }; // Default to "Unknown Breed" if no breed data is available.

 // 13b. tampilkan hasil nilai dibawah ini sesuai dengan response yang didapatkan
  return `
    <div class="card my-3 mx-2" style="width: 20%">
      <img height="300" style="object-fit: cover" class="card-img-top" src="${pet.url}" alt="Pet Image" />
      <div class="card-body">
        <h5 class="card-title d-inline">${firstBreed.name}</h5>
        <p class="card-text">
          ${pet.description || "No description available."}
        </p>
        <p>Life Span: ${firstBreed.life_span || "Unknown"}</p>
        <span class="badge badge-pill badge-info">Breed: ${firstBreed.name}</span>
        <span class="badge badge-pill badge-warning">Weight: ${firstBreed.weight.imperial || "Unknown"}</span>
        <span class="badge badge-pill badge-danger">Height: ${firstBreed.height.imperial || "Unknown"}</span>
      </div>
    </div>
  `;
};

const renderComponent = (filteredPet) => {
  document.querySelector(".petInfo").innerHTML = filteredPet
    .map((pet) => PetCardComponent(pet))
    .join("");
};

function sortPetById(sortBy){
  if(sortBy==='ascending'){
      fetchImage('asc');
  }else if(sortBy==='descending'){
      fetchImage('desc');
  }
}

// function searchPetByKey(key){
//   return petList.filter(pet=>pet.property===key);
// }

// dropdownElement.addEventListener("change", function(event) {
//   const sortBy=event.target.value;
//   sortPetById(sortBy);
// });

// formElement.addEventListener("submit", function(event) {
//   event.preventDefault();
  
//   const key=searchInputElement.value.trim();
//   const filteredPets=searchPetByKey(key);
  
//   renderComponent(filteredPets);
// });

function searchPetByKey(key) {
  if (!petList) return []; // Return an empty array if petList is not available

  return petList.filter((pet) => {
    const firstBreed = pet.breeds[0] || { name: "Unknown Breed" };
    const breedName = firstBreed.name.toLowerCase();
    return breedName.includes(key.toLowerCase());
  });
}

dropdownElement.addEventListener("change", function(event) {
  const sortBy = event.target.value;
  sortPetById(sortBy);
});

formElement.addEventListener("submit", function(event) {
  event.preventDefault();
  
  const key = searchInputElement.value.trim();
  const filteredPets = searchPetByKey(key);
  
  renderComponent(filteredPets);
});

function redirectTo(page){
   searchParams.set('page', page);
   window.location.search = searchParams.toString();
}

prevPageElement.addEventListener("click", function(event) {
    event.preventDefault();
    redirectTo(currentPage -1 );
});

pageOneElement.addEventListener("click", function(event) {
    event.preventDefault();
    redirectTo(1);
});

pageTwoElement.addEventListener("click", function(event) {
    event.preventDefault();
    redirectTo(2);
});

pageThreeElement.addEventListener("click", function(event) {
    event.preventDefault();
    redirectTo(3);
});


nextPageElement.addEventListener("click", function() {
     event.preventDefault();
     redirectTo(currentPage +1 );
});