import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    measurements: {
      chest: {
        type: Number,
        default: 0,
      },

      waist: {
        type: Number,
        default: 0,
      },

      arms: {
        type: Number,
        default: 0,
      },
    },

    performanceMetric: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Progress = mongoose.model("Progress", progressSchema);

export default Progress;