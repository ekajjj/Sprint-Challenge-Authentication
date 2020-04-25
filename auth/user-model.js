const bcrypt = require("bcryptjs")
const db = require("../database/dbConfig")

// User model

// Signup
async function signup(user) {
    user.password = await bcrypt.hash(user.password, 13)

    const [id] = await db("users").insert(user)
    
    return findById(id)
}

//Find
async function find() {
    return db("users").select("id", "username")
}

function findBy(filter) {
	return db("users")
		.select("id", "username", "password")
		.where(filter);
}

async function findById(id) {
    return db("users").select("id", "username").where({ id }).first()
}

module.exports = {
    signup,
    find,
    findBy,
    findById
}