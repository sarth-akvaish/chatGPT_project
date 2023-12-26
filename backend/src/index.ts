import express from 'express'

const app = express();

app.get("/",(req,res,next)=>{
  return res.send("Hello");
})

app.listen(5000,()=> 
console.log("Server running")
);