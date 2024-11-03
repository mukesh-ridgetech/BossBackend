// models/PersonalDetails.js
import mongoose from 'mongoose';

const personalDetailsSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, required: true },
  countryOfResidence: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dutchPassport: { type: String, required: true },
  driversLicense: { type: String, required: true },
  drivingLicenseCategory: { type: String, required: true },
  ownVehicle: { type: String, required: true },
  currentlyEmployed: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('PersonalDetails', personalDetailsSchema);
