const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  phone: {
    type: String,
    required: [true, "phone number is required"],
  },
  userId: {
    type: String,
  },
  privacyConsent: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: function (email) {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      },
      message: (props) => `Email (${props.value}) is invalid!`,
    },
  },
  password: {    // unselect
    type: String,
  },
  birthDate: {    // unselect
    type: String,
  },
  address: {    // unselect
    type: String,
  },
  occupation: {    // unselect
    type: String,
  },
  emergencyContactName: {    // unselect
    type: String,
  },
  emergencyContactNumber: {    // unselect
    type: String,
  },
  insuranceProvider: {    // unselect
    type: String,
  },
  insurancePolicyNumber: {    // unselect
    type: String,
  },
  allergies: {    // unselect
    type: String,
  },
  currentMedication: {    // unselect
    type: String,
  },

  familyMedicalHistory: {    // unselect
    type: String,
  },
  primaryPhysician: {    // unselect
    type: String,
  },
  pastMedicalHistory: {    // unselect
    type: String,
  },
  identificationType: {    // unselect
    type: String,
  },
  identificationNumber: {    // unselect
    type: String,
  },
  identificationDocumentId: {    // unselect
    type: String,
  },
  identificationDocumentUrl: {    // unselect
    type: String,
  },

  passwordChangedAt: {
    // unselect
    type: Date,
  },
  passwordResetToken: {
    // unselect
    type: String,
  },
  passwordResetExpires: {
    // unselect
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    // unselect
    type: Date,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
  },
  otp_expiry_time: {
    type: Date,
  },
 
  phone: {
    type: String
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"]
  }
});

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("otp") || !this.otp) return next();

  // Hash the otp with cost of 12
  this.otp = await bcrypt.hash(this.otp.toString(), 12);

  console.log(this.otp.toString(), "FROM PRE SAVE HOOK");

  next();
});

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password") || !this.password) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  console.log(this.password, "FROM PRE SAVE PASWWORD HOOK");
  //! Shift it to next hook // this.passwordChangedAt = Date.now() - 1000;

  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew || !this.password)
    return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.correctOTP = async function (candidateOTP, userOTP) {
  return await bcrypt.compare(candidateOTP, userOTP);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changedTimeStamp;
  }

  // FALSE MEANS NOT CHANGED
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = new mongoose.model("Patients", userSchema);
module.exports = User;
