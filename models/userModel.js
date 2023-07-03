const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcryptjs');
const validator = require('validator');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'Please tell us your first name!'],
    },
    lastname: {
      type: String,
      required: [true, 'Please tell us your last name!'],
    },
    email: {
      type: String,
      required: [true, 'Please tell us your email!'],
      unique: true,
      lowercase: true,
      validator: [validator.isEmail, 'Please tell us your email'],
      // indexedDB: true,
    },
    mobile: {
      type: String,
      required: true,
      // unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: true,
    },

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    cart: {
      type: Array,
      default: [],
    },
    address: [
      {
        type: String,
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  //only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    //nếu cái thời gian đổi mật khẩu là time sau khi th jwt phát hành, phải bảo là true, vì nó cần phải tạo lại jwt
    // nếu mà thời gian sau sang timestamp sẽ lớn hơn. nếu jwttimestamp lớn hơn có nghĩa nó được tạo sau khi đổi mật khẩu
    // console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

//Export the model
module.exports = mongoose.model('User', userSchema);
