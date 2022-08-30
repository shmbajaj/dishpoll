import { useUser } from "context";
import { buttonsData } from "./dishCard.data";
import { Button } from "../button/Button";

function DishCardActions({ id, rank, isAlreadyVoted }) {
  const { updateRanks } = useUser();
  return (
    <div className="card-actions">
      {buttonsData.map((button) => (
        <Button
          key={button.rank}
          className={`card-action ${
            isAlreadyVoted && rank === button.rank
              ? "active"
              : ""
          }`}
          onClick={() => updateRanks(button.rank, id)}
        >
          <span>{button.text}</span>
        </Button>
      ))}
    </div>
  );
}

export { DishCardActions };
