const {Router} = require('express');
const router = Router();
const { postPatients, getPatients, putPatients, deletePatients} = require('../controllers/patients');

router.post('/patients', postPatients)
router.get('/patients', getPatients)
router.put('/patients/:id', putPatients)
router.delete('/patients/:id', deletePatients)

module.exports = router;