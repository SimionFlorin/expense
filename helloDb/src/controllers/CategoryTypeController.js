const db= require('../db')


exports.get=function(req,res){

    const sql = 'SELECT * FROM CategoryType'
    db.all(sql,{}, (err,row)=>{
        if(err)
        return res.status(500).send(err.message)
        if(row)
        return res.status(200).send(row)
        else return res,status(400).send('Bad Request')
    })
}
exports.getTypesByCategoryId=function(req,res){
    const sql='SELECT * FROM CategoryType WHERE CategoryId = ?'
    const {id}= req.params
    db.all(sql,[id], (err,row)=>{
        console.log(sql)
        console.log(row)
        console.log(row.length);
        if(err)
        return res.status(500).send(err.message)

        if(row.length>0)
        return res.status(200).send(row)
        else { console.log('row');
            res.status(400).send('Bad Request')}
    })
}
exports.getTypesByCategoryName=function(req,res){
    const sql='SELECT * FROM CategoryType T, Category C WHERE T.CategoryId = C.CategoryId AND C.Name = ?'
    const Name= req.params.Name
console.log(Name);
// CategoryType.Name, CategoryType.Description, CategoryType.TypeId
    db.all(sql,[Name], (err,row)=>{
        console.log(sql)
        console.log(row)
        if(err)
        return res.status(500).send(err.message)

        if(row.length>0)
        return res.status(200).send(row)
        else { console.log('row');
            res.status(400).send('Bad Request')}
    })
}

exports.getById=function(req,res){
    const sql='SELECT * FROM CategoryType WHERE TypeId = ?'
    const id= parseInt(req.params.id)
    db.get(sql,[id], (err,row)=>{
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
    const sql='INSERT INTO CategoryType(Name,Description,CategoryId) VALUES (?,?,?)'
    // const categoryTypeTableData = db.prepare("INSERT INTO CategoryType(Name,Description,CategoryId) VALUES (?,?,?)");
    db.run(sql,[Name,Description,CategoryId], function (err,row){
        console.log(sql);
        if(err){
            console.log(' e in err')
        return res.status(500).send(err.message)
    }else{
        console.log(this);
        return res.status(200).send({...req.body, TypeId: this.lastID})

    }
    })
}

exports.put=(req,res)=>{

    console.log(req.body);
    console.log(req.params);
    const sql='UPDATE CategoryType SET Name=? , Description = ? , CategoryId = ? WHERE TypeId= ?'
    const {Name,Description,CategoryId} = req.body
    const id = parseInt(req.params.id)
    console.log(sql);
    db.run(sql,[Name,Description,CategoryId,id], function(err){
        console.log(' e in run')
        if(err){
            console.log(' e in err');
            return res.status(500).send(err.message)
        }
        if(this.changes){
            console.log(this.changes);
            return res.status(200).send({Name,Description,CategoryId,id})
            
        }
        else return res.status(400).send('Bad Request')
    })
}
exports.delete=(req,res)=>{

    console.log(req.body);
    console.log(req.params);
    const sql = 'DELETE FROM CategoryType WHERE TypeId = ?'
    const TypeId = req.params.id

    db.run(sql,TypeId, function(err){
        if(err) return res.status(500).send(err.message)
        else if(this.changes>0){
            console.log(this)
            return res.status(200).send('Item deleted')
        }
        else return res.status(400).send('Bad Request')
    })
}