const express = require('express');
const router = express.Router()
const mysql = require('mysql');
const path = require('path');

const configMySql = {
    host: 'localhost',
    user: 'cief',
    password: '123456',
    database: 'renting_cars'
    
}

const connMySql = mysql.createConnection(configMySql);


// const jsonData = require('./vehicles.json');


router.get('/', (req, res) => {
    const SELECT = "SELECT * FROM modelos";

    connMySql.query(SELECT, (err, result) => {
        
        if(err) throw err;
        res.render('index', {
            title: 'Alquiler de vehiculos',
            datosVehiculos: result
        })
    })     
    
})

router.get('/stock', (req, res) =>{
   const SELECT = "SELECT id_modelo, nombre_modelo, unidades_totales FROM modelos"

   connMySql.query(SELECT, (err, result) => {
        if(err) throw err;
        res.render('stock', {
            title: 'stock de vehiculos',
            datosVehiculos: result
            
        })
        console.log(result);
   })

})

router.get('/formInsert', (req, res) =>{
    res.render('formInsert', {
        title: 'Alquiler de vehiculos'
    })
})

router.post('/insert', (req, res) => {
    
    const {nombre, personas, puertas, cambio, maletas, tipo, precio } = req.body;
   
    const INSERT = `INSERT INTO modelos (nombre_modelo, personas, puertas, cambio, maletas, tipo, precioDia) VALUES ('${nombre}', ${personas}, ${puertas}, '${cambio}', ${maletas}, '${tipo}', ${precio})`;

    connMySql.query(INSERT, (err, result) => {
        if(err) throw err;
        res.redirect('/')
    })
    
    
})

router.post('/update', (req, res) => {
 const {id, stock} = req.body;
 const UPDATE = `UPDATE modelos SET unidades_totales = ${stock} WHERE id_modelo = ${id}`

     connMySql.query(UPDATE, (err, result) => {
        if(err) throw err;
        res.redirect('/')
    })
    
    console.log(update);

})

router.get('/coche', (req, res) =>{

    console.log("/coche");
    const SELECT = "SELECT * FROM modelos";

    connMySql.query(SELECT, (err, result) => {
        
        if(err) throw err;
        res.render('coche', {
            title: 'Nuestro modelos de coche',
            datosVehiculos: result
        })
    })     
})

router.get("/coche/:modelo", (req, res) =>{
    console.log("params", req.params);
    const SELECT = `SELECT * FROM modelos WHERE id_modelo = '${req.params.modelo}'`;

    connMySql.query(SELECT, (err, result) => {
        
        
        if(err) throw err;
        res.render('coche', {
            title: 'Alquiler de vehiculos',
            datosVehiculos: result
        })
       

    })  

  
})



module.exports = router;