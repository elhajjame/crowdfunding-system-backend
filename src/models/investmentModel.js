import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema({
  investor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});
const Investment = mongoose.model('Investment', investmentSchema);
export default Investment;