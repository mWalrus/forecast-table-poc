import './App.css';
import Table from './Table';
import { data } from './test-data';

function App() {
  return (
    <div className="app">
      <Table data={data}/>
    </div>
  );
}

export default App;
