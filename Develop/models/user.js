const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
	day       : {
		type    : Date,
		default : () => new Date()
	},
	exercises : [
		{
			type     : {
				type : String,
				trim : true
			},
			name     : {
				type     : String,
				trim     : true,
				required : true
			},
			duration : {
				type     : Number,
				required : 'Number is required'
			},
			weight   : {
				type     : Number,
				required : 'Number is Required'
			},
			reps     : {
				type     : Number,
				required : 'Number is Required'
			},
			sets     : {
				type     : Number,
				required : false
			},
			distance : {
				//only if cardio//
				type     : Number,
				required : false
			}
		}
	]
});

const Workout = mongoose.model('User', WorkoutSchema);

module.exports = Workout;
