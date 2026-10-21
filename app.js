const express= require("express");
const app= express();
const mongoose= require("mongoose");
const Listing= require("./models/listing.js");
const path= require("path"); 
const methodOverride= require("method-override");

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.get("/", (req, res)=>{
    res.send("This is Root.")
})

app.get("/listings", async (req, res)=>{
   let allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
});

//New Route
app.get("/listings/new", (req, res)=>{
    res.render("listings/newUser.ejs");
});

//Show Route
app.get("/listings/:id", async (req, res)=>{
   let {id}= req.params;
  const listing= await Listing.findById(id);
  res.render("listings/show.ejs",{listing});
});

//Create Route
app.post("/listings", async (req, res)=>{
    const listing= new Listing(req.body.listing);
    await listing.save();
    res.redirect("/listings");
});

//Update/Edit Route
app.get("/listings/:id/edit", async (req, res)=>{
    let {id}= req.params;  
    const listing= await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
});

app.put("/listings/:id/edit", async (req, res)=>{
    let {id}= req.params;
    //console.log({...req.body.listing});
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id", async (req, res)=>{
    let {id}= req.params;
    let deletedListing= await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
})

// let listing= new Listing({
//     title: "My new Villa",
//     discription: "By the Beach",
//     price: 20000,
//     location: "Calangute, Goa",
//     country: "India"
// })

// listing.save()
// .then(()=>{
//     console.log("Listing was saved.");
//     console.log("Successful!");
// })
// .catch(()=>{
//     console.log(err);
// })

app.listen(8080, ()=> {
    console.log("Server is Listening on port 8080.");
});