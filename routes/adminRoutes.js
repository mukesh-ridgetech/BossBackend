import express from 'express';
import { registerAdmin, loginAdmin, onboardAdmin ,getAllUser,updateUser,toggeled} from '../controllers/adminController.js';
import { protect,authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Register new admin
router.post('/register', registerAdmin);

// Login admin
router.post('/login', loginAdmin);


router.put('/update/:id', updateUser);
router.patch('/toggled/:id', toggeled);

router.get('/getUsers',authenticate, getAllUser);

// Onboard new admin (protected route)
router.post('/onboard', authenticate, onboardAdmin);

export default router;
