//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ =require("lodash");

const homeStartingContent = "Step into the world of self-reflection and personal growth with BLOGMIND. Here, each day is an opportunity to pause, reflect, and chronicle the moments that shape your life's narrative. The platform offers you a digital sanctuary to capture your thoughts, emotions, and experiences in real time. Whether you're celebrating triumphs, navigating challenges, or simply savoring the ordinary, the journal prompts and intuitive interface will guide you on a journey of mindfulness and introspection. Start your day with intention, and let BLOG MIND know them"
const aboutContent = "As a current student pursuing B.Tech in Information and Communication with a passion for learning and a strong work ethic, I am excited to bring my skills and enthusiasm to a dynamic and challenging work environment. With experience in both academic and extracurricular settings, I have developed excellent communication and teamwork skills, as well as a dedication to achieving results. I am a quick learner and thrive in fast-paced environments, and am always looking for new challenges to take on. Whether working independently or as part of a team, I am committed to delivering high-quality work and contributing to the success of any organization I am a part of.";
const contactContent = "Reach out to my Gmail";

const app = express();

var posts=[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req,res){
 res.render("home",{StartingContent:homeStartingContent,
 posts:posts});
 
});

app.get("/about",function(req,res){
  res.render("about.ejs",{aboutContent:aboutContent});
 });

 app.get("/contact",function(req,res){
  res.render("contact.ejs",{contactContent:contactContent});
 });

 app.get("/compose",function(req,res){
  res.render("compose.ejs");
 });

 app.post("/compose",function(req,res){
  const post={
    title:req.body.postTitle,
    content:req.body.postBody
    };

    posts.push(post);
    res.redirect("/");
 });

 app.get("/posts/:postname",function(req,res) {
  const requestedTitle=_.lowerCase(req.params.postname);

  posts.forEach(function(post){
    const storedTitle =_.lowerCase(post.title);

    if (storedTitle===requestedTitle){
      res.render("post",{
        title:post.title,
        content:post.content
      })
    }
  })
   });



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
