import Router from 'express';
import { matchedData,checkSchema,validationResult} from 'express-validator';
import {prodValidationSchema} from '../validation_Middleware/validationschema.js'
const router = Router();


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

const prod = [
  {id:1,product:"iphone14"},
  {id:2,product:"iphone15"},
  {id:3,product:"iphone16"},
  {id:4,product:"iphone17"}
]

router.get('/api/prod', (req,res)=>{
  
  const {query:{filt,value}} = req;
  if(value == undefined) return res.send(prod);
  console.log(filt,value);
  const products = prod.filter((pro)=>pro[filt].includes(value));
 
  return res.send(products);
});



router.get('/api/prod/:id',(req,res)=>{
  console.log(req.params.id);
  const ID = parseInt(req.params.id);
  if(isNaN(ID)){
    return res.status(400).send('Invalid query')
  }
  const product = prod.filter((pro)=>pro.id==ID);
  res.send(product);
})  
//post request
router.post('/api/prod',checkSchema(prodValidationSchema),(req,res)=>{
  const result = validationResult(req);
  // console.log(result);
  if(!result.isEmpty()){
    return res.status(400).send({validationError:result.array()});
  }
  // console.log(req.body);
  const product = req.body;
  const newUser = {id:prod.length + 1, ...product};

  prod.push(newUser);

  res.status(200).send(newUser);
  
})
//put request
router.put('/api/prod/:id',(req,res)=>{
 
  const id = req.params.id;
  const index = prod.findIndex((pro)=>pro.id == id);
  if(index == -1)res.status(300).send('invalid response');
  const body = req.body;
  const newUser = {id:id, ...body};

  prod[index] = newUser;

  res.send(newUser)

  
})
//patch request

router.patch('/api/prod/:id',getprodindex,(req,res)=>{
 const index = req.index;
  const body = req.body;
  console.log(body);
  prod[index] = {...prod[index], ...body};
  return res.send('ubdated successfully')
})

//delete request

router.delete('/api/prod/:id',getprodindex,(req,res)=>{
  const index = req.index;
  const products = prod.splice(index,1);
  res.send( products)

})
export default router;