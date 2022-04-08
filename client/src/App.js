import { Session } from "./util/Auth0";
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Session />
      </header>
    </div>
  );
}

export default App;