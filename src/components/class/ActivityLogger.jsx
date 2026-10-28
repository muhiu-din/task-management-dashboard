import { Component } from "react";
import { Activity, CheckCircle2, Plus, Trash2, Filter } from "lucide-react";

const LOG_KEY = "task-dashboard-logs";

export default class ActivityLogger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: [],
      notification: "",
    };

    this.notificationTimer = null;
  }

  componentDidMount() {
    try {
      const savedLogs = JSON.parse(localStorage.getItem(LOG_KEY)) || [];
      this.setState({ logs: savedLogs });
    } catch {
      this.setState({ logs: [] });
    }

    // Demonstrates cleanup of a global browser event listener.
    window.addEventListener("beforeunload", this.handleBeforeUnload);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.logs !== this.state.logs) {
      localStorage.setItem(LOG_KEY, JSON.stringify(this.state.logs));
    }

    if (prevProps.event !== this.props.event && this.props.event) {
      const { type, message } = this.props.event;

      const newLog = {
        id: crypto.randomUUID(),
        type,
        message,
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
      };

      this.setState((previous) => ({
        logs: [newLog, ...previous.logs].slice(0, 50),
        notification: message,
      }));
    }

    if (prevState.notification !== this.state.notification &&
        this.state.notification) {
      clearTimeout(this.notificationTimer);

      this.notificationTimer = setTimeout(() => {
        this.setState({ notification: "" });
      }, 2500);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.notificationTimer);
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
  }

  handleBeforeUnload = () => {
    localStorage.setItem(LOG_KEY, JSON.stringify(this.state.logs));
  };

  getIcon(type) {
    if (type === "added") return <Plus size={15} />;
    if (type === "deleted") return <Trash2 size={15} />;
    if (type === "completed") return <CheckCircle2 size={15} />;
    if (type === "filter") return <Filter size={15} />;

    return <Activity size={15} />;
  }

  render() {
    const { logs, notification } = this.state;

    return (
      <section className="activity-panel">
        <div className="activity-heading">
          <div className="activity-heading-icon">
            <Activity size={19} />
          </div>

          <div>
            <h2>Activity log</h2>
            <p>Recent actions in your workspace</p>
          </div>

          <span className="log-count">{logs.length}</span>
        </div>

        {notification && (
          <div className="toast" role="status">
            <CheckCircle2 size={17} />
            {notification}
          </div>
        )}

        {logs.length === 0 ? (
          <div className="activity-empty">
            Your activity will appear here.
          </div>
        ) : (
          <div className="activity-list">
            {logs.map((log) => (
              <div className="activity-item" key={log.id}>
                <div className={`activity-icon ${log.type}`}>
                  {this.getIcon(log.type)}
                </div>

                <div className="activity-message">
                  <p>{log.message}</p>
                  <span>{log.date} · {log.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }
}