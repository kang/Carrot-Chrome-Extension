function saveSettings() {
  let payload = {
    type: 'saveSettings',
    payload: {
      name: $('#me-name-input')[0].value,
      goal: {
        name: $('#me-goal-name-input')[0].value,
        cost: $('#me-goal-cost-input')[0].value,
      }
    }
  };

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, payload);
  });
}

$('.me-popup').ready(function (){
  $('.me-plant-carrot-button').click(saveSettings);
});
