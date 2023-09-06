const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
var _ = require('lodash');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set("view engine", "ejs");


mongoose.connect("mongodb://0.0.0.0:27017/blogDB");

const postSchema = {
    title: String,
    content: String
};

const Post = mongoose.model("Post", postSchema);

const homeStartingContent = "Welcome to TAHANAN, your go-to blog site for insights into the world of daily life and the remarkable ways in which journaling can enhance personal well-being. In the hustle and bustle of our fast-paced lives, we often overlook the significance of everyday moments. Our blog is here to remind you of the power of introspection through journaling, offering a wealth of tips, personal stories, and resources to help you get started on your journaling journey. Explore with us as we uncover the myriad benefits of keeping a journal and how it can be a transformative tool for self-discovery and personal growth."
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";



app.get("/", async function (req, res) {

    try {
        const posts = await Post.find({});
        res.render("home", {
            startingContent: homeStartingContent,
            posts: posts
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});


app.post("/compose", async function (req, res) {

    try {
        const post = new Post({
            title: req.body.postTitle,
            content: req.body.postBody
        });
        await post.save();
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});


app.get("/posts/:postId", async (req, res) => {
    try {
        const requestedPostId = req.params.postId;
        const post = await Post.findOne({_id: requestedPostId});
        res.render("post", {
            title: post.title,
            content: post.content,
            post: post
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/posts/:postId/delete", async (req, res) => {
    try {
        
        const requestedPostId = req.params.postId;
        await Post.findByIdAndRemove(requestedPostId);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});



app.get("/about", function (req, res) {
    res.render("about", {
        aboutPage: aboutContent
    });
});

app.get("/contact", function (req, res) {
    res.render("contact")
});

app.get("/compose", function (req, res) {
    res.render("compose");

});


app.listen(3000, function () {
    console.log("Server is running on port 3000");
});