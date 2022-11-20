import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

function Form() {
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

  const handleSubmit= (event)=> {
    event.preventDefault();
    const student=fname+lname+roll+yop+cgpa+dob+college;
    console.log(student);
    navigate("/result")
  }

  return (
    <div className="std-form">

      <form className="align-items-center" onSubmit={handleSubmit}>
        <h1 className="h1class">Student registration</h1>
        <div className="row center">
          <div className="col-lg">
            <input type="text" required="true" className="form-control" placeholder="First name" name='fname' value={fname} onChange={handleChange}/>
          </div>
          <div className="col-lg">
            <input type="text"  required="true" className="form-control" placeholder="Last name" name='lname' value={lname} onChange={handleChange}/>
          </div>
        </div>

        <div className="row">
          <div className="col-lg">
            <input type="text"  required="true" className="form-control" placeholder="Roll Number" name='roll' value={roll} onChange={handleChange}/>
          </div>
          <div className="col-lg">
            <input type="text"  required="true" className="form-control" placeholder="YOP" name='yop' value={yop} onChange={handleChange}/>
          </div>
        </div>

        <div className="row">
          <div className="col-lg">
            <input type="text"  required="true" className="form-control" placeholder="CGPA" name='cgpa' value={cgpa} onChange={handleChange} />
          </div>
          <div className="col-lg">
            <input type="text"  required="true" className="form-control" placeholder="DOB" name='dob' value={dob} onChange={handleChange} />
          </div>
        </div>

        <div className="row">
          <div className="col-lg">
            <input type="text"  required="true" className="form-control" placeholder="College" name='college' value={college} onChange={handleChange} />
          </div>
        </div>

        <input className="btn btn-secondary btn-lg submit" type="submit" value="Submit"/>

      </form>

    </div>
  )
}

export default Form