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
  currentlyEmployed: { type: String, required: true },
  status:{
    type:String,
    default:"Active"
},
companyName:{
  type:String,
},

jobTitle:{
  type:String,
},


companyName1:{
  type:String,
},

jobTitle1:{
  type:String,
},


DOS:{
  type:String,
},

RFL:{
  type:String,
},

HAW:{
  type:String,
},

day:{
  type:String,
},

WorkE:{
  type:String,
},

WorkN:{
  type:String,
},

startTime:{
  type:String,
},

finishTime:{
  type:String,
},

highEducatioin:{
  type:String,
},


}, { timestamps: true });

export default mongoose.model('PersonalDetails', personalDetailsSchema);
