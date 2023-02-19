import './App.css';
import ContractsList from './features/contracts/ContractsList';
import Headline from './features/header/Headline';

function App() {
  return (
    <div className="App">
      <Headline/>
      <ContractsList/>
    </div>
  );
}

export default App;
