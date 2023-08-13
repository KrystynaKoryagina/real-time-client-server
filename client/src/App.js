import './App.css';
import { LongPolling } from './components/LongPolling';
import { EventSourceComponent } from './components/EventSource';
import { WebSocketComponent } from './components/WebSocket';

function App() {
  return (
    <div className="App">
      {/* <LongPolling /> */}
      {/* <EventSourceComponent /> */}
      <WebSocketComponent/>
    </div>
  );
}

export default App;
