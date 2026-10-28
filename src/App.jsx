import { useCallback, useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { useTasks } from "./hooks/useTasks";

import Header from "./components/functional/Header";
import TaskForm from "./components/functional/TaskForm";
import TaskList from "./components/functional/TaskList";
import MetricsSummary from "./components/functional/MetricsSummary";
import ActivityLogger from "./components/class/ActivityLogger";

function Dashboard() {
  const {
    tasks,
    filteredTasks,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    search,
    setSearch,
    pendingCount,
    completedCount,
    addTask,
    deleteTask,
    toggleTask,
  } = useTasks();

  const [activityEvent, setActivityEvent] = useState(null);

  const logActivity = useCallback((type, message) => {
    setActivityEvent({
      id: crypto.randomUUID(),
      type,
      message,
    });
  }, []);

  const handleAddTask = useCallback(
    (taskData) => {
      const task = addTask(taskData);
      logActivity("added", `Created task: ${task.title}`);
    },
    [addTask, logActivity]
  );

  const handleDeleteTask = useCallback(
    (id) => {
      const task = tasks.find((item) => item.id === id);
      if (!task) return;

      deleteTask(id);
      logActivity("deleted", `Deleted task: ${task.title}`);
    },
    [tasks, deleteTask, logActivity]
  );

  const handleToggleTask = useCallback(
    (id) => {
      const task = tasks.find((item) => item.id === id);
      if (!task) return;

      toggleTask(id);

      const nextStatus =
        task.status === "completed" ? "pending" : "completed";

      logActivity(
        nextStatus === "completed" ? "completed" : "updated",
        `${nextStatus === "completed" ? "Completed" : "Reopened"} task: ${task.title}`
      );
    },
    [tasks, toggleTask, logActivity]
  );

  const handleStatusFilter = useCallback(
    (value) => {
      setStatusFilter(value);
      logActivity("filter", `Changed status filter to: ${value}`);
    },
    [setStatusFilter, logActivity]
  );

  const handlePriorityFilter = useCallback(
    (value) => {
      setPriorityFilter(value);
      logActivity("filter", `Changed priority filter to: ${value}`);
    },
    [setPriorityFilter, logActivity]
  );

  return (
    <div className="app-shell">
      <Header search={search} setSearch={setSearch} />

      <main className="dashboard">
        <section className="welcome-section">
          <div>
            <p className="eyebrow">YOUR WORKSPACE</p>
            <h2>Good work starts with a plan.</h2>
            <p className="welcome-description">
              Organize your priorities, track your progress, and get things done.
            </p>
          </div>

          <div className="welcome-badge">
            <span className="live-dot" />
            {pendingCount} tasks remaining
          </div>
        </section>

        <MetricsSummary tasks={tasks} />

        <div className="main-grid">
          <div className="primary-column">
            <TaskForm onAddTask={handleAddTask} />

            <TaskList
              tasks={filteredTasks}
              statusFilter={statusFilter}
              setStatusFilter={handleStatusFilter}
              priorityFilter={priorityFilter}
              setPriorityFilter={handlePriorityFilter}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          </div>

          <aside className="sidebar">
            <section className="progress-panel">
              <h2>Overall progress</h2>
              <p className="progress-number">
                {tasks.length ? Math.round(
                  (completedCount / tasks.length) * 100
                ) : 0}%
              </p>

              <div
                className="progress-track"
                role="progressbar"
                aria-valuenow={
                  tasks.length
                    ? Math.round((completedCount / tasks.length) * 100)
                    : 0
                }
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Task completion progress"
              >
                <div
                  className="progress-fill"
                  style={{
                    width: `${
                      tasks.length
                        ? (completedCount / tasks.length) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>

              <p className="progress-caption">
                {completedCount} of {tasks.length} tasks completed
              </p>

              {pendingCount === 0 && tasks.length > 0 && (
                <p className="success-message">
                  All tasks completed. Great work!
                </p>
              )}
            </section>

            <ActivityLogger event={activityEvent} />
          </aside>
        </div>

        <footer className="app-footer">
          <p>TaskFlow · React Component Architecture & State Management</p>
        </footer>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}