import { BaseBloc } from "./base.bloc.js";

/**
 * @typedef {Object} NotificationState
 * @property {String} notification
 */
class NotificationBloc extends BaseBloc {
  /**
   *
   * @param {String} stateName
   */
  constructor(stateName) {
    super(stateName);
    this.setNotification("Works!");
  }

  /**
   *
   * @param {String} notification
   */
  setNotification(notification) {
    this.setState({ notification });
    setTimeout(() => {
      this.setState({ notification: "" });
    }, 3000);
  }
}

const notificationBlocInstance = new NotificationBloc("notification_state");
export default notificationBlocInstance;
