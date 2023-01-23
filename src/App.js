import './App.css';
import CurrentLocationInfo from './components/CurrentLocationInfo';
import Forecast from './components/Forecast';

function App() {
  return (
    <div className="App">
      <div className="weather-app">
        <CurrentLocationInfo />
      </div>
    </div>
  );
}

export default App;