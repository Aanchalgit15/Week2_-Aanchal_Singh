const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON payloads
app.use(express.json());

// POST route to receive array from Postman
app.post('/array', (req, res) => {
  const arrayFromPostman = req.body;

  // Ensure array is provided
  if (!Array.isArray(arrayFromPostman)) {
    return res.status(400).json({ error: 'Payload should be an array' });
  }

  // Perform array operations
  const result = arrayOperations(arrayFromPostman);

  // Send the result back
  res.json({ result });
});

// Function to perform array operations
function arrayOperations(array) {
  // 1. Map: Extracting names of users
  const userNames = array.map(item => item.name);
  console.log("User names:", userNames);

  // 2. Filter: Filtering users under the age of 30
  const usersUnder30 = array.filter(item => item.age < 30);
  console.log("Users under 30:", usersUnder30);

  // 3. Find: Finding a user with age 25
  const userAge25 = array.find(item => item.age === 25);
  console.log("User with age 25:", userAge25);

  // 4. Reduce: Calculating total age of all users
  const totalAge = array.reduce((acc, item) => acc + item.age, 0);
  console.log("Total age of all users:", totalAge);

  // 5. Every: Checking if all users are above 18 years old
  const allAbove18 = array.every(item => item.age > 18);
  console.log("Are all users above 18?", allAbove18);

  // 6. Some: Checking if there's any user with age 50
  const anyAge50 = array.some(item => item.age === 50);
  console.log("Is there any user with age 50?", anyAge50);

  // 7. Sort: Sorting users by age
  const sortedArray = array.slice().sort((a, b) => a.age - b.age);
  console.log("Array sorted by age:", sortedArray);

  return {
    userNames,
    usersUnder30,
    userAge25,
    totalAge,
    allAbove18,
    anyAge50,
    sortedArray
  };
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
