import { Schema, model } from 'mongoose'

const leaderboardSchema = new Schema(
  {
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    rank: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 0 },
    weeklyMinutes: { type: Number, required: true, min: 0 },
    streakDays: { type: Number, required: true, min: 0 },
  },
  {
    timestamps: true,
  },
)

const LeaderboardEntry = model('LeaderboardEntry', leaderboardSchema)

export default LeaderboardEntry