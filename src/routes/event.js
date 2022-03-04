/**
 * returns data for '/api/event' routes
 */
const express = require('express');
const router = express.Router();
const db = require('../services/database.service');

/**
 * GET /api/event/:id
 * Returns the event referenced by the value substituted for :id
 * For example: /events/event/1 returns the event with the id of 1
 */
router.get('/:id', async (req, res) => {
    res.json(await db.getEventById(req.params.id));
});

/**
 * POST /api/event
 * Creates a new event from the data in the request body (req.body)
 * Returns the list of all events including the new event
 */
router.post('/', async (req, res) => {
    // add to the database
    const events = await db.addEvent(req.body);
    // return all events
    res.status(201).json(events);
});

/**
 * PUT /api/event/:id
 * Updates the event referenced by the value substituted for :id
 * For example: /events/event/1 will update the event with the id = 1
 * using the values in the request body (req.body)
 * Returns the list of all events including the updated event
 */
router.put('/:id', async (req, res) => {
    const events = await db.updateEvent(req.params.id, req.body);
    res.json(events);
});

/**
 * DELETE /api/event/:id
 * Deletes the event referenced by the value substituted for :id
 * For example: /events/event/1 will delete the event with the id = 1
 * Returns the list of all events excluding the deleted event
 */
router.delete('/:id', async (req, res) => {
    const events = await db.deleteEvent(req.params.id);
    res.json(events);
});

/**
 * PUT /api/event/like/:id
 * Increases likes for the event referenced by the value substituted for :id
 * For example: /api/event/like/1 will increase one like for the event with the id = 1
 * 
 * Returns the likes count of the event
 */
router.put('/like/:id', async (req, res) => {
    const likes = await db.changeReaction(req.params.id, 'likes');
    res.json(likes);
});

/**
 * PUT /api/event/dislike/:id
 * Increases dislikes for the event referenced by the value substituted for :id
 * For example: /api/event/dislike/1 will decreament one like for the event with the id = 1
 * 
 * Returns the likes count of the event
 */
router.put('/dislike/:id', async (req, res) => {
    const likes = await db.changeReaction(req.params.id, 'dislike');
    res.json(likes);
});

/**
 * PUT /api/event/:id/reactionType
 * Increases likes for the event referenced by the value substituted for :id
 * For example: /api/event/1/likes will increase one like for the event with the id = 1
 * 
 * Returns the likes count of the event
 */
router.put('/:id/:reactionType', async (req, res) => {
    const likes = await db.changeReaction(req.params.id, req.params.reactionType);
    res.json(likes);
});

module.exports = router;
