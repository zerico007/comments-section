/* eslint-disable jsx-a11y/anchor-is-valid */
import { Comments, AddComment } from "./components";
import { useAppSelector } from "./redux/hooks";

function App() {
  const { username } = useAppSelector((state) => state.state.currentUser);

  return (
    <div className="App">
      <Comments />
      <AddComment username={username} />
      <div className="attribution">
        Challenge by
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Mentor
        </a>
        . Coded by <a href="#">Bavin Edwards</a>.
      </div>
    </div>
  );
}

export default App;
