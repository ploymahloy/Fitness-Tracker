const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workOutSchema = new Schema ({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String
            },
            name: {
                type: String,
                trim: true,
                required: "Name your exercise.",
            },
            duration: {
                type: Number,
                required: false
            },
            weight: {
                type: Number,
                required: function() {return this.type === "resistance"}
            },
            reps: {
                type: Number,
                required: function() {return this.type === "resistance"}
            },
            sets: {
                type: Number,
                required: function() {return this.type === "resistance"}
            },
            distance: {
                type: Number,
                required: function() {return this.type === "cardio"}
            }
        }
    ]
}, { toJSON: { virtuals: true }});

workOutSchema.virtual("totalDuration").get(function() {
    const allDurations = this.exercises.reduce((acc, cv) => {return acc + cv.duration}, 0);
    return allDurations;
})

const workOut = mongoose.model("Workout", workOutSchema);
module.exports = workOut;