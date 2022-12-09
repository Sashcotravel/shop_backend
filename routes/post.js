const router = require('express').Router()
const PostModel = require('../model/Post')
const CommentModel = require('../model/Comment')
const UserModel = require('../model/User')
const { postCreateValidation } = require('../validations')
const { handleValidationErrors } = require('../utils/handleValidationErrors')
const { checkAuth } = require('../utils/checkAuth')



// post router

router.post('/', checkAuth, postCreateValidation, handleValidationErrors, async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(','),
            user: req.userId
        })

        const post = await doc.save()
        res.json(post)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to create article',
            err
        })
    }
})

router.patch('/:id', checkAuth, postCreateValidation, handleValidationErrors, async (req, res) => {

    try {
        const postId = req.params.id

        await PostModel.updateOne(
            {
                _id: postId
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags,
                user: req.body.user,
            })

        res.json({
            success: true
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to update article'
        })
    }
})

router.get('/', async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec()

        res.json(posts)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Not found'
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.findOneAndUpdate(
            {
                _id: postId
            },
            {
                $inc: { viewsCount: 1 }
            },
            {
                returnDocument: 'after'
            }, (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Not found'
                    })
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Not found'
                    })
                }

                res.json(doc)
            }).populate('user')
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Not found'
        })
    }
})

router.delete('/:id', checkAuth, async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.findOneAndDelete({
            _id: postId
        },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'The post was not deleted'
                    })
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Not found'
                    })
                }

                res.json({
                    success: true
                })
            })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Not found'
        })
    }
})

// comment router

router.post('/comment/:id', checkAuth, handleValidationErrors, async (req, res) => {
    const postId = req.params.id

    try {
        const doc = new CommentModel({
            text: req.body.text,
            postId: postId,
            user: req.userId
        })

        const comment = await doc.save()
        res.json(comment)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to create comment',
            err
        })
    }
})

router.delete('/comment/:id', checkAuth, async (req, res) => {
    try {
        const commentId = req.params.id

        CommentModel.findOneAndDelete({
            _id: commentId
        },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'The comment was not deleted'
                    })
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Not found'
                    })
                }

                res.json({
                    success: true
                })
            })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'The comment was not deleted'
        })
    }
})

router.patch('/comment/:id', checkAuth, handleValidationErrors, async (req, res) => {

    try {
        const commentId = req.params.id

        await CommentModel.updateOne(
            {
                _id: commentId
            },
            {
                text: req.body.text,
                user: req.userId
            })

        res.json({
            success: true
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to update comment'
        })
    }
})

router.get('/comments/all', async (req, res) => {

    try {
        const comments = await CommentModel.find().populate('user').exec()

        res.json(comments)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Not found'
        })
    }
})


// like router

router.post('/like/:id', async (req, res) => {

    try {
        const postId = req.params.id
        const action = req.body.act
        const likeCounts = req.body.like


        PostModel.findOneAndUpdate(
            { _id: postId },
            {
                likeCount: action === false ? (likeCounts === 0 ? 0 : likeCounts - 1) : likeCounts + 1
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Not found'
                    })
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Not found'
                    })
                }

                res.json({
                    success: true
                })
            }
        )

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to like article'
        })
    }
});


// tags router

router.get('/posts/tags', async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec()

        const tags = posts.map((obj) => obj.tags).flat().slice(0, 5)

        res.json(tags)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Not found'
        })
    }
})

router.get('/posts/tags/:one', async (req, res) => {

    const tagsOne = req.params.one

    try {
        const ass = await PostModel.find({ tags: tagsOne })

        res.json({ ass, tagsOne })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Not found'
        })
    }
})

router.get('/all/populate', async (req, res) => {
    try {
        const posts = await PostModel.find().sort('-viewsCount').populate('user').exec()

        res.json(posts)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Not found'
        })
    }
})


module.exports = router