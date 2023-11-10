const express = require('express');
const router = express.Router();

const { Show, User } = require('../models/index');

router.get('/', async (request, response) => {
    try {
        const data = await Show.findAll();
        response.json(data);
    } catch (error) {
        response.status(500).json({
            error: 'Internal Server Error',
            details: error
        });
    }
});

router.get('/:id', async (request, response) => {
    const showId = request.params.id;

    try {
        const data = await Show.findByPk(showId);

        if (data) {
            response.json(data);
        } else {
            response.status(404).json({ error: 'Show not found' });
        }
    } catch (error) {
        response.status(500).json({
            error: 'Internal Server Error',
            details: error
        });
    }
});

router.get('/genre/:genre', async (request, response) => {
    const genre = request.params.genre;

    try {
        const data = await Show.findAll({
            where: { genre: genre }
        })
        response.json(data);
    } catch (error) {
        response.status(500).json({
            error: 'Internal Server Error',
            details: error
        });
    }
});

router.put('/:id/update-rating', async (request, response) => {
    const showId = request.params.id;
    const newRating = request.body.rating;

    try {
        if (isNan(newRating) || newRating < 0 || newRating > 5) {
            response.status(400).json({ error: 'Invalid rating value' });
        } else {
            const show = await Show.findByPk(showId);
            if (show) {
                await Show.update(
                    { rating: newRating },
                    { where: { id: showId } }
                )
                response.json({ message: 'Success!' });
            } else {
                response.status(404).json({ error: 'Show not found' });
            }
        }
    } catch (error) {
        response.status(500).json({
            error: 'Internal Server Error',
            details: error
        });
    }
});

router.put('/:id/update-status', async (request, response) => {
    const showId = request.params.id;
    const newStatus = request.body.available;

    try {
        if (typeof newStatus === 'boolean') {
            const show = await Show.findByPk(showId);
            if (show) {
                await Show.update(
                    { available: newStatus },
                    { where: { id: showId } }
                )
                response.json({ message: 'Success!' });
            } else {
                response.status(404).json({ error: 'Show not found' });
            }
        } else {
            response.status(400).json({ error: 'Invalid available status value' });
        }

    } catch (error) {
        response.status(500).json({
            error: 'Internal Server Error',
            details: error
        });
    }
});

router.delete('/:id', async (request, response) => {
    const showId = request.params.id;

    try {
        const numDeleted = await Show.destroy({
            where: { id: showId }
        });

        if (numDeleted) {
            response.json({ message: 'Success!' });
        } else {
            response.status(404).json({ error: 'Show not found' });
        }
    } catch (error) {
        response.status(500).json({
            error: 'Internal Server Error',
            details: error
        });
    }
});

module.exports = router;