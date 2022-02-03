const storage = require('./data/storage');

const indexPage = (req, res) => {
  let products = storage.listAll();
  res.render('pages/index.ejs', {partial: 'product_list', products});
  res.end();
};
const createFormPage = (req, res) => {
  res.render('pages/index.ejs', {partial: 'product_create'});
  res.end();
};
const editFormPage = (req, res) => {
  let product = storage.findById(req.params.id);
  res.render('pages/index.ejs', {partial: 'product_edit', product});
  res.end();
};

const listAllProducts = (req, res) => {
  let products = storage.listAll();
  res.json(products);
  res.end();
};
const createProduct = (req, res) => {
  storage.save(req.body);

  let response = {
    success: 'Produto salvo com sucesso!'
  };
  res.json(response)
  res.end();
};
const editProduct = (req, res) => {
  storage.edit(req.body);
  let response = {
    success: 'Produto editado com sucesso!'
  };
  res.json(response);
  res.end();
};
const deleteProduct = (req, res) => {
  storage.delete(req.body);
  let response = {
    success: 'Produto Deletado com sucesso!',
    error: 'Erro'
  };
  res.json(response);
  res.end();
};

module.exports.indexPage = indexPage;
module.exports.createFormPage = createFormPage;
module.exports.editFormPage = editFormPage;
module.exports.listAllProducts = listAllProducts;
module.exports.createProduct = createProduct;
module.exports.editProduct = editProduct;
module.exports.deleteProduct = deleteProduct;
