// controllers/personalDetailsController.js
import PersonalDetails from '../models/PersonalDetails.js';

// @desc    Create new personal details entry
// @route   POST /api/personal-details
// @access  Public
export const createPersonalDetails = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      countryOfResidence,
      phoneNumber,
      email,
      dutchPassport,
      driversLicense,
      drivingLicenseCategory,
      ownVehicle,
      currentlyEmployed
    } = req.body;

    const newDetails = new PersonalDetails({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      countryOfResidence,
      phoneNumber,
      email,
      dutchPassport,
      driversLicense,
      drivingLicenseCategory,
      ownVehicle,
      currentlyEmployed
    });

    await newDetails.save();
    res.status(201).json(newDetails);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all personal details
// @route   GET /api/personal-details
// @access  Public
export const getPersonalDetails = async (req, res) => {
  try {
    const details = await PersonalDetails.find();
    res.status(200).json(details);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
