const e = require('cors');
const express = require('express');
const app = express();
app.use(express.json());

const prod = [
  {id:1,product:"iphone14"},
  {id:2,product:"iphone15"},
  {id:3,product:"iphone16"},
  {id:4,product:"iphone17"}
]
const getprodindex = (req,res,next)=>{
  const id = req.params.id;
  if(isNaN(id))return res.status(400).send('invalid request')
  const index = prod.findIndex((pro)=>{return pro.id == id});
  if(index === -1){
   return res.status(400).send('product not found');
  }
  req.index = index;
  next();
};

app.get('/api/prod', (req,res)=>{
  
  const {query:{filt,value}} = req;
  if(value == undefined) return res.send(prod);
  console.log(filt,value);
  const products = prod.filter((pro)=>pro[filt].includes(value));
 
  return res.send(products);
})


app.get('/api/prod/:id',(req,res)=>{
  console.log(req.params.id);
  const ID = parseInt(req.params.id);
  if(isNaN(ID)){
    return res.status(400).send('Invalid query')
  }
  const product = prod.filter((pro)=>pro.id==ID);
  res.send(product);
})  
//post request
app.post('/api/prod',(req,res)=>{
  console.log(req.body);
  const product = req.body;
  const newUser = {id:prod.length + 1, ...product};

  prod.push(newUser);

  res.status(200).send(newUser);
  
})
//put request
app.put('/api/prod/:id',(req,res)=>{
 
  const id = req.params.id;
  const index = prod.findIndex((pro)=>pro.id == id);
  if(index == -1)res.status(300).send('invalid response');
  const body = req.body;
  const newUser = {id:id, ...body};

  prod[index] = newUser;

  res.send(newUser)

  
})
//patch request

app.patch('/api/prod/:id',getprodindex,(req,res)=>{
 const index = req.index;
  const body = req.body;
  console.log(body);
  prod[index] = {...prod[index], ...body};
  return res.send('ubdated successfully')
})

//delete request

app.delete('/api/prod/:id',getprodindex,(req,res)=>{
  const index = req.index;
  const products = prod.splice(index,1);
  res.send( products)

})
app.get('/',(req,res)=>{
  res.send(prod);
})



app.listen(3000,()=>{
  console.log('listening to port 3000');
});
