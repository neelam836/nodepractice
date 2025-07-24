// const exp = require("express");
// const { MongoClient, ObjectId } = require("mongodb");
// const uri = "mongodb://localhost:27017";

// async function connects(collectionname = "students") {
//   const client = new MongoClient(uri);
//   await client.connect();
//   console.log("connect to database");

//   const db = client.db("mern");
//   return db.collection(collectionname);
// }

// async function getrResult() {
//   const result = (await connects()).find().toArray();
//   return result;
// }
// const app = exp.Router();

// app.get("/", (req, res) => {
//   getrResult().then((data) => {
//     // console.log(data);
//     res.render("product/index", { data });
//   });
//   // res.send("this is product list");
// });
// app.post("/", async (req, res) => {
//   (await connects()).insertOne(req.body);
//   res.redirect("/product"); // or render a success page

//   //    console.log(req.body);
//   // let {name,price}=req.body;
//   // res.render('product/show',req.body);
//   // res.render(`Name:<b>${name}</b><br>Price:<b>${price}</b>`);

//   // res.send("this is post  form product list");
// });
// app.get("/create", (req, res) => {
//   // res.send("this is create  product list");
//   res.render("product/create");
// });
// app.delete('/delete/:id', async (req, res) => {
//   const db = client.db('mern');
//   const collection = db.collection('students');
//   await collection.deleteOne({ _id: new ObjectId(req.params.id) });
//   res.json({ message: 'Item deleted' });
//    res.redirect("/product");
// });

// // app.post("/delete/:id", async (req, res) => {
// // //   const collection = await connects();
// //   (await connects()).deleteOne({ _id: new ObjectId(req.params.id) });
// //   res.redirect("/product");
// // });
// // app.get("/:id",(req,res)=>{
// //     res.send("this is find product list");

// // });
// // app.put("/:id",(req,res)=>{
// //     res.send("this is updated  product list");

// // });
// // app.delete("/:id",(req,res)=>{
// //     res.send("this is delete product list");

// // });
// app
//   .route("/:id")
//   .get((req, res) => {
//     res.send("this is find list");
//   })
//   .put((req, res) => {
//     res.send("this is put list");
//   })
//   .delete((req, res) => {
//     res.send("this is delete list");
//   });

// module.exports = app;

const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb://localhost:27017";

const router = express.Router();

// MongoDB connection helper
async function connects(collectionName = "students") {
  const client = new MongoClient(uri);
  await client.connect();
  console.log("Connected to database");
  const db = client.db("mern");
  return db.collection(collectionName);
}

// Get all students
router.get("/", async (req, res) => {
  const data = await (await connects()).find().toArray();
  res.render("product/index", { data });
});

// Render create form
router.get("/create", (req, res) => {
  res.render("product/create");
});

// Add a new student
router.post("/", async (req, res) => {
  await (await connects()).insertOne(req.body);
  res.redirect("/product");
});

// DELETE using DELETE method (via fetch/axios)
router.delete("/delete/:id", async (req, res) => {
  await (await connects()).deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ message: "Deleted successfully" });
});

// PUT method (update by ID)
router.put("/:id", async (req, res) => {
  await (await connects()).updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.json({ message: "Updated successfully" });
});

// GET one student
router.get("/:id", async (req, res) => {
  const data = await (await connects()).findOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
});

module.exports = router;
