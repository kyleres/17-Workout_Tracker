const router = require("express").Router();
const workout = require("../models/workout");

//get workouts
router.get("/api/workouts", (req, res) => {
    workout.find({})
    .then(workout => {
        workout.forEach(workout => {
            workout.addDurations();
        });
        res.json(workout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

//add exercise to workout
router.put("/api/workouts/:id", ({body, params}, res) => {
    workout.findByIdAndUpdate(
        params.id, 
        {
            $push: {
                exercises: body
            }
        }, 
        {
            new: true
        })
    .then(workout => {
        res.json(workout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

//create a workout
router.post("/api/workouts", ({body}, res) => {
    workout.create(body)
    .then(workout => {
        res.json(workout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

//get workouts for last week
router.get("/api/workouts/range", (req, res) => {
    workout.find({day:{$gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000)}})
    .limit(7)
    .then(workout => {
        workout.forEach(workout => {
            workout.addDurations();
            workout.addWeights();
        });
        res.json(workout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

module.exports = router;