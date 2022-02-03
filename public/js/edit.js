const $ = selector => {
  let regex = /^#.*$/;
  if (!regex.test(selector)){
    let results = document.querySelectorAll(selector);
    return results.length === 1 ? results[0] : results;
  }
  return document.querySelector(selector);
};

const form = $('form');
const btnReturn = $('#btn-return');
let inputs = {
  name: $('#in-name'),
  price: $('#in-price'),
  manufacturer: $('#in-manufacturer')
};

//View and handler for server responses
let statsView = $('#stats-view');
const handleStatsView = str => {
  if (typeof str != 'string'){
    statsView.className = 'd-none';
    statsView.innerHTML = '';
    return;
  }
  statsView.innerHTML = str;
  statsView.className = '';
};

const formValidation = (inputs) => {
  let regexp = {
    name: /^[A-Za-z0-9 ?]{1,40}$/,
    price: /^[\d(,\.)?]+$/,
    manufacturer: /^[A-Za-z0-9 ?]{1,20}$/
  };

  for (let key in inputs) {
    if (!regexp[key].test(inputs[key].value))
      return false;
  }
  return true;
};

form.onsubmit = async evt => {
  evt.preventDefault();

  if (!formValidation(inputs)) return alert('Alguma das entradas não é valida');

  //Match param 'id' from URL
  window.location.pathname.match(/\/(\d+)/g);
  let productId = parseInt(RegExp.$1);

  let data = {};
  for (let key in inputs) {
    data[key] = inputs[key].value.trim();
  }
  data.id = productId;
  
  let headers = {
    'Content-Type': 'application/json'
  };
  let res = await fetch('/product/edit', { body: JSON.stringify(data), method: 'POST', headers });
  let json = await res.json();
  handleStatsView(json.success || json.error);
  
};
btnReturn.onclick = () => {
  window.location.pathname = '/';
};

$('input').forEach(el => {
  el.onfocus = () => {
    handleStatsView();
  };
});