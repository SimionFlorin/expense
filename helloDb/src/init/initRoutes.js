const TransactionController = require('../controllers/TransactionController');
const CategoryController = require('../controllers/CategoryController')
const CategoryTypeController = require('../controllers/CategoryTypeController')

module.exports = (app) => {
    app.get('/getTransaction', TransactionController.get);
    app.get('/getTransaction/:id', TransactionController.getById);
    app.get('/Categories', CategoryController.get)
    app.get('/CategoryTypes', CategoryTypeController.get)
    app.get('/CategoryTypes/:id', CategoryTypeController.getTypesByCategoryId)
    app.post('/CategoryType', CategoryTypeController.post)
    app.put('/CategoryType/:id',CategoryTypeController.put)

    
};
