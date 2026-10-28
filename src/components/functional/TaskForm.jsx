import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import CardWrapper from "./CardWrapper";

export default function TaskForm({ onAddTask }) {
  const inputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      inputRef.current?.focus();
      return;
    }

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      priority,
    });

    setTitle("");
    setDescription("");
    setPriority("medium");

    inputRef.current?.focus();
  }

  return (
    <CardWrapper
      title="Create a task"
      subtitle="Add something you want to accomplish."
    >
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="task-title">Task title *</label>
          <input
            ref={inputRef}
            id="task-title"
            type="text"
            placeholder="e.g. Complete React assignment"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={100}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-description">Description</label>
          <textarea
            id="task-description"
            placeholder="Add some details..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={3}
            maxLength={500}
          />
        </div>

        <div className="form-footer">
          <div className="form-group priority-select">
            <label htmlFor="task-priority">Priority</label>
            <select
              id="task-priority"
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <button type="submit" className="primary-button">
            <Plus size={18} />
            Add task
          </button>
        </div>
      </form>
    </CardWrapper>
  );
}