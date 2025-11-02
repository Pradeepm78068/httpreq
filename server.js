import express from 'express';
const app = express();
import productRoute from './Routes/product.js';
app.use(express.json());
app.use(productRoute);




app.get('/',(req,res)=>{
  res.redirect('/api/prod');
})



app.listen(3000,()=>{
  console.log('listening to port 3000');
});
