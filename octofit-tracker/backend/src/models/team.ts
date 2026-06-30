import { Schema, model } from 'mongoose'

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    motto: { type: String, required: true, trim: true },
    points: { type: Number, required: true, min: 0 },
    memberCount: { type: Number, required: true, min: 0 },
  },
  {
    timestamps: true,
  },
)

const Team = model('Team', teamSchema)

export default Team