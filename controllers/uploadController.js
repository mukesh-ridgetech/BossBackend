import path from 'path';
import fs from 'fs';

export const uploadImage = async (req, res) => {
    // If no file is uploaded, return an error
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
  
    // Create the image URL based on the server's static folder path
    const imageUrl = `/uploads/${req.file.filename}`;
  
    try {
      res.status(201).json({
        message: 'Image uploaded successfully',
        imageUrl: imageUrl,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  


  export const deleteImage = async (req, res) => {
    const { filename } = req.params;
  
    // Path of the file to be deleted
    const filePath = path.join('uploads', filename);
  
    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({ message: 'File not found' });
      }
  
      // Delete the file from the system
      fs.unlink(filePath, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error deleting file' });
        }
        res.status(200).json({ message: 'File deleted successfully' });
      });
    });
  };
  