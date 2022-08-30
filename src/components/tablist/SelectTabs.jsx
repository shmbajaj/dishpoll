import { useDishes } from "context";
import { tabsData } from "./tablist.data";

function SelectTabs() {
  const { getActiveTab, updateActiveTab } = useDishes();
  const activeTab = getActiveTab();
  return (
    <select
      value={activeTab}
      className="selectDishes"
      onChange={(e) => updateActiveTab(e.target.value)}
    >
      {tabsData.map((tab) => (
        <option value={tab.tab} key={tab.text}>
          {tab.text}
        </option>
      ))}
    </select>
  );
}

export { SelectTabs };
