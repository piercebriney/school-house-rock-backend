const { Pool } = require('pg');

const connectionPool = new Pool();


async function getUserPassword(username) {
	const returnedValue = await connectionPool.query('SELECT password FROM user WHERE username=$1', [username], (err, res) => {
		if (err) return null;

		if (res.rowCount != 1) return null;

		return res.rows[0].password;
	});

	return returnedValue;
}

async function signupUser(username, password) {
	const returnedValue = await connectionPool.query('INSERT INTO user(username,password) VALUES ($1,$2)', [username, password], (err, res) => {
		if (err) return false;

		return true;
	});

	return returnedValue;
}

module.exports = { getUserPassword, signupUser };