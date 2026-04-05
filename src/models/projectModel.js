import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'please enter project title']
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: [true, 'please enter a description']
  },
  capital: {
    type: Number,
    required: true
  },

  currentAmount: {
    type: Number,
    default: 0
  },

  maxInvestmentPercentage: {
    type: Number,
    required: true
  },

  initialInvestment: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open'
  },

  autoClose: {
    type: Boolean,
    default: true
  },
  createdAt: Date,
});

const Project = mongoose.model('Project', projectSchema);

export default Project;