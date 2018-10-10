const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
	Item.find().select('_id name date').sort({ date: -1 }).then((items) => res.json(items));
});

// @route   GET api/items
// @desc    Get A Single Item
// @access  Public
router.get('/:id', (req, res) => {
	Item.findById(req.params.id).select('_id name date').then((item) => res.json(item));
});

// @route   POST api/items
// @desc    Create A Item
// @access  Public
router.post('/', (req, res) => {
	const newItem = new Item({
		name: req.body.name
	});

	newItem.save().then((item) => res.json(item));
});

// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Public
router.delete('/:id', (req, res) => {
	Item.findById(req.params.id)
		.then((item) => item.remove().then(() => res.json({ success: true })))
		.catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
