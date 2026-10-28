import { ListTodo } from "lucide-react";
import CardWrapper from "./CardWrapper";
import TaskCard from "./TaskCard";

export default function TaskList({
  tasks,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  onToggle,
  onDelete,
}) {
  return (
    <CardWrapper
      title="Your tasks"
      subtitle={`${tasks.length} task${tasks.length !== 1 ? "s" : ""} found`}
      className="task-list-wrapper"
    >
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="status-filter">Status</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="priority-filter">Priority</label>
          <select
            id="priority-filter"
            value={priorityFilter}
            onChange={(event) => setPriorityFilter(event.target.value)}
          >
            <option value="all">All priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <ListTodo size={42} strokeWidth={1.5} />
          <h3>No tasks found</h3>
          <p>Add a task or change your filters to see results.</p>
        </div>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </CardWrapper>
  );
}