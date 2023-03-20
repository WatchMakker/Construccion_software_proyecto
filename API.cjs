const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '10mb' }))


const credentials = {
	host: '127.0.0.1',
	user: 'root',
	password: '',
	port: '3307',
	database: 'usuarios'
}



app.post('/api/login', (req, res) => {
	const { account, password } = req.body
	const values = [account, password]
	var connection = mysql.createConnection(credentials)
	connection.query("SELECT * FROM tipos_de_usuarios WHERE Correo = ? AND contraseña = ?", values, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			if (result.length > 0) {
				res.status(200).send({
					"id": result[0].id,
					"user": result[0].user,
					"username": result[0].username
				})
			} else {
				res.status(400).send('Usuario no existe')
			}
		}
	})
	connection.end()
})


app.listen(5173, () => console.log('Servidor activo'))