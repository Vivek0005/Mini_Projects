const express = require("express");
const app = express();
({ v4: uuidv4 } = require("uuid"));
const path = require("path");
const methodOverride = require("method-override");

// data / resource
let posts = [
  {
    id: uuidv4(),
    name: "Vivek",
    content: "I will get my first placement before AUGUST 2024",
  },
  {
    id: uuidv4(),
    name: "Luffy",
    content: "I'm gonna be the king of the pirates",
  },
  {
    id: uuidv4(),
    name: "Zoro",
    content: "I'm going to become the greatest swordsman",
  },
];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method")); 

//INDEX ROUTE
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

// CREATE ROUTE
app.get("/posts/new", (req, res) => {
  res.render("newPost.ejs");
});
app.post("/posts", (req, res) => {
  let { user, content } = req.body;
  posts.push({ id: uuidv4(), name: user, content: content });
  res.redirect("/posts");
});

// VIEW ROUTE
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => p.id === id);
  res.render("show.ejs", { post });
});

// UPDATE ROUTE
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => p.id === id);
  res.render("edit.ejs", { post });
});
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  let newContent = req.body.content;
  post.content = newContent;
  res.redirect("/posts");
});

// DESTROY ROUTE
app.delete("/posts/:id", (req, res) => {
  let {id}=req.params;
  posts=posts.filter((p)=>p.id!==id);
  console.log(posts);
  res.redirect("/posts");
});

let port = 8080;
app.listen(port, () => {
  console.log("Listening incoming requests");
});
