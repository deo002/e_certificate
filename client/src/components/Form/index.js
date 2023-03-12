import {React, useState, useEffect} from 'react';
import './index.css';
import { useAuth } from '../../contexts/AuthContext';
import useMetaMask from '../../contexts/metamaskContext';
import Web3 from 'web3';
import Cert from '../contracts/Cert.json';

function Form() {

  const [contract, setContract] = useState();
  const { currentUser } = useAuth();
  const { connect, disconnect, isActive, account, shouldDisable } = useMetaMask()

  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
      const networkId = await web3.eth.net.getId();
      const contract = new web3.eth.Contract(Cert["abi"], Cert["networks"][networkId]["address"]);
      setContract(contract);
    }
    
    load();
  }, []);

  const [formValue, setFormValue] = useState({
    fname: "",
    lname: "",
    roll: "",
    yop: "",
    cgpa: "",
    dob:"",
    college: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const {fname,lname, roll, yop, cgpa,dob, college} = formValue;

  const handleSubmit = async(event)=> {
    event.preventDefault();
    try {
      const result = await contract.methods.createCertificate(fname, lname, yop, cgpa, roll).call({from: account});
      // const res = await contract.methods.showCertificate("BT19CSE014").call({from: account});
      console.log(result, 'Certificate added successfully.\n');
    }
    catch(e) {
      console.log(e);
    }
  }

  return (
   <>
    {currentUser.user.role === 'ADMIN' && 
      <div className="std-form">

<form className="align-items-center" onSubmit={handleSubmit}>
  <h1 className="h1class">Student registration</h1>
  <div className="row center">
    <div className="col-lg">
      <input type="text"  className="form-control" placeholder="First name" name='fname' value={fname} onChange={handleChange}/>
    </div>
    <div className="col-lg">
      <input type="text"   className="form-control" placeholder="Last name" name='lname' value={lname} onChange={handleChange}/>
    </div>
  </div>

  <div className="row">
    <div className="col-lg">
      <input type="text"   className="form-control" placeholder="Roll Number" name='roll' value={roll} onChange={handleChange}/>
    </div>
    <div className="col-lg">
      <input type="text"   className="form-control" placeholder="YOP" name='yop' value={yop} onChange={handleChange}/>
    </div>
  </div>

  <div className="row">
    <div className="col-lg">
      <input type="text"   className="form-control" placeholder="CGPA" name='cgpa' value={cgpa} onChange={handleChange} />
    </div>
    <div className="col-lg">
      <input type="text"   className="form-control" placeholder="DOB" name='dob' value={dob} onChange={handleChange} />
    </div>
  </div>

  <div className="row">
    <div className="col-lg">
      <input type="text"   className="form-control" placeholder="College" name='college' value={college} onChange={handleChange} />
    </div>
  </div>

  <input className="btn btn-secondary btn-lg submit" type="submit" value="Submit"/>

</form>

</div>

    }

    {currentUser.user.role !== 'ADMIN' && 
      <> 
        <h1>You are not authorized to view this page</h1>
        
      </>
    }
   </>
  )
}

export default Form