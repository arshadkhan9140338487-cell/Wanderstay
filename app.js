const express= require("express");
const app= express();
const mongoose= require("mongoose");
const Listing= require("./models/listing.js");

main()
.then(()=>{
    console.log("Connected to DB.");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.get("/", (req, res)=>{
    res.send("This is Root.")
})

let listing= new Listing({
    title: "My new Villa",
    discription: "By the Beach",
    price: 20000,
    location: "Calangute, Goa",
    country: "India"
})

listing.save()
.then(()=>{
    console.log("Listing was saved.");
    console.log("Successful!");
})
.catch(()=>{
    console.log(err);
})

app.listen(8080, ()=> {
    console.log("Server is Listening on port 8080.");
});