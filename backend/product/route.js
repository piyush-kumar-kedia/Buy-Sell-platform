import express from "express"
import { createProduct, getPoduct, getProductById } from "./controller.js";

const router= express.Router();


router.get("/",getPoduct);

router.post("/",createProduct);

router.get('/:id', getProductById);

// router.delete('/:id',deleteProduct);

export default router;