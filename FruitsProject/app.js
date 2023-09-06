const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/fruitsDB");

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your entry, name is required."]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema); // it automatically lower case the first letter and set to plural.

const fruit = new Fruit({
  name: "Kaimito",
  rating: 7,
  review: "Hmmm yeah it's cool, gonna have this one again."
});

// fruit.save();


const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const watermelon = new Fruit({
  name: "Watermelon",
  rating: 10,
  review: "Every brown bear loves watermelon. So does people."
})
// watermelon.save();

const person = new Person({
  name: "Aethelwulf",
  age: 29,
  // favouriteFruit: pineapple
});

// person.save();

//--------------------------------------------------------------------------------------------------------//

                                        // UPDATE PERSON 

// Person.updateOne({_id:"64f1d58687d1b15307e1a4d0"}, {favouriteFruit: watermelon})
// .then(()=>{
//   console.log("Succesfully updated");
// })
// .catch((err) => {
//   console.log(err);
// })


//------------------------------------------------------------------------------------------------------//
//ADD MULTIPLE VALUE
// const mango = new Fruit({
//     name: "Mango",
//     rating: "9",
//     review: "Good for shake!"
// });

// const lanzones = new Fruit({
//     name: "Lanzones",
//     rating: 7,
//     review: "Hmmmm its like a lato-lato"
// });

// const banana = new Fruit({
//     name: "Banana",
//     rating: 9,
//     review: "Monkeys love banana so does people"
// });

// Fruit.insertMany([mango, lanzones, banana]) //specifies the model "Fruit" that holds the collection schema.
// .then(function () { 
//     console.log("Data inserted")
// })
// .catch(function (err) {
//     console.log(err);
// })
//------------------------------------------------------------------------------------------------------//

// UPDATE VALUE
// Fruit.updateOne({_id: "64f1c9288688b9e8e1d609c7"}, {rating: "9", review: "It's kinda weird but it freaking deliciouse"})
// .then(function () { 
//       console.log("Succesfully updated the documents")
//   })
//   .catch(function (err) {
//       console.log(err);
//   })
//-------------------------------------------------------------------------------------------------------// 

// DELETE VALUE (ROW)
// Fruit.deleteOne({
//     _id: "64f2a891cec3ac302d7899f2"
//   })
//   .then(function () {
//     console.log("Deleted Succesfully");
//   })
//   .catch(function (err) {
//     console.log(err);
//   })

// Person.deleteOne({
//     _id: "64f2a891cec3ac302d7899f3"
//   })
//   .then(function () {
//     console.log("Deleted Succesfully");
//   })
//   .catch(function (err) {
//     console.log(err);
//   })

//DELETE MANY (DELETE ALL DEPENDS ON CONDITION)
// Person.deleteMany({name: "Kael"})
// .then(function(){
//     console.log("Deleted all the documents");
// })
// .catch(function(err){
//     console.log(err);
// });

//-------------------------------------------------------------------------------------------------------// 

//FIND VALUES

Fruit.find({})

  .then(function (fruits) {
    fruits.forEach((fruit) => {
      console.log(fruit.name);
    })
  })

  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    // Add a delay of 5 seconds before closing the connection
    setTimeout(() => {
      mongoose.connection.close();
    }, 5000);
  });