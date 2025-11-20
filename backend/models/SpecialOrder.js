const mongoose = require('mongoose');

const productEntrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    min: 1,
    default: 1
  },
  targetPrice: Number,
  referenceUrl: String
}, { _id: false });

const specialOrderSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  products: {
    type: [productEntrySchema],
    validate: [array => array.length > 0, 'At least one product is required']
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SpecialOrder', specialOrderSchema);



