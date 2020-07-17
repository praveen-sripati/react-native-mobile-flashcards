import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'udacinotifications';

export const clearLocalNotification = async () => {
  return await AsyncStorage.removeItem(NOTIFICATION_KEY, () =>
    Notifications.cancelAllScheduledNotificationsAsync()
  );
};

export const setLocalNotification = async () => {
  const notificationStatus = await AsyncStorage.getItem(NOTIFICATION_KEY);
  if (notificationStatus === null) {
    console.log('in permissions');
    const { status, permissions } = await Permissions.askAsync(
      Permissions.NOTIFICATIONS
    );
    console.log(status);
    if (status === 'granted') {
      Notifications.cancelAllScheduledNotificationsAsync();

      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(2);
      tomorrow.setMinutes(30);

      Notifications.scheduleLocalNotificationAsync(createNotification(), {
        time: tomorrow,
        repeat: 'day'
      })

      AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
    }
  }
};

export const createNotification = () => {
  return {
    title: "It's Quiz time!",
    body: "👋 don't forget play quiz for today!",
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    },
  };
};
