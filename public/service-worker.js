/* eslint-disable no-restricted-globals */
// <reference lib="webworker" />

self.addEventListener('push', function (event) {
    // Retrieve the textual payload from event.data (a PushMessageData object).
    // Other formats are supported (ArrayBuffer, Blob, JSON), check out the documentation
    // on https://developer.mozilla.org/en-US/docs/Web/API/PushMessageData.
    const payload = event.data ? event.data.text() : 'no payload';

    // Keep the service worker alive until the notification is created.
    event.waitUntil(
        // Show a notification with title 'ServiceWorker Cookbook' and use the payload
        // as the body.
        self.registration.showNotification('ServiceWorker Cookbook', {
            body: payload,
        })
    );

    const unreadCount = Number(payload)

    // Set or clear the badge.
    if (navigator.setAppBadge) {
        if (unreadCount && unreadCount > 0) {
            navigator.setAppBadge((unreadCount));
        } else {
            navigator.clearAppBadge();
        }
    }
});