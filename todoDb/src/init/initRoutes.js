const helloController = require('../controllers/helloController');
const todoController = require('../controllers/todoController');

module.exports = (app) => {
    app.get('/', helloController.get);

    app.get('/todo', todoController.get);
    app.post('/todo', todoController.post);
};
