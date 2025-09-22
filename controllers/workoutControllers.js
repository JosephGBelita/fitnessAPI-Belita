const Workout = require("../models/workoutModels");
const { errorHandler } = require("../auth");

module.exports.addWorkout = (req, res) => {
    let newWorkout = new Workout({
        userId: req.user.id,
        name: req.body.name,
        duration: req.body.duration
    });

    return newWorkout.save()
    .then((workout) => res.status(201).send(workout)) // Changed to match expected output
    .catch(error => errorHandler(error, req, res));
};

module.exports.getMyWorkouts = (req, res) => {
    return Workout.find({userId: req.user.id})
    .then(workouts => {
        // Always return an array, even if empty
        return res.status(200).send({workouts});
    })
    .catch(error => errorHandler(error, req, res));
};


module.exports.updateWorkout = (req, res) => {
    let updatedWorkout = {
        name: req.body.name,
        duration: req.body.duration
    };

    Workout.findOne({_id: req.params.id, userId: req.user.id})
    .then(workout => {
        if (!workout) {
            return res.status(404).send({ message: 'Workout not found or unauthorized' });
        }
        
        return Workout.findByIdAndUpdate(req.params.id, updatedWorkout, { new: true })
        .then(result => {
            res.status(200).send({ 
                message: 'Workout updated successfully',
                updatedWorkout: result // Changed to match expected output
            });
        });
    })
    .catch(error => errorHandler(error, req, res));
};

module.exports.deleteWorkout = (req, res) => {
    Workout.findOne({_id: req.params.id, userId: req.user.id})
    .then(workout => {
        if (!workout) {
            return res.status(404).send({ message: 'Workout not found or unauthorized' });
        }
        
        return Workout.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(200).send({ 
                message: 'Workout deleted successfully!'
            });
        });
    })
    .catch(error => errorHandler(error, req, res));
};

module.exports.completeWorkoutStatus = (req, res) => {
    Workout.findOne({_id: req.params.id, userId: req.user.id})
    .then(workout => {
        if (!workout) {
            return res.status(404).send({ message: 'Workout not found or unauthorized' });
        }
        
        let updateStatus = {
            status: 'complete'
        };
        
        return Workout.findByIdAndUpdate(req.params.id, updateStatus, { new: true })
        .then(result => {
            res.status(200).send({ 
                message: 'Workout status updated successfully',
                updatedWorkout: result // Changed to match expected output
            });
        });
    })
    .catch(error => errorHandler(error, req, res));
};