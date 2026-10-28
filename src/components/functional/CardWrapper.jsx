export default function CardWrapper({
  title,
  subtitle,
  children,
  className = "",
}) {
  return (
    <section className={`card-wrapper ${className}`}>
      {title && (
        <div className="card-heading">
          <div>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
        </div>
      )}

      <div className="card-content">{children}</div>
    </section>
  );
}