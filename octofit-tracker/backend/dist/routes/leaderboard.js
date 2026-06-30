import { Router } from 'express';
import LeaderboardEntry from '../models/leaderboard.js';
const router = Router();
router.get('/', async (_request, response) => {
    const items = await LeaderboardEntry.find()
        .populate('team')
        .sort({ rank: 1 });
    response.json({
        resource: 'leaderboard',
        items,
        count: items.length,
    });
});
export default router;
