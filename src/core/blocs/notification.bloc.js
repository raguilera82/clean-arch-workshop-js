import { BaseBloc } from "./base.bloc.js";

export class NotificationBloc extends BaseBloc {
  static instance = null;

  /**
   *
   * @param {String} stateName
   */
  constructor(stateName) {
    super(stateName);

    if (NotificationBloc.instance) {
      return NotificationBloc.instance;
    }

    NotificationBloc.instance = this;
  }

  static getInstance() {
    if (!NotificationBloc.instance) {
      NotificationBloc.instance = new NotificationBloc("notification_state");
    }
    return NotificationBloc.instance;
  }

  /**
   *
   * @param {String} notification
   */
  setNotification(notification) {
    this.setState({ notification });
  }
}
