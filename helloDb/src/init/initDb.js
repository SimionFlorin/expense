const db = require('../db');

module.exports = () => {
    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS hello (id integer PRIMARY KEY,name text NOT NULL)");

        const stmt = db.prepare("INSERT INTO hello(name) VALUES (?)");

        stmt.run('World');

        stmt.finalize();
    });
};
