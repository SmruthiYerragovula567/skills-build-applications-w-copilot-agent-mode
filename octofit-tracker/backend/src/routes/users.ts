import { Router } from 'express'

import User from '../models/user.js'

const router = Router()

router.get('/', async (_request, response) => {
  const items = await User.find().populate('team').sort({ name: 1 })

  response.json({
    resource: 'users',
    items,
    count: items.length,
  })
})

export default router