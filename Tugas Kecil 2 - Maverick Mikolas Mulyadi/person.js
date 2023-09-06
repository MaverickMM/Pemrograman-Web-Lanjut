// 1. set default value = fullName = "unknown", age = 25, isMale = false,
const Person = (fullName, age, isMale, avatar) => {
    // ternary operator, menggantikan if-else
    const info = () => {
    // 2. tampilkan full name, sex dan age
    return `${fullName}, ${isMale ? "Laki-laki" : "Perempuan"}, ${age} years old`;
    };

    
  // Create an object to hold methods and properties
  const personObject = {
    // 3. Define a getter method to retrieve the info
    get getInfo() {
      return info();
    },
    // 4. Define a toString method to return the info
    toString() {
      return info();
    },
    // 5. Define a method to add years to the current age
    addAge: (years) => {
      age += years;
      return age;
    },
    // 6. Define a method to set a new age
    setAge: (newAge) => {
      age = newAge;
    },
    // 7. Define a method to set a new name
    rename: (newName) => {
      fullName = newName;
    },
    // 8. Use shorthand property notation to return all values
    fullName,
    age,
    isMale,
    avatar,
  };

  return personObject; // Return the created object
};

// 9. Export the Person object as a module
export default Person;