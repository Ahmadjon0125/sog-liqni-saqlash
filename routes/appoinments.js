const {Router} = require('express');
const router = Router();
const { postAppointments, getAppointments, putAppointments} = require('../controllers/appoinments')

router.post('/appointments', postAppointments)
router.get('/appointments', getAppointments)
router.put('/appointments/:id', putAppointments)

module.exports = router;