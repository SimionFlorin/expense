const db = require('../db');

const categoryTable=`
CREATE TABLE [Category]
(
 [CategoryId]    INTEGER PRIMARY KEY AUTOINCREMENT,
 [Name]          varchar(100) NOT NULL 

);
`
const transactionTable = 
`
CREATE TABLE TransactionTable
(
 [TransactionId]   INTEGER PRIMARY KEY AUTOINCREMENT,
 [TransactionDate] datetime NOT NULL ,
 [Sum]             float NOT NULL  ,
 [Remarks]         varchar(100) NOT NULL,
 [CategoryId]      INTEGER ,
  FOREIGN KEY (CategoryId)  REFERENCES Category(CategoryId)
)
`
const categoryType = `
CREATE TABLE [CategoryType]
(
 [TypeId]      INTEGER PRIMARY KEY AUTOINCREMENT,
 [Name]        varchar(100) NOT NULL ,
 [Description] varchar(100) NOT NULL ,
 [CategoryId]  int NOT NULL ,

FOREIGN KEY (CategoryId)  REFERENCES Category(CategoryId)
);
`

module.exports = () => {
    db.serialize(() => {
        // db.run("CREATE TABLE IF NOT EXISTS hello (id integer PRIMARY KEY,name text NOT NULL)");
      
        console.log('merge tabel')
        // const stmt = db.prepare("INSERT INTO Category(Name,TransactionId) VALUES (?,1)");


        console.log(db.run('PRAGMA foreign_keys'))
        db.run('PRAGMA foreign_keys = ON;')
        db.run(categoryTable)
        db.run(transactionTable)
        db.run(categoryType)

        const categoryTableData = db.prepare("INSERT INTO Category(Name) VALUES (?)");
        // const transactionTableData = db.prepare("INSERT INTO TransactionTable(TransactionDate,Sum,Remarks,CategoryId) VALUES (?,?,?,?)");
        const categoryTypeTableData = db.prepare("INSERT INTO CategoryType(Name,Description,CategoryId) VALUES (?,?,?)");
        
        
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
    });
};
