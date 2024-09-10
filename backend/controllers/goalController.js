const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')
const { text } = require('express')

//@desc get Goals
//@route GET /api/goals
//access Private
const getGoals = asyncHandler(async (req,res) => {
  const goals = await Goal.find({user: req.user.id })

    res.status(200).json(goals)
})

//@desc set goal
//@route POST /api/goals
//access Private
const setGoals = asyncHandler(async (req,res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    })

    res.status(200).json(goal)
})

//@desc Update Goals
//@route PUT /api/goal:id
//access Private
const updateGoal = asyncHandler(async (req,res) => {
    
    
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    //Cheack for user
    if(!req.user){
        res.status(401)
        throw new Error('User Not Found')
    }

    //Make Sure the loggedin user matches the goal user
    if(goal.user.toString() !== req.user.id)
    {
        res.status(401)
        throw new Error('user not Authorized')
    }

    const updateGoal=await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updateGoal)
})

//@desc Delete Goals
//@route GET /api/goal:id
//access Private
const deleteGoals = asyncHandler(async (req,res) => {

    const goal = await Goal.findById(req.params.id)
    
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    //Cheack for user
    if(!req.user){
        res.status(401)
        throw new Error('User Not Found')
    }

    //Make Sure the loggedin user matches the goal user
    if(goal.user.toString() !== req.user.id)
    {
        res.status(401)
        throw new Error('user not Authorized')
    }


    
    await goal.deleteOne()
    res.status(200).json({ id: req.params.id})
})

module.exports = {
    getGoals,
    setGoals,
    updateGoal,
    deleteGoals,
}