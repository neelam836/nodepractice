const exp = require('express');

const app = exp();
app.use(exp.urlencoded({extended:true}))

app.use(exp.json()); 
app.set("view engine","ejs")
app.get('/', (req, res) => {
  // res.send('Hello World!');
  res.render("index",{"name":"neelam joshi"})
});

// app.get('/about', function (req, res)  {
//   res.send('About Page');
// });

// app.get('/about/:name',  function (req, res)  {
//   console.log("this is about");
//   res.send(`About page for ${req.params.name}`);
// });

// app.post("/product",  function(req, res)  {
//   console.log(req.body); 
//   // res.json({ name: "neelam" });
//   res.send(req.body);
//   res.end();
// });
// app.put("/product/:id",function (req,res) {

//   if(req.params.id==0)
//     res.status(500).json({message: "something went wrong"});
//   else
//   res.send("updated successfully");
// })
// app.delete('/delete/:id',function(req,res){
//   res.send("this is delete");
// })
const product= require("./routes/product");
app.use("/product",product);

app.listen(3000, () => {
  console.log("Server running at http://127.0.0.1:3000");
});
