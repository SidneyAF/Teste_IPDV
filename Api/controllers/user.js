const Pool = require('pg').Pool;
const dbConnection = require('../config/conn.json');
const pool = new Pool(dbConnection)

module.exports = () =>{
    const controller = {};

    controller.getUsers = (req,res) =>{
        try {
            pool.query('SELECT a.user_id, a.name, a.office, a.phone, a.fk_department, b.name as department FROM users as a, department as b WHERE a.fk_department = b.department_id ORDER BY user_id ASC', (error, results) =>{
                if (error) {
                    throw error;
                }else{
                    res.status(200).json(results.rows);
                }
            })
            
        } catch (error) {
            res.status(404).json({
                message: 'Falha ao buscar usuários.'
            });
        }
    }

    controller.create = (req, res) =>{
        const { user_id, name, office, phone, fk_department } = req.body;
        pool.query('INSERT INTO users(user_id, name, office, phone, fk_department) VALUES ($1, $2, $3, $4, $5)', [user_id, name, office, phone, fk_department], (error, results) => {
            if (error) {
                res.status(404).json({
                    message: 'Falha ao adicionar usuário.',
                    error
                });
            }else{
                res.status(200).json({sucess: true})
            }
        })
    }

    controller.update = (req, res) =>{
        const id = parseInt(req.params.userId)
        
        const {name, office, phone, fk_department } = req.body;
        pool.query(
            'UPDATE users SET name = $1, office = $2, phone = $3, fk_department = $4 WHERE user_id = $5',
            [name, office, phone, fk_department, id],
            (error, results) => {
            if (error) {
                res.status(404).json({
                    message: 'Falha ao atualizar usuário.',
                    error
                });
            }else{
                res.status(200).json({sucess: true})
            }
        })
    }

    controller.delete = (req, res) =>{
        const id = parseInt(req.params.userId)

        pool.query('DELETE FROM users WHERE user_id = $1', [id], (error, results) => {
            if (error) {
                res.status(404).json({
                    message: 'Falha ao deletar usuário.',
                    error
                });
            }else{
                res.status(200).json({sucess: true})
            }
        })
    }

    return controller;
}