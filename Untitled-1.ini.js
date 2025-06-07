// service-worker.js
// יבוא את הסקריפטים של Firebase SDK for Service Workers
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');

// הגדר את ה-Firebase Config שלך כאן (חובה שיהיה זהה לזה שב-index.html)
const firebaseConfig = {
    apiKey: "AIzaSyBOhNtz9ja7_YcV9Djg53fDcd51jV-MLW0",
    authDomain: "school-tasks-d9f53.firebaseapp.com",
    projectId: "school-tasks-d9f53",
    storageBucket: "school-tasks-d9f53.firebasestorage.app",
    messagingSenderId: "349723543792",
    appId: "1:349723543792:web:eafdebcb5df5b1f3f41a35"
};

// אתחל את Firebase בתוך ה-Service Worker
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// טיפול בהודעות Push כשהאפליקציה לא ב-Focus
messaging.onBackgroundMessage((payload) => {
    console.log('[service-worker.js] Received background message ', payload);
    // התאמה אישית של ההתראה
    const notificationTitle = payload.notification.title || 'מטלה חדשה!';
    const notificationOptions = {
        body: payload.notification.body || 'יש לך מטלה לביצוע.',
        icon: '/path/to/your/icon.png', // החלף בנתיב לאייקון האמיתי שלך
                                      // לדוגמה: '/images/app-icon.png' או favicon
        data: payload.data // העבר נתונים מותאמים אישית
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// טיפול בלחיצה על התראה (אופציונלי)
self.addEventListener('notificationclick', (event) => {
    console.log('[service-worker.js] Notification click received.', event);
    event.notification.close(); // סגור את ההתראה

    // לדוגמה, פתח את האתר בלחיצה על ההתראה
    event.waitUntil(
        clients.openWindow('index.html') // החלף בכתובת האתר שלך (לדוגמה: 'https://your-firebase-app.web.app/index.html')
    );
});
