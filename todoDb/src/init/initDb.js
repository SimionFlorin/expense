const db = require('../db');

module.exports = () => {
    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS hello (id integer PRIMARY KEY,name text NOT NULL)");

        db.run("CREATE TABLE IF NOT EXISTS todo (id integer PRIMARY KEY,text text NOT NULL, date DATE DEFAULT (datetime('now','localtime')))");


        // db.run("CREATE TABLE IF NOT EXISTS todo (id integer PRIMARY KEY,text text NOT NULL, createAt DATE DEFAULT (DATETIME('now')))");

        let stmt = db.prepare("INSERT INTO hello(name) VALUES (?)");

        stmt.run('World');

        stmt.finalize();

        stmt = db.prepare("INSERT INTO todo(text) VALUES (?)");

        stmt.run('test todo');
        stmt.run('test todo2');

        stmt.finalize();

        db.all("SELECT * from todo", [], (err, res) => {
            console.log(err, res);
        });

    });
};
