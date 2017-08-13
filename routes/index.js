const router = require('express').Router();

router.route('/')
	.get((req, res) => {
		res.json({ message: 'Default Route'});
	});

router.use('/posts', require('./posts'));

module.exports = router;
