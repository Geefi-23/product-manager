const $ = selector => {
  let regex = /^#.*$/;
  if (!regex.test(selector)){
    let results = document.querySelectorAll(selector);
    return results.length === 0 ? null : results.length === 1 ? results[0] : results;
  }
  return document.querySelector(selector);
};

let productList = [];

const btnCreate = $('#btn-create');
const btnDelete = $('#btn-delete');
const btnEdit = $('#btn-edit');
const inputSearch = $('#in-search');

btnCreate.onclick = () => {
  window.location.pathname = '/create-product';
};

btnDelete.onclick = async () => {
  let checkboxes = $('input[type="checkbox"]:checked');

  if (!checkboxes) return alert('Selecione um item para excluir!');

  //Support to single or multiple delete
  let isMoreThanOne = NodeList.prototype.isPrototypeOf(checkboxes);
  let ids = [];

  if (isMoreThanOne) {
    checkboxes.forEach((checkbox) => {
      ids.push(checkbox.value);
    });
  } else ids.push(checkboxes.value);

  let headers = { 
    'Content-Type': 'application/json'
  };
  let res = await fetch('http://localhost:3000/product/delete', { method: 'POST', body: JSON.stringify(ids), headers });
  let json = await res.json();
  if (json.success && isMoreThanOne) {
    checkboxes.forEach((checkbox) => {
      checkbox.closest('div.product-item').remove();
    });
  } else if (json.success && !isMoreThanOne) {
    checkboxes.closest('div.product-item').remove();
  } else {
    console.log(json.error);
  }
}

btnEdit.onclick = () => {
  let checkbox = $('input[type="checkbox"]:checked');

  if (!checkbox) return alert('Você não selecionou nenhum produto!');
  if (NodeList.prototype.isPrototypeOf(checkbox)) return alert('Você só pode editar um produto de cada vez!');
  
  window.location.pathname = `/edit-product/${checkbox.value}`;
};

const fillProductList = () => {
  $('#product-list').innerHTML = '';
  productList.forEach((product) => {
    
    $('#product-list').innerHTML += `
      <div class="product-item">
        <div class="d-inline-block h-100" style="width: calc(100% - 100px)">
          <h5>${product.name}</h5>
          <div>R$ ${product.price.toLocaleString('pt-BR')}</div>
          <div>Fabricante: ${product.manufacturer}</div>
        </div>
        <div class="d-inline-flex justify-content-center align-items-center" style="width: 100px;">
          <input class="border" type="checkbox" value="${product.id}">
        </div>
        
      </div>
      `;
  });
};
inputSearch.oninput = async function() {
  let regexString = this.value.toLowerCase();
  if (regexString === '') return fillProductList();

  let regex = new RegExp(regexString);
  let results = productList.filter(p => regex.test(p.name.toLowerCase()));
  $('#product-list').innerHTML = '';
  results.forEach((product) => {
    
    $('#product-list').innerHTML += `
      <div class="product-item">
        <div class="d-inline-block h-100" style="width: calc(100% - 100px)">
          <h5>${product.name}</h5>
          <div>R$ ${product.price.toLocaleString('pt-BR')}</div>
          <div>Fabricante: ${product.manufacturer}</div>
        </div>
        <div class="d-inline-flex justify-content-center align-items-center" style="width: 100px;">
          <input class="border" type="checkbox" value="${product.id}">
        </div>
        
      </div>
      `;
  });
};

window.onload = async () => {
  let res = await fetch('/product/listall');
  let json = await res.json();

  productList = json;
};