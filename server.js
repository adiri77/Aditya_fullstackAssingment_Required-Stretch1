const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentsRouter = require('./router/index'); // assuming you saved the routes in routes/students.js


require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json()); // for parsing application/json



mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));



app.use('/api', studentsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
