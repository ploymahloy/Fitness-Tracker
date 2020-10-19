const router = require("express").Router();
const Workout = require("../models/Workout.js");

router.get("/api/workouts", (req, res) => {
    Workout.findOne().sort({day: -1}).then(dbWorkOut => {
        res.json([dbWorkOut]);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", function({body, params}, res) {
    Workout.findByIdAndUpdate( params.id, {$push: {exercises: body}}).then(dbWorkOut => {
        res.json(dbWorkOut);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.post("/api/workouts", function (req, res) {
    const newWorkout = req.body;
    Workout.create(newWorkout).then(dbWorkOut => {
        res.json(dbWorkOut);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.get("/api/workouts/range", function(req, res) {
    Workout.find({}).then(dbWorkOut => {
        res.json(dbWorkOut);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

module.exports = router;