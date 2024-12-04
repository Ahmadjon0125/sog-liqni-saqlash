const pool = require('../config/db')
const {v4: uuidv4 } = require('uuid')

// POST appoinments 
const postAppointments = async (req, res) => {
    const {  patient_id, doctor_name, appointment_date, status} = req.body
    const id  = uuidv4()
    try {
        const result = await pool.query('INSERT INTO appointments (id, patient_id, doctor_name, appointment_date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *', [id, patient_id, doctor_name, appointment_date, status])
        res.status(201).json(result.rows[0])
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

// Get appointments Uchrashuvlarni olish
const getAppointments = async (req, res) => {
    const {start_date, end_date } = req.query
    try {
      const result = await pool.query('SELECT * FROM appointments WHERE appointment_date BETWEEN $1 AND $2', [start_date, end_date])
        res.status(200).json(result.rows)
    } catch (err) {
      res.status(500).json({error: err.message})
    }
}

 // PUT appointments Uchrashuv holatini yangilash
 const putAppointments = async (req, res) => {
    const { id } = req.params
    const { status} = req.body
    try {
        const result = await pool.query('UPDATE appointments SET status=$1, updated_at = CURRENT_TIMESTAMP WHERE id=$2 RETURNING *', [status, id])
        res.status(200).json(result.rows[0])
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

 module.exports = {
    postAppointments,
    getAppointments,
    putAppointments
 }