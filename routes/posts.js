const router = require('express').Router();
const Post = require('../models/post');

router.route('/')
  .get((req, res, next) => {
    Post.find()
      .then((list) => {
        res.json(list)
      })
      .catch(next)
      .error(console.error)
  })

router.route('/new')
  .post((req, res, next) => {
    console.log(req.body);
    const content = req.body.content;
    const post = new Post( {content: content} );
    post.save()
      .then((post) => {
        console.log(post);
        res.json(post)
      })
      .catch(next)
      .error(console.error)
  })

router.route('/:id')
  .get((req, res, next) => {
    const id = req.params.id;
    Post.findById(id)
      .then((post) => {
        res.json(post)
      })
      .catch(next)
      .error(console.error)
  })
  .post((req, res, next) => {
    const id = req.params.id;
    const edit = { content: req.body.id };
    const options = {upsert: true, new: true};
    Post.findByIdAndUpdate(id, edit, options)
      .then((post) => {
        res.json(post)
      })
      .catch(next)
      .error(console.error)
  })
  .delete((req, res, next) => {
    Post.findByIdAndRemove(req.params.id)
      .then((post) => {
        const response = {
          message: "Post removed",
          id: post._id
        }
        res.json(response)
      })
      .catch(next)
      .error(console.error)
  })


router.route('/:id/comments')
  .get((req, res, next) => {
    const id = req.params.id;
    Post.findById(id)
      .then((post) => {
        res.json(post.comments)
      })
      .catch(next)
      .error(console.error)
  })
  .post((req, res, next) => {
    const id = req.params.id;
    const comment = {$push: { comments: { comment: req.body.comment } }};
    const options = {upsert: true, new: true};
    Post.findByIdAndUpdate(id, comment, options)
      .then((comment) => {
        res.json(comment)
      })
      .catch(comment)
      .error(console.error)
  })

router.route('/:id/upvote')
  .post((req, res, next) => {
    const id = req.params.id;
    Post.findByIdAndUpdate(id, {$inc: {votes: 1}})
      .then((post) => {
        res.json(post.votes)
      })
      .catch(next)
      .error(console.error)
  })

router.route('/:id/downvote')
  .post((req, res, next) => {
    const id = req.params.id;
    Post.findByIdAndUpdate(id, {$inc: {votes: -1}})
      .then((post) => {
        res.json(post.votes)
      })
      .catch(next)
      .error(console.error)
  })

module.exports = router;
