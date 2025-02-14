var express = require('express');
var app = express();
var mongoose = require('mongoose');
var firstSchema = require('./schema');
app.use(express.json());


// MongoDB URL without specifying a database name
let dburl = 'mongodb+srv://vaishu_shinde_30:vaishu12@cluster0.fqife.mongodb.net/'
//establish connection
mongoose.connect(dburl)
  .then(() => console.log('db connected'))
  .catch((err) => console.log('DB connection error:', err));

// GET route to fetch all users
app.get('/', async function (req, res) {
  try {
    const list = await firstSchema.find();
    res.send(list);
  } catch (err) {
    console.log('Error fetching data:', err);
    res.status(500).send('Error fetching data');
  }
});

// POST route to create a new user
app.post('/sign-up', async function (req, res) {
  try {
    const newUser = new firstSchema(req.body);
    await newUser.save();
    res.json({
      message: 'Data inserted successfully'
    });
  } catch (err) {
    console.log('Error saving data:', err);
    res.status(500).send('Error saving data');
  }
});

// PUT route to update a user's information by email
app.put('/update/:id', async function (req, res) {
    try {
      // Step 1: Find the user by id
      let user = await firstModel.findOne({ id: req.params.id });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Step 2: Modify the user data
      if (req.body.name) user.name = req.body.name.toUpperCase(); // Convert name to uppercase
      if (req.body.email) user.email = req.body.email;
  
      // Step 3: Save the updated document
      await user.save();
    
      res.json({
        message: 'User updated successfully',
        updatedUser: user
      });
  
    } catch (err) {
      console.error('Error updating data:', err);
      res.status(500).json({ message: 'Error updating data' });
  }
  });
  
    

// DELETE route to delete a user by email
app.delete('/delete/:id', async function (req, res) {
  try {
    const deletedUser = await firstSchema.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).send('User not found');
    }
    res.json({
      message: 'User deleted successfully',
      deletedUser: deletedUser
    });
  } catch (err) {
    console.log('Error deleting data:', err);
    res.status(500).send('Error deleting data');
  }
});

app.listen(3000, () => console.log('Server is running on port 3000')); 