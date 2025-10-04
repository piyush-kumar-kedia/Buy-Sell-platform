import mongoose, { Types } from "mongoose";

const ProductSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image_url:{
        type: String,
        default: ""
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    }

},{
    timestamps: true
});

export default mongoose.model("Product", ProductSchema);