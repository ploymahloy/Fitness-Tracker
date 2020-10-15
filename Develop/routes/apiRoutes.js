const router = require("express").Router();
const workOut = require("../models/workOut.js");

router.get("/api/workouts", (req, res) => {
    workOut.findOne().sort({day: -1}).then(dbWorkOut => {
        res.json([dbWorkOut]);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", function(req, res) {
    const workOut = req.params.id;
    const newExercise = req.body;
    workOut.findByIdAndUpdate( workOut, {$push: {exercises: newExercise}}).then(dbWorkOut => {
        res.json(dbWorkOut);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.post("/api/workouts", function (req, res) {
    const newWorkout = req.body;
    workOut.create(newWorkout).then(dbWorkOut => {
        res.json(dbWorkOut);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.get("/api/workouts/range", function(req, res) {
    workOut.find({}).then(dbWorkOut => {
        res.json(dbWorkOut);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

module.exports = router;