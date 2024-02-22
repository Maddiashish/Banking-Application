//import logo from './logo.svg';
import './App.css';
import CRUD2 from './CRUD2';
import CRUD3 from './CRUD3';
import FormPage from './FormPage';
import DataForm from './DataForm';
import ReactDOM from 'react-dom'
function App() {
  const ACD =() => {
    ReactDOM.render(<App />,document.getElementById('root'))
}
const SCD =() => {
  ReactDOM.render(<DataForm />,document.getElementById('root'))
}
const AT =() => {
  ReactDOM.render(<CRUD2 />,document.getElementById('root'))
}
const PO =() => {
  ReactDOM.render(<CRUD3 />,document.getElementById('root'))
}
  return (    
    <div className="App">
      {/* <nav class="navbar navbar-dark bg-dark">
            <button onClick={ACD}>Add Customer Details</button>
            <button onClick={SCD}>Show Customer Details</button>
            <button onClick={AT}>Account Type</button>
            <button onClick={PO}>Points</button>
            </nav> */}
      <h1 className="text-center text-danger text-capitalize my-5">
                {" "}
                Bank Application{" "}
      </h1>
    <h2>
      Customer Masters
    </h2>
    
    <FormPage />
    
    <div id="root">

    </div>
    {/* <CRUD/> */}
    </div>
  );
}

export default App;