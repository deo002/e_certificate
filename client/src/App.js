import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home';
import Form from './components/Form';
import Result from "./components/Result";

function App() {
  return (
    <>
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/form" element={<Form/>}/>
        <Route path="/result" element={<Result/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
