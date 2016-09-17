function prepareCostText(text) {
  return /(\$[0-9,]+(\.[0-9]{2})?)/.exec(text)[0];
}

function scrapeCartItems() {
  const products = [];
  const checkoutItemElements = document.querySelectorAll('.item-row');
  var totalCost = 0;
  var currencyType;

  [].forEach.call(checkoutItemElements, function(el) {
    var costText = prepareCostText(el.querySelector('.a-color-price').textContent);
    var productName = el.querySelector('.breakword span').textContent;
    var quantity = parseFloat(el.querySelector('select.quantity-dropdown-select').value);

    totalCost += (parseFloat(costText.substr(1)) * quantity);
    currencyType = costText.charAt(0);

    products.push({
      name: productName,
      price: costText
    });
  });

  window.localStorage.carrot = !!window.localStorage.carrot ? window.localStorage.carrot : '{}';
  var state = JSON.parse(window.localStorage.carrot);

  state.currentProducts = products;
  state.currentTotalCost = currencyType + totalCost;

  window.localStorage.carrot = JSON.stringify(state);
}

function saveMoney(event) {
  event.preventDefault();

  window.location.href = 'https://www.moneyextender.com/awesome/';
}

function closeOverlay(event) {
  event.preventDefault();

  $('.me-overlay-container').remove();
}

function renderOverlay() {
  if (!$('.me-overlay-container').length) {
    const container = document.createElement('div');
    container.className = 'me-overlay-container';

    document.body.insertBefore(container, document.body.firstChild);

    $('.me-overlay-container').load(chrome.extension.getURL('overlay.html'));
  }
}

scrapeCartItems();
renderOverlay();

$('.me-overlay').ready(function (){
  let state = JSON.parse(window.localStorage.carrot);

  $('#me-total-cost')[0].innerText = state.currentTotalCost;

  $('.save-button').click(saveMoney);
  $('.continue-button').click(closeOverlay);
});
