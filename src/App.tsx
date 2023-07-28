import logo from "./logo.svg";
import "./App.css";

function App() {
  const requestPermissions = () => {
    if (typeof Notification !== "undefined") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        }
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <button onClick={requestPermissions}>Request permissions</button>
      </header>
    </div>
  );
}

export default App;
