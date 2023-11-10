const express = require('express');
const router = express.Router();

const { Show, User } = require('../models/index');

router.get('/', async (request, response) => {
    const data = await User.findAll()
    response.json(data);
});

router.get('/:id', async (request, response) => {
    const userId = request.params.id;
    const data = await User.findByPk(userId);
    response.json(data);
});

router.get('/:id/shows', async (request, response) => {
    const userId = request.params.id;
    const data = await User.findByPk(userId, {
        include: [{ model: Show, through: 'watched' }]
    });
    response.json(data);
});

router.put('/:userId/add-show/:showId', async (request, response) => {
    const userId = request.params.userId;
    const showId = request.params.showId;

    const user = await User.findByPk(userId);
    const show = await Show.findByPk(showId);

    await user.addShow(show);
    response.json({ message: 'Success!' });
});

module.exports = router;