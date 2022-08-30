import { useDishes } from "context";
import { tabsData } from "./tablist.data";
import { Button } from "../button/Button";

function ListTabs() {
  const { getActiveTab, updateActiveTab } = useDishes();
  const activeTab = getActiveTab();
  return (
    <ul role="tablist" className="listDishes">
      {tabsData.map((tab) => (
        <li role="tab" key={tab.text} className="dish-tab">
          <Button
            onClick={() => updateActiveTab(tab.tab)}
            className={`tab-button ${
              activeTab === tab.tab ? "active" : ""
            }`}
            text={tab.text}
          />
        </li>
      ))}
    </ul>
  );
}

export { ListTabs };
