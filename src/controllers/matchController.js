const { Match } = require('../models');

exports.getAllMatches = async (req, res) => {
    try {
        const matches = await Match.findAll({
            include: [
                { model: Match.User1, as: 'User1' },
                { model: Match.User2, as: 'User2' },
                { model: Match.Pet1, as: 'Pet1' },
                { model: Match.Pet2, as: 'Pet2' },
            ],
        });
        res.status(200).json(matches);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving matches.' });
        console.error(error);
    }
};

exports.createMatch = async (req, res) => {
    try {
        const { user1Id, user2Id, pet1Id, pet2Id, matchesStatus } = req.body;

        const newMatch = await Match.create({
            user1Id,
            user2Id,
            pet1Id,
            pet2Id,
            matchesStatus,
        });

        res.status(201).json(newMatch);
    } catch (error) {
        res.status(400).json({ error: 'An error occurred while creating the match.' });
        console.error(error);
    }
};

exports.getMatchById = async (req, res) => {
    try {
        const match = await Match.findByPk(req.params.id, {
            include: [
                { model: Match.User1, as: 'User1' },
                { model: Match.User2, as: 'User2' },
                { model: Match.Pet1, as: 'Pet1' },
                { model: Match.Pet2, as: 'Pet2' },
            ],
        });

        if (!match) {
            return res.status(404).json({ error: 'Match not found.' });
        }

        res.status(200).json(match);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the match.' });
        console.error(error);
    }
};

exports.updateMatch = async (req, res) => {
    try {
        const match = await Match.findByPk(req.params.id);

        if (!match) {
            return res.status(404).json({ error: 'Match not found.' });
        }

        const updatedMatch = await match.update(req.body);
        res.status(200).json(updatedMatch);
    } catch (error) {
        res.status(400).json({ error: 'An error occurred while updating the match.' });
        console.error(error);
    }
};

exports.deleteMatch = async (req, res) => {
    try {
        const match = await Match.findByPk(req.params.id);

        if (!match) {
            return res.status(404).json({ error: 'Match not found.' });
        }

        await match.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the match.' });
        console.error(error);
    }
};
