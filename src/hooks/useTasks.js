import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "task-dashboard-tasks";

export function useTasks() {
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const pendingCount = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  const completedCount = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  useEffect(() => {
    document.title = `Tasks (${pendingCount} pending) | TaskFlow`;

    return () => {
      document.title = "TaskFlow";
    };
  }, [pendingCount]);

  const addTask = useCallback((taskData) => {
    const newTask = {
      ...taskData,
      id: crypto.randomUUID(),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setTasks((previous) => [newTask, ...previous]);
    return newTask;
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((previous) => previous.filter((task) => task.id !== id));
  }, []);

  const toggleTask = useCallback((id) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === "completed" ? "pending" : "completed",
            }
          : task
      )
    );
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;

      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesStatus && matchesPriority && matchesSearch;
    });
  }, [tasks, statusFilter, priorityFilter, search]);

  return {
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
  };
}