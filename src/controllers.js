const models = require('./models');

const indexController = (req, res) => {
  models.indexPage(req, res);
};
const createController = (req, res) => {
  models.createFormPage(req, res);
};
const editController = (req, res) => {
  models.editFormPage(req, res);
};
const listAllProducts = (req, res) => {
  models.listAllProducts(req, res);
};
const createProduct = (req, res) => {
  models.createProduct(req, res);
};
const editProduct = (req, res) => {
  models.editProduct(req, res);
};
const deleteProduct = (req, res) => {
  models.deleteProduct(req, res);
};

module.exports.indexController = indexController;
module.exports.createController = createController;
module.exports.editController = editController;
module.exports.listAllProducts = listAllProducts;
module.exports.createProduct = createProduct;
module.exports.editProduct = editProduct;
module.exports.deleteProduct = deleteProduct;
