const exp = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb://localhost:27017";

async function connects(collectionname = "students") {
  const client = new MongoClient(uri);
  await client.connect();
  console.log("connect to database");

  const db = client.db("mern");
  return db.collection(collectionname);
}

async function getrResult() {
  const result = (await connects()).find().toArray();
  return result;
}
const app = exp.Router();

app.get("/", (req, res) => {
  getrResult().then((data) => {
    // console.log(data);
    res.render("product/index", { data });
  });
  // res.send("this is product list");
});
app.post("/", async (req, res) => {
  (await connects()).insertOne(req.body);
  res.redirect("/product"); // or render a success page

  //    console.log(req.body);
  // let {name,price}=req.body;
  // res.render('product/show',req.body);
  // res.render(`Name:<b>${name}</b><br>Price:<b>${price}</b>`);

  // res.send("this is post  form product list");
});
app.get("/create", (req, res) => {
  // res.send("this is create  product list");
  res.render("product/create");
});
app.post("/delete/:id", async (req, res) => {
//   const collection = await connects();
  (await connects()).deleteOne({ _id: new ObjectId(req.params.id) });
  res.redirect("/product");
});
// app.get("/:id",(req,res)=>{
//     res.send("this is find product list");

// });
// app.put("/:id",(req,res)=>{
//     res.send("this is updated  product list");

// });
// app.delete("/:id",(req,res)=>{
//     res.send("this is delete product list");

// });
app
  .route("/:id")
  .get((req, res) => {
    res.send("this is find list");
  })
  .put((req, res) => {
    res.send("this is put list");
  })
  .delete((req, res) => {
    res.send("this is delete list");
  });

module.exports = app;
