import { Check, Clock3, Trash2 } from "lucide-react";

export default function TaskCard({ task, onToggle, onDelete }) {
  const isCompleted = task.status === "completed";

  return (
    <article className={`task-card ${isCompleted ? "completed-task" : ""}`}>
      <button
        className={`task-check ${isCompleted ? "checked" : ""}`}
        onClick={() => onToggle(task.id)}
        aria-label={isCompleted ? "Mark as pending" : "Mark as completed"}
        title="Toggle completion"
      >
        {isCompleted && <Check size={16} />}
      </button>

      <div className="task-details">
        <div className="task-title-row">
          <h3>{task.title}</h3>

          <span className={`priority-badge ${task.priority}`}>
            {task.priority === "high" && "!"}
            {task.priority}
          </span>
        </div>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        <div className="task-meta">
          <span className={`status-label ${task.status}`}>
            {isCompleted ? <Check size={13} /> : <Clock3 size={13} />}
            {isCompleted ? "Completed" : "Pending"}
          </span>

          <span>
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <button
        className="delete-button"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete ${task.title}`}
        title="Delete task"
      >
        <Trash2 size={17} />
      </button>
    </article>
  );
}