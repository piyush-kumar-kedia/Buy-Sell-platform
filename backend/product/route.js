import express from "express"
import { createProduct, deleteProduct, getPoduct, getProductById, updateProduct } from "./controller.js";

const router= express.Router();


router.get("/",getPoduct);

router.post("/",createProduct);

router.get('/:id', getProductById);

router.delete('/:id',deleteProduct);

router.put('/:id',updateProduct);

export default router;