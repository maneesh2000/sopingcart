const { response } = require('express');
var express = require('express');
const { render } = require('../app');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')
/* GET users listing. */
router.get('/', function(req, res, next) {
  
  productHelpers.getALLProducts().then((products)=>{

    res.render('admin/view-products',{ admin:false, products});

  })



});
router.get('/add-product',function(rdq,res) {
  res.render('admin/add-product')
})

router.post('/add-product',(req,res)=>{


productHelpers.addProduct(req.body,(id)=>{
  console.log(id)

  let image=req.files.image
  console.log(id);
  image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
    if(!err){

      res .render("admin/add-product")
    }else{

      console.log(err)
    }


    
  })


})
})

router.get('/delete-product/:id',(req,res)=>{
let proId=req.params.id
console.log(proId);
productHelpers.deleteProduct(proId).then((response)=>{

  res.redirect('/admin/')
})
  
})

router.get('/edit-product/:id',async(req,res)=>{
  let product=await productHelpers.getProductDetails(req.params.id)
  console.log(product)
res.render('admin/edit-product',{product})

})

router.post('/edit-product/:id',(req,res)=>{
  console.log(req.params.id);

  productHelpers.updateProduct(req.params.id,req,body).then(()=>{

    res.redirect('/admin')
  })
})
module.exports = router;


