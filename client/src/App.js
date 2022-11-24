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
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import ErrorPage from './components/ErrorPage';

function App() {
  return (
    <>
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/form" element={<Form/>}/>
          <Route path="/result" element={<Result/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="*" element={<ErrorPage errorCode="404" message="Page Not Found"/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
