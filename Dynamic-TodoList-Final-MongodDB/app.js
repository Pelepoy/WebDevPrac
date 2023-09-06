const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");
var _ = require('lodash');

const day = date.getDate();

// console.log(date.getDay());

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"))
app.set("view engine", "ejs");

mongoose.connect("mongodb://0.0.0.0:27017/todolistDB");

const itemsSchema = new mongoose.Schema({
  name: String
});
 
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Meditate"
});
const item2 = new Item({
  name: "Brush Teeth"
});
const item3 = new Item({
  name: "Eat breakfast"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema]
}

const List = mongoose.model("List", listSchema);

app.get("/", async (req, res) => {
  try {
    const foundItems = await Item.find({});

    if (foundItems.length === 0) {
      await Item.insertMany(defaultItems);
      console.log("Successfully added default items documents");
      res.redirect("/");
    } else {
      res.render("list", {
        getDay: day,
        listTitle: "Today",
        newListItems: foundItems
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/:customListName", async (req, res) => {
  // console.log(req.params.customListName);
  const customListName = _.capitalize(req.params.customListName);

  try {
    const foundList = await List.findOne({ name: customListName });

    if (!foundList) {
      // console.log("Doesn't exist!");
      //create a new list if doesnt exist
      const list = new List({
        name: customListName,
        items: defaultItems
      });
      list.save();
      res.redirect("/" + customListName)
    } else {
      // console.log("Exists!");
      //render if exists
      res.render("list", {
        getDay: day,
        listTitle: foundList.name,
        newListItems: foundList.items
      })
    }
    } catch (err) {
    console.error("An error occurred:", err);
    res.status(500).send("An error occurred");
  }
});
  



app.post("/", async function (req, res) {

  const itemName = req.body.newItem;
  const listName = req.body.list;
  const item = new Item({
    name: itemName
  });


  if (listName === "Today") {
    item.save()
      .then(() => {
        console.log("Item: " + itemName + " added successfully!");
        res.redirect("/");
      })
      .catch((err) => {
        console.error("An error occurred:", err);
        res.status(500).send("An error occurred");
      });
  } else {
    try {
      const foundList = await List.findOne({ name: listName });

      if (foundList) {
        foundList.items.push(item);
        await foundList.save();
        res.redirect("/" + listName);
      } else {
        // Handle the case where the list is not found
        res.status(404).send("List not found");
      }
    } catch (err) {
      console.error("An error occurred:", err);
      res.status(500).send("An error occurred");
    }
  }
});

app.post("/delete", async function (req, res) {
  // console.log(req.body.checkbox);
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today"){

    Item.findByIdAndRemove({_id: checkedItemId})
  .then(() => {
    console.log( "checked item with id no. " + checkedItemId +" deleted Succesfully!");
    res.redirect("/");
  })
  .catch((err) => {
    console.log(err);
  });
  } else {
    const foundList = await List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId }}}) //$pull = how we gonna update it using array items
    if (foundList){
      res.redirect("/" + listName)
    }
  }

});


app.get("/about", function (req, res) {
  res.render("about");
})


app.listen(3000, function () {
  console.log("Server is running on port 3000.");

});