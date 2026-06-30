import { Router } from 'express';
import Activity from '../models/activity.js';
const router = Router();
router.get('/', async (_request, response) => {
    const items = await Activity.find()
        .populate('user')
        .sort({ completedAt: -1 });
    response.json({
        resource: 'activities',
        items,
        count: items.length,
    });
});
export default router;
