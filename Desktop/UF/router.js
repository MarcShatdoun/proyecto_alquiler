const e = require('express');
const express = require('express');
const router = express.Router()
const mysql = require('mysql');
const path = require('path');

const connMysql = mysql.createConnection({ 
    host: 'localhost',
    user: 'cief',
    password: '123456',
    database: 'uf1846'

})



router.get('/', (req, res) => {

    SELECTNAV = 'SELECT departamento FROM `team` GROUP BY `departamento`'

    connMysql.query(SELECTNAV, (err, result) => {
        if (err) throw err
        const nav = result

        const SELECT = 'SELECT * FROM `team`'
        
        connMysql.query(SELECT, (err, result) => {
            if(err) throw err

            res.render('index', {
                team: result,
                nav: nav
            })
        })
    })
    
})

router.get('/departamento/:departamento', (req, res) => {

    const SELECTNAV = 'SELECT departamento FROM `team` GROUP BY `departamento`'

    connMysql.query(SELECTNAV, (err, result) => {
        if (err) throw err
        const nav = result

        const SELECT = `SELECT * FROM team WHERE departamento = "${req.params.departamento}"`
    
        connMysql.query(SELECT, (err, result) => {
            if(err) throw err
            res.render('index', {
                team: result,
                nav: nav
            })
        })
    })
})

router.get('/team/:apellido', (req, res) => {

    const SELECTNAV = 'SELECT departamento FROM `team` GROUP BY `departamento`'

    connMysql.query(SELECTNAV, (err, result) => {
        if (err) throw err
        const nav = result
            
        const SELECT = `SELECT * FROM team WHERE apellido = "${req.params.apellido}"`

        connMysql.query(SELECT, (err, result) => {
            if(err) throw err
            res.render('team', {
                team: result,
                nav: nav,
                params: req.params.apellido
            })
        })
        // console.log(req.params.apellido);
    })
})



module.exports = router