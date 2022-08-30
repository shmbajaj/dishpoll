import "./dish-card.styles.css";

function DishCard({
  dishName,
  image,
  description,
  isAlreadyVoted,
  children,
}) {
  return (
    <article
      className={`card ${isAlreadyVoted ? "selected" : ""}`}
    >
      <header>
        <h2 className="card-title">{dishName}</h2>
      </header>
      <img
        src={image}
        alt={dishName}
        className="card-image"
      />
      <div className="card-content">
        <p>{description}</p>
      </div>
      {children}
    </article>
  );
}

export { DishCard };
