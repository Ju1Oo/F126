const db = require('../data/connection');

class Item {


static create(data, callback) {

    db.query(
        `
        INSERT INTO items
        (name, description, location, status, owner_id)
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            data.name,
            data.description,
            data.location,
            data.status,
            data.owner_id
        ],
        callback
    );
}

static getAll(status, callback){

    let sql = `
        SELECT items.*,
               users.name owner_name
        FROM items
        JOIN users
        ON users.id = items.owner_id
    `;

    let params = [];

    if(status){
        sql += ' WHERE status=?';
        params.push(status);
    }

    sql += ' ORDER BY created_at DESC';

    db.query(sql, params, callback);
}

static findById(id, callback) {

    db.query(
        `
        SELECT
            items.*,
            users.name AS owner_name
        FROM items
        JOIN users
        ON users.id = items.owner_id
        WHERE items.id = ?
        `,
        [id],
        (err, results) => {

            if (err) return callback(err);

            callback(null, results[0]);
        }
    );
}

static getUserItems(userId, callback) {

    db.query(
        'SELECT * FROM items WHERE owner_id=? ORDER BY created_at DESC',
        [userId],
        callback
    );
}

static closeItem(id, callback){

    db.query(
        `
        UPDATE items
        SET status='resolved'
        WHERE id=?
        `,
        [id],
        callback
    );
}

static update(id, data, callback) {

    db.query(
        `
        UPDATE items
        SET
            name = ?,
            description = ?,
            location = ?,
            status = ?
        WHERE id = ?
        `,
        [
            data.name,
            data.description,
            data.location,
            data.status,
            id
        ],
        callback
    );
}

static delete(id, callback) {

    db.query(
        `
        DELETE FROM items
        WHERE id = ?
        `,
        [id],
        callback
    );
}

}

module.exports = Item;
