const pool = require('../config/db')
const {v4: uuidv4 } = require('uuid')

// POST patients Yangi bemor qo'shish
const postPatients = async (req, res) => {
    const {name, age, medical_history, contact_info} = req.body
    const id  = uuidv4()
    try {
        const result = await pool.query('INSERT INTO patients (id, name, age, medical_history, contact_info) VALUES ($1, $2, $3, $4, $5) RETURNING *', [id, name, age, medical_history, contact_info])
        res.status(201).json(result.rows[0])
    } catch (err) {
        res.status(500).json({error: err.message})
    }}


// Get patients Bemorlar ro'yxatini olish
const getPatients = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM patients')
        res.json(result.rows)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

// PUT patients Bemor ma'lumotlarini yangilash
const putPatients = async (req, res) => {
    const { id } = req.params
    const {name, age, medical_history, contact_info} = req.body
    try {
        const result = await pool.query('UPDATE patients SET name=$1, age=$2, medical_history=$3, contact_info=$4, updated_at = CURRENT_TIMESTAMP WHERE id=$5 RETURNING *', [name, age, medical_history, contact_info, id])
        res.status(200).json(result.rows[0])
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

// DELETE patients Bemorni o'chirish
const deletePatients = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM patients WHERE id=$1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Bemor topilmadi' });
        }
        res.status(200).json({ message: 'Bemor muvaffaqiyatli o‘chirildi' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = {
    postPatients,
    getPatients,
    putPatients,
    deletePatients,
}