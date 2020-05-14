const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route  Post api/posts
//@desc   create a post
//@access  private
router.post('/', [ auth, [ check('text', 'Text is required').not().isEmpty() ] ], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ erros: errors.array() });
	}

	try {
		const user = await User.findById(req.user.id).select('-password');

		const newPost = new Post({
			text: req.body.text,
			name: user.name,
			avatar: user.avatar,
			user: req.user.id
		});
		const post = await newPost.save();
		res.json(post);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
