const express = require('express');
const router = express.Router();

const { Show, User } = require('../models/index');

router.get('/', async (request, response) => {
    const data = await Show.findAll();
    response.json(data);
});

router.get('/:id', async (request, response) => {
    const showId = request.params.id;
    const data = await Show.findByPk(showId);
    response.json(data);
});

router.get('/genre/:genre', async (request, response) => {
    const genre = request.params.genre;
    const data = await Show.findAll({
        where: { genre: genre }
    })
    response.json(data);
});

router.put('/:id/update-rating', async (request, response) => {
    const showId = request.params.id;
    const newRating = request.body.rating;
    const show = await Show.findByPk(showId);
    await Show.update(
        { rating: newRating },
        { where: { id: showId } }
    )
    response.json({ message: 'Success!' });
});

router.put('/:id/update-status', async (request, response) => {
    const showId = request.params.id;
    const newStatus = request.body.available;
    const show = await Show.findByPk(showId);
    await Show.update(
        { available: newStatus },
        { where: { id: showId } }
    )
    response.json({ message: 'Success!' });
});

router.delete('/:id', async (request, response) => {
    const showId = request.params.id;
    await Show.destroy({
        where: { id: showId }
    });
    response.json({ message: 'Success!' });
});

module.exports = router;