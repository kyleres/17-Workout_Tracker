const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String,
                required: [true, "Please enter exercise type."],
                trim: true
            },
            name: {
                type: String,
                required: [true, "Please enter exercise name."],
                trim: true
            },
            duration: {
                type: Number,
                required: [true, "Please enter exercise duration in minutes."],
            },
            weight: {
                type: Number,
                default: 0
            },
            sets: {
                type: Number,
                default: 0
            },
            reps: {
                type: Number,
                default: 0
            },
            distance: {
                type: Number,
                default: 0
            }
        }
    ],
    totalDuration: {
        type: Number,
        default: 0
    }
});

//displays total duration in workout summary
workoutSchema.method("addDurations", function() {
    let total = 0;
    this.exercises.forEach(exercise => {
        total += exercise.duration;
    });
    this.totalDuration = total;
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;