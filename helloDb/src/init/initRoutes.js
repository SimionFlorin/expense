const TransactionController = require('../controllers/TransactionController');
const X = require('../controllers/CategoryController.js')
const CategoryTypeController = require('../controllers/CategoryTypeController')

module.exports = (app) => {
    app.get('/getTransactions', TransactionController.get);
    app.get('/getTransaction/:id', TransactionController.getById);
    app.post('/Transaction', TransactionController.post)
    app.get('/Categories', X.get)
    app.get('/CategoryTypes', CategoryTypeController.get)
    app.get('/getTypesByCategoryId/:id', CategoryTypeController.getTypesByCategoryId)
    app.post('/CategoryType', CategoryTypeController.post)
    app.put('/CategoryType/:id',CategoryTypeController.put)
    app.delete('/CategoryType/:id',CategoryTypeController.delete)
    app.get('/CategoryType/:id', CategoryTypeController.getById)
    app.get('/getTypesByCategoryName/:Name', CategoryTypeController.getTypesByCategoryName)

    
};
