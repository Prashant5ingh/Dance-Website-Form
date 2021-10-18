const express= require("express") 
const path= require("path")  
//const fs= require("fs")  
const app=express();  
const bodyparser= require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Dance', {useNewUrlParser: true, useUnifiedTopology: true});
const port=8000;
// define mongoose schema
const DanceSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

  const Contact = mongoose.model('DanceWeb', DanceSchema);
// EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'));   // static file creation
app.use(express.urlencoded()); // save the form data using middleware after post

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // set the template engine as pug as custom backend alternative 
app.set('views',path.join(__dirname,'views'));  // templates == views also set the directory 

// ENDPOINTS
app.get("/", (req,res)=>{
    //const con= "This is the best content on PUG template so far";
     const para={};
    //render for using template
    res.status(200).render('home.pug',para);
});

app.get("/contact", (req,res)=>{
    //const con= "This is the best content on PUG template so far";
     const para={};
    //render for using template
    res.status(200).render('contact.pug',para);
});

app.post("/contact", (req,res)=>{   // saving the data into db using contact form
    var myData= new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved in DB")}).catch(()=>{
            res.status(400).send("Item was not saved in DB");
        });
});

// START THE SERVER
app.listen(port, ()=>{   //localhost or '127.0.0.1',
    console.log(`the application started on the provided port ${port}`);
})