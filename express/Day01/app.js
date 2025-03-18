
// Import express
const express = require('express');

// Create an express app
const app = express();

// Set a port to listen on
const port = 3000;

// Middleware to serve static files (optional)
// app.use(express.static('public'));

// Basic route for the root URL
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Another route to demonstrate a dynamic response
app.get('/greet/:name', (req, res) => {
  const name = req.params.name;
  res.send(`Hello, ${name}!`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
