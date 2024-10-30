const { Rating } = require('../models');

exports.getAllRatings = async (req, res) => {
    try {
        const ratings = await Rating.findAll();
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving ratings.' });
        console.error(error);
    }
};

exports.createRating = async (req, res) => {
    try {
        const { senderId, receiverId, petId, senderFeedback, receiverFeedback } = req.body;

        const newRating = await Rating.create({
            senderId,
            receiverId,
            petId,
            senderFeedback,
            receiverFeedback,
        });

        res.status(201).json(newRating);
    } catch (error) {
        res.status(400).json({ error: 'An error occurred while creating the rating.' });
    }
};

exports.getRatingById = async (req, res) => {
    try {
        const rating = await Rating.findByPk(req.params.id);
        if (!rating) {
            return res.status(404).json({ error: 'Rating not found.' });
        }

        res.status(200).json(rating);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the rating.' });
    }
};

exports.updateRating = async (req, res) => {
    try {
        const rating = await Rating.findByPk(req.params.id);

        if (!rating) {
            return res.status(404).json({ error: 'Rating not found.' });
        }

        const updatedRating = await rating.update(req.body);
        res.status(200).json(updatedRating);
    } catch (error) {
        res.status(400).json({ error: 'An error occurred while updating the rating.' });
    }
};

exports.deleteRating = async (req, res) => {
    try {
        const rating = await Rating.findByPk(req.params.id);

        if (!rating) {
            return res.status(404).json({ error: 'Rating not found.' });
        }

        await rating.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the rating.' });
    }
};
