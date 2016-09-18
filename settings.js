const payload = { type: 'getSettings' };

chrome.storage.sync.get('carrot', function(state) {
  let carrotState = state.carrot;

  let name = carrotState.name;
  let goalName = carrotState.goal.name;
  let goalCost = carrotState.goal.cost;
  let totalProductCost = carrotState.totalProductCost;

  $('#me-settings-name')[0].innerText = name;
  $('#me-settings-goalname')[0].innerText = goalName;
  $('#me-settings-goalcost')[0].innerText = '$' + goalCost;

  if (!!totalProductCost) {
    $('#me-settings-goalpercentage')[0].innerText = parseInt(totalProductCost/goalCost*100) + '%';
  }
});
