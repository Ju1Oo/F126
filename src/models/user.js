const db = require('../data/connection');

class User {

static create(name, phone, password_hash, callback) {

    db.query(
        `
        INSERT INTO users
        (name, phone, password_hash)
        VALUES (?, ?, ?)
        `,
        [
            name,
            phone,
            password_hash
        ],
        callback
    );
}

static findByName(name, callback) {
    db.query(
        'SELECT * FROM users WHERE name=?',
        [name],
        (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        }
    );
}

static findById(id, callback) {
    db.query(
        'SELECT * FROM users WHERE id=?',
        [id],
        (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        }
    );
}



}

module.exports = User;
