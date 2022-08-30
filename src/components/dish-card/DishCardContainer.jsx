import { useDishes } from "context";
import { DishCard } from "./DishCard";
import { DishCardActions } from "./DishCardActions";

function DishCardContainer() {
  const { getDishes, getActiveTab } = useDishes();
  const dishes = getDishes();
  const activeTab = getActiveTab();
  return (
    <div className="cards">
      {dishes.map((dish) => (
        <DishCard key={dish.id} {...dish}>
          {activeTab === "dishes" ? (
            <DishCardActions {...dish} />
          ) : null}
        </DishCard>
      ))}
    </div>
  );
}

export { DishCardContainer };
