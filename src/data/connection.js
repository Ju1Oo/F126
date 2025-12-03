const msyql = require('mysql');

const db = msyql.createConnection(
    {
        host : 'localhost',
        user : 'root',
        password : 'root',
        database : 'athletics_app',
        port : 3306
         
    }
);

db.connect((err) => {
    if(err){
        console.error('Error connectin to database')
        return;
    }
    console.log('Connected')
}
);

module.exports = db;
