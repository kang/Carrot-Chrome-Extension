var products = [];

function scrapeCartItems() {
  const checkoutItemElements = document.querySelectorAll('.item-row');

  [].forEach.call(checkoutItemElements, function(el) {
    products.push({
      name: el.querySelector('.breakword span').textContent,
      price: el.querySelector('.a-color-price').textContent
    });
  });
}

function saveMoney(event) {
  event.preventDefault();


}

function closeOverlay(event) {
  event.preventDefault();

  $('.me-overlay-container').remove();
}

scrapeCartItems();

if (!$('.me-overlay-container').length) {
  const container = document.createElement('div');
  container.className = 'me-overlay-container';

  document.body.insertBefore(container, document.body.firstChild);

  $('.me-overlay-container').load(chrome.extension.getURL('overlay.html'));


  $('.me-overlay').ready(function (){
    $('.save-button').click(saveMoney);
    $('.continue-button').click(closeOverlay);
  })
}
