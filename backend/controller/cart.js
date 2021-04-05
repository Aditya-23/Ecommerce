const Cart = require("../models/cart").Cart;


const addToCart = async (req, res, next) => {
    
    const cart = await Cart.findOne({user : req.user.id})

    if(cart){
        console.log(req.body)
        var exist = false;
        for(var i = 0; i < cart.items.length; i++){
            if(cart.items[i].product.toString() == req.body.item.product){
                cart.items[i].quantity += req.body.item.quantity;
                exist = true;
                break;
            }
        }
        if(!exist){
            cart.items.push(req.body.item)
        }
        try {
            await cart.save()
        } catch (error) {
            return res.status(400).json({msg : "Cannot update the cart.."}); 
        }
        return res.status(201).json(cart);
    }
    else{
        const newCart = {
            user : req.user.id,
            items : [req.body.item],
        }
    
        const cartObj = Cart(newCart);
        try {   
            await cartObj.save()
        } catch (error) {
            return res.status(400).json({msg : "Cannot create a cart.."}); 
        }
        
        return res.status(201).json(cartObj);
    }   
    
}

module.exports = {
    addToCart,
}