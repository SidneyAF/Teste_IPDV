const app = require('./config/express')();
const Pool = require('pg').Pool;
const dbConnection = require('./config/conn.json');
const pool = new Pool(dbConnection)
const port = app.get('port');

async function createTable(){
    await pool.query(`
        create table if not exists costCenter (
            costCenter_id integer not null,
            name varchar not null,
            PRIMARY KEY (costCenter_id) 
        )
    `);

    await pool.query(`create table if not exists department (
        department_id integer not null,
        name varchar not null,
        PRIMARY KEY (department_id),
        fk_costCenter integer not null REFERENCES costCenter(costCenter_id) ON DELETE CASCADE
        )
    `);

    await pool.query(`create table if not exists users (
        user_id integer not null,
        name varchar not null,
        office varchar not null,
        phone varchar,
        PRIMARY KEY (user_id),
        fk_department integer not null REFERENCES department(department_id) ON DELETE CASCADE
        )
    `);
    console.log('Table created')
}

async function insert(){
    let costCenterQueryString = `INSERT INTO costCenter(costCenter_id, name) VALUES(1, 'Recursos Humanos')`;

    let departmentQueryString = `INSERT INTO department(department_id, name, fk_costCenter) VALUES(1, 'Recrutamento e Seleção', 1),(2, 'Treinamento e Desenvolvimento', 1)`;

    let userQueryString = `INSERT INTO users(user_id, name, office, phone, fk_department) VALUES(1, 'José da Silva', 'Recrutador','(11)997625378',1),(2, 'Bruna Correira Neves', 'Analista de treinamento','(13)997443313',2)`;
    
    await pool.query(costCenterQueryString);
    await pool.query(departmentQueryString);
    await pool.query(userQueryString);

    console.log('Data insert')
}

app.listen(port, () => {

    pool.connect();

    createTable().then( () =>{
        insert();
    });

    console.log(`Porta utilizada: ${port}`)
});