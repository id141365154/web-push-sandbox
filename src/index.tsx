import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { register } from "./serviceWorkerRegistration";
import { urlBase64ToUint8Array } from "./urlBase64ToUint8Array";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
register();

if (navigator.serviceWorker) {
  navigator.serviceWorker.ready
    .then(function (registration) {
      console.log("registration", registration);

      if (!registration || !registration.pushManager) {
        return;
      }

      // @ts-ignore
      registration.pushManager.getSubscription((event) => {
        console.log("event", event);
      });

      // Use the PushManager to get the user's subscription to the push service.
      return registration.pushManager
        .getSubscription()
        .then(async function (subscription) {
          console.log("subscription", subscription);
          // If a subscription was found, return it.
          if (subscription) {
            JSON.stringify(subscription);
            return subscription;
          }

          // Get the server's public key
          // const response = await fetch("./vapidPublicKey");
          // const vapidPublicKey = await response.text();
          const vapidPublicKey =
            "BMf6YbvbCiHlLTiqJId5Ub23AJIq2UXOlf-OOIeXOW6ttipRa3dilKmjdNX6eW_Jxsx_qCQfq3XbpU2hmbKjaEM";
          // Chrome doesn't accept the base64-encoded (string) vapidPublicKey yet
          // urlBase64ToUint8Array() is defined in /tools.js
          const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
          prompt("convertedVapidKey", vapidPublicKey);

          // Otherwise, subscribe the user (userVisibleOnly allows to specify that we don't plan to
          // send notifications that don't have a visible effect for the user).
          return registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey,
          });
        });
    })
    .then(function (subscription) {
      if (!subscription) {
        return;
      }
      //console.log("subscription", subscription.endpoint);
      console.log("subscription", JSON.stringify(subscription));
      prompt("endpoint", subscription.endpoint);

      return;
      // Send the subscription details to the server using the Fetch API.
    });
}
