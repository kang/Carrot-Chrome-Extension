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

  chrome.storage.sync.get('carrot', function(storage) {
    let carrotState = storage.carrot;

    carrotState.currentProducts = products;
    carrotState.currentTotalCost = currencyType + totalCost;

    chrome.storage.sync.set({ carrot: carrotState }, function() {
      console.log('stored scraped items');
    });
  });
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

function composeGoalPercentage(totalCostText, goalCost) {
  let totalCost = parseFloat(totalCostText.substr(1));

  return parseInt(totalCost/goalCost*100) + '%';
}

scrapeCartItems();
renderOverlay();

$('.me-overlay').ready(function (){
  chrome.storage.sync.get('carrot', function(storage) {
    let state = storage.carrot;

    $('#me-total-cost')[0].innerText = state.currentTotalCost;
    $('#me-goal-percentage')[0].innerText = composeGoalPercentage(state.currentTotalCost, state.goal.cost);
    $('#me-username')[0].innerText = state.name;
    $('#me-goalname')[0].innerText = state.goal.name;

    $('.save-button').click(saveMoney);
    $('.continue-button').click(closeOverlay);
  });
});
