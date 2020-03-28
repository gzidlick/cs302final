import { PasswordContiner } from './continer.js';
chrome.tabs.onActivated.addListener(event => {
    console.log("Tab activated with id: " + event.tabId);
});
