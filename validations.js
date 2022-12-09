const { body } = require('express-validator')

const registerValidation = [
    body('email', 'Invalid form email!').isEmail(),
    body('password', 'Invalid form password!').isLength({ min: 5 }),
    body('fullName', 'Invalid form name!').isLength({ min: 3 }),
    body('avatarUrl', 'Invalid link url!').optional().isString(),
]

const loginValidation = [
    body('email', 'Invalid form email!').isEmail(),
    body('password', 'Invalid form password!').isLength({ min: 5 })
]

const postCreateValidation = [
    body('title', 'Invalid form title!').isLength({ min: 3 }).isString(),
    body('text', 'Invalid form text!').isLength({ min: 5 }).isString(),
    body('tags', 'Invalid form tags!').optional().isString(),
    body('imageUrl', 'Invalid link url!').optional().isString(),
]

module.exports = { registerValidation, loginValidation, postCreateValidation }