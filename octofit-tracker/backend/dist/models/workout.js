import { Schema, model } from 'mongoose';
const workoutSchema = new Schema({
    title: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    difficulty: {
        type: String,
        required: true,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    equipment: [{ type: String, required: true, trim: true }],
    coachTip: { type: String, required: true, trim: true },
}, {
    timestamps: true,
});
const Workout = model('Workout', workoutSchema);
export default Workout;
