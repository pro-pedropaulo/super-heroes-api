export interface INotificationFirebase {
  sendNotificationUser(
    title: string,
    body: unknown,
    type: string,
    userAccessToken: string,
  ): void;
}
