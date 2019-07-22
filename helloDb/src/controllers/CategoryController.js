const db = require('../db')


exports.get = function (req,res) {


    const sql = 'SELECT * FROM category '

    db.all(sql,{},(err,row)=>{
        if(err)
        return res.status(500).send(err.message)
        if(row){
            return res.status(200).send(row)
        }
        else return res.status(400).send('Bad Request')
    })
}