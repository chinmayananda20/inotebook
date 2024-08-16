const mongoose = require('mongoose'); //importing mongoose
mongoURI = "mongodb://localhost:27017/inoteboook" //database URI

//connecting to databse
const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI)
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
}
module.exports = connectToMongo;//exporting connection function