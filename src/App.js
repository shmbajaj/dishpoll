import { useUser, useDishes } from "context";
import {
  DishCardContainer,
  Header,
  Loader,
} from "components";
import { Login } from "container";

function App() {
  const { getUserInfo } = useUser();
  const { getStatus } = useDishes();
  const isUserLoggedIn = getUserInfo("isLoggedIn");
  const status = getStatus();

  return (
    <main className="App">
      {!isUserLoggedIn ? <Login /> : null}
      {isUserLoggedIn ? <Header /> : null}
      {isUserLoggedIn && status === "success" ? (
        <DishCardContainer />
      ) : null}
      {isUserLoggedIn && status === "loading" ? (
        <Loader />
      ) : null}
      {status === "failed" ? (
        <h2 style={{ color: "red" }}>
          Failed To Get Dishes.
        </h2>
      ) : null}
    </main>
  );
}

export default App;
