const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const PORT = process.env.PORT || 8080;
const db = require('./models');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(logger('dev'));
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workoutdb', {
	useNewUrlParser  : true,
	useFindAndModify : false
});

// routes
app.get('/api/workouts', (req, res) => {
	db.Workout
		.find({})
		.then((Workout) => {
			res.json(Workout);
		})
		.catch((err) => {
			res.json(err);
		});
});

app.post('/api/workouts', ({ body }, res) => {
	db.Workout
		.create(body)
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			res.json(err);
		});
});

app.put('/api/workouts/:id', function(req, res) {
	let duration = req.body.duration;

	db.Workout
		.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body }, $inc: { totalDuration: duration } })
		.then((result) => res.json(result))
		.catch((err) => {
			res.json(err);
		});
});

app.get('/api/workouts/range', (req, res) => {
	db.Workout
		.find({})
		.sort({ _id: -1 })
		.limit(7)
		.then((Workout) => {
			res.json(Workout);
		})
		.catch((err) => {
			res.json(err);
		});
});

// html routes
app.get('/exercise', function(req, res) {
	res.sendFile(path.join(__dirname, './public/exercise.html'));
});

app.get('/stats', function(req, res) {
	res.sendFile(path.join(__dirname, './public/stats.html'));
});

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}!`);
});
