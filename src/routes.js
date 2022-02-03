const bodyParser = require('body-parser');
const controllers = require('./controllers');
let jsonParser = bodyParser.json();

const routes = router => {
  router.get('/', controllers.indexController);
  router.get('/create-product', controllers.createController);
  router.get('/edit-product/:id', controllers.editController);
  router.get('/product/listall', controllers.listAllProducts);
  router.post('/product/create', jsonParser, controllers.createProduct);
  router.post('/product/edit', jsonParser, controllers.editProduct);
  router.post('/product/delete', jsonParser, controllers.deleteProduct);
};

module.exports = routes;