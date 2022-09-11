import { Button, DeleteButton, EditButton, ReplyButton } from "./components";

function App() {
  return (
    <div className="App">
      <Button theme="primary" content="send" />
      <ReplyButton />
      <EditButton />
      <DeleteButton />
    </div>
  );
}

export default App;
