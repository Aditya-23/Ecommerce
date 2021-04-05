const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "User"
    },
    items : [
        {
            product : {type : mongoose.Schema.Types.ObjectId, ref : "Product"},
            quantity : {type : Number, min : 1},
            price : {type : Number}
        }
    ]
},{
    timestamps: true,
});

const cartModel = new mongoose.model("Cart", cartSchema);

module.exports = {
    Cart : cartModel,
}