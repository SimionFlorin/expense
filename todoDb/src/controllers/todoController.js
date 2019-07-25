const db = require('../db');

exports.get = function (req, res) {

    const sql = "SELECT * from todo";

    db.all(sql, [], (err, todos) => {
        if (err) return res.status(500).send(err.message);
        res.status(200).send(todos)
    });
};


exports.post = function (req, res) {
    const {text, date} = req.body;

    if (!text) return res.status(400).send('Bad request');

    let sql = "INSERT INTO todo(text) VALUES (?)";
    const params = [text];

    if (date) {
        sql = "INSERT INTO todo(text, date) VALUES (?, ?)";
        params.push(date)
    }

    db.run(sql, params, function (err) {
        if (err) res.status(500).send('Something went wrong');
        db.get("SELECT * FROM todo WHERE id = ?", [this.lastID], (err, todo) => {
            if (err) res.status(500).send('Something went wrong');
            // res.status(200).json(todo);
            res.status(200).send(todo);
        })
    });
};
