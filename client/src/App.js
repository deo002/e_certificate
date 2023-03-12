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
import Web3 from 'web3'
import { Web3ReactProvider } from '@web3-react/core'
import { MetaMaskProvider } from './contexts/metamaskContext'

function getLibrary(provider, connector) {
  return new Web3(provider)
}

function App() {
  return (
    <>
    <BrowserRouter>
      <AuthProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
          <MetaMaskProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/form" element={<Form/>}/>
              <Route path="/result" element={<Result/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="*" element={<ErrorPage errorCode="404" message="Page Not Found"/>}/>
            </Routes>
          </MetaMaskProvider>
        </Web3ReactProvider>
      </AuthProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
