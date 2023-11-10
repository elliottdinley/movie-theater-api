const express = require('express');
const router = express.Router();

const { Show, User } = require('../models/index');

router.get('/', async (request, response) => {
    try {
        const data = await User.findAll()
        response.json(data);
    } catch (error) {
        response.status(500).json({
            error: 'Internal Server Error',
            details: error
        });
    }
});

router.get('/:id', async (request, response) => {
    const userId = request.params.id;

    try {
        const data = await User.findByPk(userId);

        if (data) {
            response.json(data);
        } else {
            response.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        response.status(500).json({
            error: 'Internal Server Error',
            details: error
        });
    }
});

router.get('/:id/shows', async (request, response) => {
    const userId = request.params.id;

    try {
        const data = await User.findByPk(userId, {
            include: [{ model: Show, through: 'watched' }]
        });
        if (data) {
            response.json(data);
        } else {
            response.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        response.status(500).json({
            error: 'Internal Server Error',
            details: error
        });
    }

});

router.put('/:userId/add-show/:showId', async (request, response) => {
    const userId = request.params.userId;
    const showId = request.params.showId;

    try {
        const user = await User.findByPk(userId);
        const show = await Show.findByPk(showId);

        if (user && show) {
            const hasWatched = await user.hasShow(show);
            if (!hasWatched) {
                await user.addShow(show);
                response.json({ message: 'Success!' });
            } else {
                response.status(400).json({ error: 'User has already watched this show' });
            }
        } else {
            return response.status(404).json({ error: 'User or show not found' });
        }
    } catch (error) {
        response.status(500).json({
            error: 'Internal Server Error',
            details: error
        });
    }
});

module.exports = router;