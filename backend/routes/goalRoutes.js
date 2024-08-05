const express = require('express')
const router = express.Router()
const {getGoals,
    setGoals,
    updateGoal,
    deleteGoals,
} = require('../controllers/goalController')

router.route('/').get(getGoals).post(setGoals)
router.route('/:id').delete(deleteGoals).put(updateGoal)
router.get('/', getGoals)


module.exports=router