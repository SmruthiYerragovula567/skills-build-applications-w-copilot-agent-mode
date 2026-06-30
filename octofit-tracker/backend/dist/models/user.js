import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    goal: { type: String, required: true, trim: true },
    fitnessLevel: {
        type: String,
        required: true,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
    },
    weeklyTarget: { type: Number, required: true, min: 1 },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
}, {
    timestamps: true,
});
const User = model('User', userSchema);
export default User;
