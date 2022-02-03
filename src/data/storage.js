const fs = require('fs');

const path = './src/data/storage.json';

module.exports = {
  listAll: function() {
    let products = JSON.parse(fs.readFileSync(path, 'utf8'));
    return products;
  },
  save: function(product) {
    let products = this.listAll();
    product.id = (products[products.length-1] || {}).id+1 | 0;

    products.push(product);
    fs.writeFileSync(path, JSON.stringify(products), 'utf8');
  },
  edit: function(editedProduct) {
    let products = this.listAll();
    let product = this.findById(editedProduct.id);
    product.name = editedProduct.name;
    product.price = editedProduct.price;
    product.manufacturer = editedProduct.manufacturer;
    
    let index = products.findIndex(p => p.id == product.id);
    products.splice(index, 1, product);

    fs.writeFileSync(path, JSON.stringify(products), 'utf8');
  },
  delete: function(idArray) {
    let products = this.listAll();
    idArray.forEach((id) => {
      let index = products.findIndex(product => product.id == id);
      products.splice(index, 1);
    });
    
    fs.writeFileSync(path, JSON.stringify(products), 'utf8');
  },
  findById: function(id) {
    let products = this.listAll();
    return products.find(product => product.id == id);
  },
  findByRegExp: function(regexString) {
    let products = this.listAll();
    let regex = new RegExp(regexString);
    
    let results = products.filter(p => regex.test(p.name));
    return results;
  }
};