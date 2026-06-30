import { Router } from 'express'

import Workout from '../models/workout.js'

const router = Router()

router.get('/', async (_request, response) => {
  const items = await Workout.find().sort({ difficulty: 1, durationMinutes: 1 })

  response.json({
    resource: 'workouts',
    items,
    count: items.length,
  })
})

export default router