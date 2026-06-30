import { Router } from 'express'

import Team from '../models/team.js'

const router = Router()

router.get('/', async (_request, response) => {
  const items = await Team.find().sort({ points: -1, name: 1 })

  response.json({
    resource: 'teams',
    items,
    count: items.length,
  })
})

export default router