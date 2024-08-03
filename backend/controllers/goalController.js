const asyncHandler = require('express-async-handler')

//@desc get Goals
//@route GET /api/goals
//access Private
const getGoals = asyncHandler(async (req,res) => {
    res.status(200).json({ message: 'get Goals' })
})

//@desc set goal
//@route POST /api/goals
//access Private
const setGoals = asyncHandler(async (req,res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    res.status(200).json({ message: 'Set Goals' })
})

//@desc Update Goals
//@route PUT /api/goal:id
//access Private
const updateGoals = asyncHandler(async (req,res) => {
    res.status(200).json({ message: `Update Goals for ${req.params.id}` })
})

//@desc Delete Goals
//@route GET /api/goal:id
//access Private
const deleteGoals = asyncHandler(async (req,res) => {
    res.status(200).json({ message: `Delete Goals for ${req.params.id}` })
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals,
}