import { useUser } from "context";
import { useApp } from "hooks";
import { SelectTabs, ListTabs } from "../tablist";
import { Button } from "../button/Button";
import "./header.styles.css";

function Header() {
  const { getUserInfo } = useUser();
  const { logoutHandler } = useApp();

  return (
    <header className="at-top">
      <div className="flex-end">
        <span className="username">
          {getUserInfo("username")}
        </span>
        <Button
          text={"Logout"}
          onClick={() => logoutHandler()}
          className="logout"
        />
      </div>
      <SelectTabs />
      <ListTabs />
    </header>
  );
}

export { Header };
