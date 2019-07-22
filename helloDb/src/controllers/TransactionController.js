const db = require('../db');

exports.get = function (req, res) {
    const sql = `SELECT TransactionDate, Sum, Remarks from TransactionTable`;
    db.all(sql,{}, (err, row) => {
        console.log(sql);
        if (err) return res.status(500).send(err.message);
        if (row) {
            console.log(row);
            return res.status(200).send(row);
        } else {
            return res.status(400).send('Bad request');
        }
    });
};

exports.getById = function (req, res) {
    const { id } = req.params;
    const sql = `SELECT TransactionDate, Sum, Remarks from TransactionTable WHERE TransactionId = ?`;
    db.get(sql,[id], (err, row) => {
        console.log(sql);
        if (err) return res.status(500).send(err.message);
        if (row) {
            console.log(row);
            return res.status(200).send(row);
        } else {
            return res.status(400).send('Bad request');
        }
    });
};

