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
            return res.status(400).send('Bad Request');
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
exports.post=(req,res)=> {
    // res.json({requestBody: req.body})  

    console.log(req.body)

    const{Sum, Remarks, CategoryId}=req.body
    
    const TransactionDate = req.body.TransactionDate?req.body.TransactionDate:new Date()
    // const { Sum, Description, Remarks, TransactionDate, CategoryId} = req.body;
    const sql='INSERT INTO TransactionTable(Sum, Remarks, TransactionDate, CategoryId) VALUES(?,?,?,?)'
    // const categoryTypeTableData = db.prepare("INSERT INTO CategoryType(Name,Description,CategoryId) VALUES (?,?,?)");
    db.run(sql,[Sum, Remarks, TransactionDate, CategoryId], function (err,row){
        console.log(sql);
        if(err){
            console.log(' e in err')
        return res.status(500).send(err.message)
    }else{
        console.log(this.lastID);
        return res.status(200).send({...req.body, TransactionDate, TransactionId: this.lastID})
    }
    })
}

