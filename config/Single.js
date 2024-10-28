import multer from 'multer';
import path from 'path';

// Multer storage configuration to store PDFs in the 'uploads' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder where files will be saved
  },
  filename: (req, file, cb) => {
    req.body.originalName = file.originalname;
    const originalNameWithoutExt = path.parse(req.body.originalName).name;

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${originalNameWithoutExt}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

// File filter to only allow PDF files
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['application/pdf'];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only PDF files are allowed'), false); // Reject the file
  }
};

// Multer upload instance with fileFilter to restrict to PDFs
const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Optional: limit file size to 5MB
});

export default upload;
