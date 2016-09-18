// init state
// window.localStorage.carrot = !!window.localStorage.carrot ? window.localStorage.carrot : '{}';
//
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.type === "saveSettings") {
//     let state = JSON.parse(window.localStorage.carrot);
//
//     state.name = request.payload.name;
//     state.goal = request.payload.goal;
//
//     window.localStorage.carrot = JSON.stringify(state);
//   }
//
//   if (request.type === "getSettings") {
//     let state = JSON.parse(window.localStorage.carrot);
//     let res = {
//       name: state.name,
//       goal: state.goal
//     };
//
//     sendResponse(res);
//   }
// });
