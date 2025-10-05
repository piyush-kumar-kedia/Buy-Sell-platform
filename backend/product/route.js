import express from "express"
import { createProduct, deleteProduct, getPoduct, getProductById, updateProduct } from "./controller.js";
import { authenticateToken } from "../middleware/authController.js";

const router= express.Router();


router.get("/",getPoduct);

router.post("/",authenticateToken,createProduct);

router.get('/:id', getProductById);

router.delete('/:id',authenticateToken,deleteProduct);

router.put('/:id',authenticateToken,updateProduct);

export default router;