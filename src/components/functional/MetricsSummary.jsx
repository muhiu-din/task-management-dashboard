import { CheckCircle2, ListTodo, Target, Timer } from "lucide-react";
import CardWrapper from "./CardWrapper";

export default function MetricsSummary({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const pending = tasks.filter(
    (task) => task.status === "pending"
  ).length;
  const completionRate = total
    ? Math.round((completed / total) * 100)
    : 0;

  const metrics = [
    {
      label: "Total tasks",
      value: total,
      icon: ListTodo,
      color: "purple",
    },
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle2,
      color: "green",
    },
    {
      label: "Pending",
      value: pending,
      icon: Timer,
      color: "orange",
    },
    {
      label: "Completion rate",
      value: `${completionRate}%`,
      icon: Target,
      color: "blue",
    },
  ];

  return (
    <div className="metrics-grid">
      {metrics.map(({ label, value, icon: Icon, color }) => (
        <CardWrapper key={label} className="metric-card">
          <div className={`metric-icon ${color}`}>
            <Icon size={21} />
          </div>
          <p className="metric-label">{label}</p>
          <p className="metric-value">{value}</p>
        </CardWrapper>
      ))}
    </div>
  );
}