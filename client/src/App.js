import './App.css';
import { LongPolling } from './components/LongPolling';
import { EventSourceComponent } from './components/EventSource';

function App() {
  return (
    <div className="App">
      {/* <LongPolling /> */}
      <EventSourceComponent />
      {/* <WebSocket/> */}
    </div>
  );
}

export default App;
