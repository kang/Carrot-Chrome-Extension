'use strict';
/*
  checks if the page is on amazon's checkout page, if it is
  then it scrapes the page for items and opens the popup
*/

const AMAZON_CART_TITLE = 'Amazon.com Shopping Cart';
const AMAZON_CHECKOUT_TITLE = 'Amazon.com Checkout';


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status !== 'loading') return;

  const currentPage = {
    inAmazonCart: tab.title === AMAZON_CART_TITLE,
    inAmazonCheckout: tab.title === AMAZON_CHECKOUT_TITLE
  };

  if (currentPage.inAmazonCart || currentPage.inAmazonCheckout) {
    chrome.tabs.executeScript(tabId, { file: 'jquery-3.1.0.min.js' });
    chrome.tabs.executeScript(tabId, { file: 'overlay.js' });
    chrome.tabs.insertCSS(tabId, { file: 'overlay.css' });
  }
});
