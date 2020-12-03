const Pool = require('pg').Pool;
const dbConnection = require('../config/conn.json');
const pool = new Pool(dbConnection)

module.exports = () =>{
    const controller = {};

    controller.getDepartments = (req,res) =>{
        try {
            pool.query('SELECT a.name, a.department_id, a.fk_costCenter , b.name as costCenter FROM department as a, costCenter as b WHERE a.fk_costCenter = b.costCenter_id ORDER BY department_id ASC', (error, results) =>{
                if (error) {
                    throw error;
                };
                res.status(200).json(results.rows);
            })
            
        } catch (error) {
            res.status(404).json({
                message: 'Falha ao buscar usuários.'
            });
        }
    }

    controller.create = (req, res) =>{
        const { department_id, name, fk_costCenter } = req.body;
        pool.query('INSERT INTO department(department_id, name, fk_costcenter) VALUES ($1, $2, $3)', [department_id, name, fk_costCenter], (error, results) => {
            if (error) {
                res.status(404).json({
                    message: 'Falha ao adicionar departamento.',
                    error
                });
            }else{
                res.status(200).json({sucess: true})
            }
        })
    }

    controller.update = (req, res) =>{
        const id = parseInt(req.params.departmentId);
        const { name, fk_costCenter } = req.body;

        pool.query(
            'UPDATE department SET name = $1, fk_costcenter = $2 WHERE department_id = $3',
            [name, fk_costCenter, id],
            (error, results) => {
            if (error) {
                res.status(404).json({
                    message: 'Falha ao atualizar departamento.',
                    error
                });
            }else{
                res.status(200).json({sucess: true});
            }
        })
    }

    controller.delete = (req, res) =>{
        const id = parseInt(req.params.departmentId);

        pool.query('DELETE FROM department WHERE department_id = $1', [id], (error, results) => {
            if (error) {
                res.status(404).json({
                    message: 'Falha ao deletar departamento.',
                    error
                });
            }else{
                res.status(200).json({sucess: true})
            }
        })
    }

    return controller;
}