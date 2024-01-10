const customersRouter = require('express').Router()
const sql = require('mssql')
require('dotenv').config()

const config = {
	user: process.env.USER,
	password: process.env.PASS,
	server: process.env.DB_SERVER,
	database: process.env.DATABASE,
	options: {
	  trustServerCertificate: true
	}
}


const obtenerTodos = async () => {
    try {
        let pool = await sql.connect(config)
        let result1 = await pool.request()
            .query(
                `SELECT TOP (10) [CustomerID]
              ,[CompanyName]
              ,[ContactName]
              ,[ContactTitle]
              FROM CUSTOMERS`
            )


        return result1.recordset


    } catch (err) {
        console.log(err);
    }

    sql.on('error', err => {
        console.log('====> Error obtenerTodos: ', err);
    })


}


customersRouter.get('/', async (req, res) => {

    const resultado = await obtenerTodos()
    res.json(resultado)
})


module.exports = customersRouter