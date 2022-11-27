import {React ,useEffect,useState} from 'react';
import { useNavigate  } from 'react-router-dom';
import crypto from "crypto-js";
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import { loadContract } from "../../utils/load-contract";
import './index.css';

let contractFinal;
const admin=true;


function Form() {

  const[web3Api, setWeb3Api]= useState({
    provider:null,
    web3:null,
    contract:null,
  });

  const[account,setAccount]= useState(null);

  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    fname: "",
    lname: "",
    roll: "",
    yop: "",
    cgpa: "",
    dob:"",
    college: "",
  });

  useEffect(() => {
    const loadProvider= async() =>{

      const provider = await detectEthereumProvider();
       const contract = await loadContract("Cert", provider);
        contractFinal=contract;
       //console.log(contract);

      if (provider) {
          provider.request({ method: "eth_requestAccounts"});
        setWeb3Api({
          web3:new Web3(provider),
          provider,
        });
      }
      
      else 
      {
          console.error('Please install MetaMask!');
      }
    };
    loadProvider();
  }, []);

  useEffect(()=>{
    const {contract, web3}=web3Api;
  })

  useEffect(() => {
    const getAccount = async() =>{
      const account=await web3Api.web3.eth.getAccounts();

      setAccount(account[0]);
    }
    web3Api.web3 && getAccount();

  }, [web3Api.web3])
  

  const handleChange = (event) => {
    // console.log(web3Api.web3);
    const { name, value } = event.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const {fname,lname, roll, yop, cgpa,dob, college} = formValue;

  const handleSubmit= async(event)=> {
    event.preventDefault();
    const student=fname+lname+roll+yop+cgpa+college;

    const hash = await crypto.SHA256(fname).toString();

        //const {contract, web3}=web3Api;
        //console.log(contractFinal);

         const result=await contractFinal.get(hash,{
          from:account
        });

        console.log(result);

        if(result){
          console.log("Yes correct");
        }
        else{
           await contractFinal.set(hash,fname,roll,lname,{
              from:account
            });

            navigate("/result")
        }
   
    
  }

  return (
   <>
    {admin==true && 
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

    {admin==false && 
      <> 
      <h1>You are not authenticated to view this page</h1></>
    }
   </>
  )
}

export default Form