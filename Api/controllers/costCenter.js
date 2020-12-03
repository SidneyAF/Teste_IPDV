const Pool = require('pg').Pool;
const dbConnection = require('../config/conn.json');
const pool = new Pool(dbConnection)

module.exports = () =>{
    const controller = {};

    controller.getCostCenter = (req,res) =>{
        try {
            pool.query('SELECT * FROM costcenter ORDER BY costcenter_id ASC', (error, results) =>{
                if (error) {
                    res.status(404).json({
                        message: 'Falha ao buscar centros de custo.'
                    });
                };
                res.status(200).json(results.rows);
            })
            
        } catch (error) {
            res.status(404).json({
                message: 'Falha ao buscar centros de custo.'
            });
        }
    }

    controller.create = (req, res) =>{
        const { costcenter_id, name } = req.body;
        pool.query('INSERT INTO costcenter(costcenter_id, name) VALUES ($1, $2)', [costcenter_id, name], (error, results) => {
            if (error) {
                res.status(404).json({
                    message: 'Falha ao adicionar centro de custo.',
                    error
                });
            }else{
                res.status(200).json({sucess: true})
            }
        })
    }

    controller.update = (req, res) =>{
        const id = parseInt(req.params.costCenterId);
        const { name } = req.body;
        
        pool.query(
            'UPDATE costcenter SET name = $1 WHERE costcenter_id = $2',
            [name, id],
            (error, results) => {
            if (error) {
                res.status(404).json({
                    message: 'Falha ao atualizar centro de custo.',
                    error
                });
            }else{
                res.status(200).json({sucess: true});
            }
        })
    }

    controller.delete = (req, res) =>{
        const id = parseInt(req.params.costCenterId);

        pool.query('DELETE FROM costcenter WHERE costcenter_id = $1', [id], (error, results) => {
            if (error) {
                res.status(404).json({
                    message: 'Falha ao deletar centro de custo.',
                    error
                });
            }else{
                res.status(200).json({sucess: true})
            }
        })
    }


    return controller;
}