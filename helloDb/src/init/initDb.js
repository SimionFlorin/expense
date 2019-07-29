const db = require('../db');

const categoryTable=`
CREATE TABLE [Category]
(
 [categoryId]    INTEGER PRIMARY KEY AUTOINCREMENT,
 [name]          varchar(100) NOT NULL 

);
`
const transactionTable = 
`
CREATE TABLE TransactionTable
(
 [transactionId]   INTEGER PRIMARY KEY AUTOINCREMENT,
 [transactionDate] datetime NOT NULL ,
 [sum]             float NOT NULL  ,
 [remarks]         varchar(100) NOT NULL,
 [typeId]      INTEGER ,
  FOREIGN KEY (typeId)  REFERENCES CategoryType(typeId)
)
`
const categoryType = `
CREATE TABLE [CategoryType]
(
 [typeId]      INTEGER PRIMARY KEY AUTOINCREMENT,
 [name]        varchar(100) NOT NULL ,
 [description] varchar(100) NOT NULL ,
 [categoryId]  int NOT NULL ,

FOREIGN KEY (categoryId)  REFERENCES Category(categoryId)
);
`

module.exports = () => {
    db.serialize(() => {
        // db.run("CREATE TABLE IF NOT EXISTS hello (id integer PRIMARY KEY,name text NOT NULL)");
      
        console.log('merge tabel')
        // const stmt = db.prepare("INSERT INTO Category(name,transactionId) VALUES (?,1)");


        console.log(db.run('PRAGMA foreign_keys'))
        db.run('PRAGMA foreign_keys = ON;')
        if(process.env.NODE_ENV === 'test'){
            db.run(categoryTable)
            db.run(transactionTable)
            db.run(categoryType)

            const categoryTableData = db.prepare("INSERT INTO Category(name) VALUES (?)");
            // const transactionTableData = db.prepare("INSERT INTO TransactionTable(transactionDate,sum,remarks,typeId) VALUES (?,?,?,?)");
            const categoryTypeTableData = db.prepare("INSERT INTO CategoryType(name,description,categoryId) VALUES (?,?,?)");
            
            
            categoryTableData.run('Income')
            categoryTableData.run('Expense')
            // transactionTableData.run(new Date(),213,'World',1);
            categoryTypeTableData.run('salary','monthly salary',1) 
            categoryTypeTableData.run('other','IDK',1)        
            categoryTypeTableData.run('carryover','tax deductions from previous losses',1) 
            categoryTypeTableData.run('Eating out',"Eating outside home",2)
            categoryTypeTableData.run('Entertainment',"SouthPark and Rick & Morty",2)
            categoryTypeTableData.run('Shopping',"Mall",2) 
            categoryTypeTableData.run('Fuel',"Fuel for car",2)
            categoryTypeTableData.run('General',"stuff",2)
            categoryTypeTableData.run('Holiday',"Expenses typical to the days you don't work",2)

            categoryTableData.finalize()
            // transactionTableData.finalize();
            categoryTypeTableData.finalize()
        }
    });
};
