import admin from 'firebase-admin';

import { logger } from '../logger';

import { INotificationFirebase } from './IFirebase';
export class FirebaseNotification implements INotificationFirebase {
  serviceAccount = require('./firebase-private-key.json');

  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(this.serviceAccount),
      });
    }
  }

  sendNotificationUser(
    title: string,
    body: string,
    type: string,
    userAccessToken: string,
  ) {
    const payload = {
      data: {
        notification_foreground: 'true',
        title,
        body,
        tipo: type,
      },
      android: {
        priority: 'high' as const,
        notification: {
          channelId: 'avisasysChannel',
          sound: 'default',
          title,
          body,
        },
      },
      apns: {
        headers: {
          'apns-priority': '10',
        },
        payload: {
          aps: {
            contentAvailable: true,
            sound: 'default',
            alert: {
              title,
              body,
            },
          },
        },
      },
      token: userAccessToken,
    };

    admin
      .messaging()
      .send(payload)
      .then((response: unknown) => {
        logger.info('Notificate sent with success:', response);
      })
      .catch((error: unknown) => {
        logger.error('Error on send notification:', error);
      });
  }
}
