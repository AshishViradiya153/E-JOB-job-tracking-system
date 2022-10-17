const { createJob, deleteJob, getAlljobs, updateJob, showStats } = require('../controllers/jobController')
const express = require('express')
const router = express.Router()
const authenticatedUser = require('../middleware/auth')


router.route('/').post(authenticatedUser, createJob).get(authenticatedUser, getAlljobs)
router.route('/stats').get(authenticatedUser, showStats)
router.route('/:id').patch(authenticatedUser, updateJob).delete(authenticatedUser, deleteJob)


module.exports = router


