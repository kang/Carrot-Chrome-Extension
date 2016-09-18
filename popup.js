function saveSettings() {
  let payload = {
    type: 'saveSettings',
    payload: {
      name: $('#me-name-input')[0].value,
      goal: {
        name: $('#me-goal-name-input')[0].value,
        cost: $('#me-goal-cost-input')[0].value
      }
    }
  };

  chrome.storage.sync.get('carrot', function(storage) {
    let carrot = storage.carrot || {};

    carrot.name = $('#me-name-input')[0].value;
    carrot.goal = {
      name: $('#me-goal-name-input')[0].value,
      cost: $('#me-goal-cost-input')[0].value
    };

    chrome.storage.sync.set({ carrot: carrot }, function() {
      chrome.browserAction.setPopup({ popup: 'settings.html' });

      window.location.href = 'settings.html';
    });
  });
}

$('.me-popup').ready(function (){
  $('.me-plant-carrot-button').click(saveSettings);
});
