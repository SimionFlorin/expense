const db= require('../db')


exports.get=function(req,res){

    const sql = 'SELECT name, description FROM CategoryType'
    db.all(sql,{}, (err,row)=>{
        if(err)
        return res.status(500).send(err.message)
        if(row)
        return res.status(200).send(row)
        else return res,status(400).send('Bad Request')
    })
}
exports.getTypesByCategoryId=function(req,res){
    const sql='SELECT name,description FROM CategoryType WHERE CategoryId = ?'
    const {id}= req.params
    db.all(sql,[id], (err,row)=>{
        console.log(sql)
        console.log(row)
        if(err)
        return res.status(500).send(err.message)

        if(row)
        return res.status(200).send(row)
        else { console.log('row');
            res.status(400).send('Bad Request')}
    })
}
exports.post=(req,res)=> {
    // res.json({requestBody: req.body})  

    console.log(req.body)
    const { Name, Description, CategoryId} = req.body;
    const sql='INSERT INTO CategoryType(Name,Description,CategoryId) VALUES(?,?,?)'
    // const categoryTypeTableData = db.prepare("INSERT INTO CategoryType(Name,Description,CategoryId) VALUES (?,?,?)");
    db.run(sql,[Name,Description,CategoryId], function (err,row){
        console.log(sql);
        if(err){
            console.log(' e in err')
        return res.status(500).send(err.message)
    }else{
        console.log(this.lastID);
        return res.status(200).send({...req.body, id: this.lastID})
    }
    })
}

exports.put=(req,res)=>{

    console.log(req.body);
    console.log(req.params);
    sql='UPDATE CategoryType SET Name=? , Description = ? , CategoryId = ? WHERE TypeId= ?'
    const {Name,Description,CategoryId} = req.body
    const id = req.params.id
    console.log(sql);
    db.run(sql,[Name,Description,CategoryId,id], function(err){
        console.log(' e in run')
        if(err){
            console.log(' e in err');
            return res.status(500).send(err.message)
        }
        else{
            console.log(this.changes);
            return res.status(200).send({Name,Description,CategoryId,id})
        }
    })
}