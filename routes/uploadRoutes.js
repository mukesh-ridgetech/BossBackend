import express from 'express';
import { uploadImage,deleteImage} from '../controllers/uploadController.js';
import upload from '../config/Single.js'
import upload1 from '../config/Single1.js'

const router = express.Router();


router.post('/uploadImage', upload.single('image'), uploadImage);
router.post('/uploadImage1', upload1.single('image'), uploadImage);
router.delete('/deleteImage/:filename', deleteImage);



export default router;
