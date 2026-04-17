import Product from "../models/product.js";

export function createProduct(req,res){
    if(req.user==null){
        res.status(403).json({
            message:"You need to log in first"
        })

        return;
    }

    if(req.user.role != "admin"){
        res.status(403).json({
            message:"You are not authorize to create a product"
        })

        return;
    }

    const product = new Product(req.body);

    product.save().then(
        ()=>{
            res.json({
                message:"Product saves successfully"
            })
        }
    ).catch(
        (err)=>{
            res.status(500).json({
                message:"Product not saved"
            })
        }
    )

}

export function getProducts(req,res){
    Product.find().then(
        (products)=>{
            res.json(products)
        }
    ).catch(
        (err)=>{
            res.status(500).json({
                message:"Products not found"
            })
        }
    )
}

export function deleteProducts(req,res){
    if(req.user==null){
        res.status(403).json({
            message:"You need to log in first"
        })

        return;
    }

    if(req.user.role != "admin"){
        res.status(403).json({
            message:"You are not authorize to delete a product"
        })

        return;
    }

    Product.findOneAndDelete({
        productId : req.params.productId
    }).then(
        ()=>{
            res.json({
                message:"Product deleted successfully"
            })
        }
    ).catch(
        (err)=>{
            res.json({
                message:"product not deleted"
            })
        }
    )
}

export function updateProducts(req,res){
    if(req.user==null){
        res.status(403).json({
            message:"You need to log in first"
        })

        return;
    }

    if(req.user.role != "admin"){
        res.status(403).json({
            message:"You are not authorize to delete a product"
        })

        return;
    }

    Product.findOneAndUpdate({
        productId : req.params.productId
    },req.body).then(
        ()=>{
            res.json({
                message:"Product update successfully"
            })
        }
    ).catch(
        (err)=>{
            res.json({
                message:"product not updated"
            })
        }
    )
}