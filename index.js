const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const path = require('path');
const fs=require('fs');

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static('public'));


// In-memory data store
let data = [];

app.post('/api/data',async (req, res) => {
  const newData = req.body;
  data.push(newData);
  try {
    console.log("called")
    await write();
    setTimeout(() => {
        res.status(201).send('Data added successfully');
      }, 2000);
    console.log("finised");
  } catch (error) {
    console.error('Error writing to file:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    console.log(password)
    let users=[];
        fs.readFile('jsondata.json', 'utf-8', (err, data) => {
            if (err) {
              console.error('Error reading user data from file:', err.message);
            } else {
              users = JSON.parse(data);
              const user = users.find(user => user.email === email && user.password === password);
              if (!user) {
                return res.status(401).send({status:'failed'});
              }
               console.log(users);
              // Respond with a success message
              res.status(200).send({status:'success',data:user});
            }
      });
    // Check if the user exists
   
  });

async function write() {
const jsondata=JSON.stringify(data);
fs.writeFile('jsondata.json', jsondata,(err) =>{
    console.log('done');
})
}

// Display Data
app.get('/api/data', (req, res) => {
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});