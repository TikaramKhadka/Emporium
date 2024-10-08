const Product = require('../models/product')

// get all Proudct
 const getAllProduct = async (req, res)=>{
    try {       
        const data = await Product.find();    
        if(!data)
        {
            return res.status(404).json({msg:"products not found"});
        }
        else{
            res.json(data)
        }
    } catch (error) {
        res.status(500).json({msg:"something went wrong", error})
        console.log(error)
    }
}
// get category by product id
const getProductById = async (req, res) => {
    try {
        const data = await Product.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ msg: `${req.params.id} product not found` });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong" });
    }
};
// get category by product id
const getProductByCategoryId = async (req, res) => {
    try {
        const data = await Product.findById({ categoryId: req.params.id }); // Assuming categoryId is part of the Product model
        if (!data) {
            return res.status(404).json({ msg: `${req.params.id} category not found` });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong" });
    }
};


// register new product
const registerProduct =  async (req, res)=>{
    try {
        const productExist = await Product.exists({productName: req.body.productName})
        if(productExist){
            return res.status(201).json({msg:`${req.body.productName} already exist`});
        }
        const newProduct = await Product.create(req.body)
        res.status(201).json({msg: `${req.body.productName} added successfully`, newProduct});
    } catch (error) {
        res.status(500).json({msg:"something went wrong", error});
    }     
}
const updateProductById = async (req, res)=>{
    try {
        const data = Product.findByIdAndUpdate(req.params.id, req.body);
        if(!data){

            return res.status(404).json({msg:`${req.params.id} poduct not found`});
        }
        res.status(201).json({msg:`${req.params.id} updated successfully`, data});
    } catch (error) {
        res.status(500).json({msg:"something went worng"});
    }
}
const deleteProductById = async(req,res)=>{
    try {
        const data = Product.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).json({msg:`${req.params.id} product not found`});
        }
        res.status(201).json({msg:`${req.params.id} product deleted successfully`});
    } catch (error) {
        res.status(500).json({msg:"something went wrong"});
    }
}

module.exports = {getAllProduct, getProductById, registerProduct, updateProductById, deleteProductById, getProductByCategoryId}