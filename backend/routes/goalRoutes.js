const express = require('express')
const router = express.Router()
const {getGoals,
    setGoals,
    updateGoal,
    deleteGoals,
} = require('../controllers/goalController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getGoals).post(protect, setGoals)
router.route('/:id').delete(protect, deleteGoals).put(protect, updateGoal)
router.get('/', getGoals)


module.exports=router