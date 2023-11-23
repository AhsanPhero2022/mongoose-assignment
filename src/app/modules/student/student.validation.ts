import Joi from "joi";

const userNameJoiSchema = Joi.object({
    firstName: Joi.string()
      .required()
      .max(20)
      .pattern(/^[A-Z][a-z]*$/, 'capitalize')
      .message('{#label} should start with an uppercase letter and have only lowercase letters afterwards'),
    middleName: Joi.string(),
    lastName: Joi.string().required(),
  });
  
  // Define Joi schema for guardianSchema
  const guardianJoiSchema = Joi.object({
    fatherName: Joi.string().required(),
    fatherOccupation: Joi.string().required(),
    fatherContactNo: Joi.string().required(),
    motherName: Joi.string().required(),
    motherOccupation: Joi.string().required(),
    motherContactNo: Joi.string().required(),
  });
  
  // Define Joi schema for localGuardianSchema
  const localGuardianJoiSchema = Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().required(),
    contactNo: Joi.string().required(),
    address: Joi.string().required(),
  });
  
  // Define Joi schema for studentSchema
  const studentJoiSchema = Joi.object({
    id: Joi.string().required(),
    name: userNameJoiSchema.required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    dateOfBirth: Joi.string(),
    email: Joi.string().email().required(),
    contactNo: Joi.string().required(),
    emergencyContact: Joi.string().required(),
    bloodGroup: Joi.string().valid('A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'),
    presentAddress: Joi.string().required(),
    permanentAddress: Joi.string(),
    guardian: guardianJoiSchema.required(),
    localGuardian: localGuardianJoiSchema.required(),
    profileImg: Joi.string(),
    isActive: Joi.string().valid('active', 'block').default('active'),
  });
  
  export default  studentJoiSchema
