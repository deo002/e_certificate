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

  const handleSubmit = async (event)=> {
    event.preventDefault();
    const URL = 'http://localhost:5000/admin/student';
    const token = '';
    const options = {
      method: "POST",
      headers: {
        "Accept" : "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "Auhtorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        fname,
        lname,
        roll,
        yop,
        cgpa,
        college
      })
    };
    const result = await fetch(URL, options);
    console.log(fname, lname, roll, yop, cgpa, college);
    console.log(result);
    navigate("/result")
  }

  return (
    <div class="std-form">

      <form class="align-items-center" onSubmit={handleSubmit}>
        <h1 class="h1class">Student registration</h1>
        <div class="row center">
          <div class="col-lg">
            <input type="text" required="true" class="form-control" placeholder="First name" name='fname' value={fname} onChange={handleChange}/>
          </div>
          <div class="col-lg">
            <input type="text"  required="true" class="form-control" placeholder="Last name" name='lname' value={lname} onChange={handleChange}/>
          </div>
        </div>

        <div class="row">
          <div class="col-lg">
            <input type="text"  required="true" class="form-control" placeholder="Roll Number" name='roll' value={roll} onChange={handleChange}/>
          </div>
          <div class="col-lg">
            <input type="text"  required="true" class="form-control" placeholder="YOP" name='yop' value={yop} onChange={handleChange}/>
          </div>
        </div>

        <div class="row">
          <div class="col-lg">
            <input type="text"  required="true" class="form-control" placeholder="CGPA" name='cgpa' value={cgpa} onChange={handleChange} />
          </div>
          <div class="col-lg">
            <input type="text"  required="true" class="form-control" placeholder="DOB" name='dob' value={dob} onChange={handleChange} />
          </div>
        </div>

        <div class="row">
          <div class="col-lg">
            <input type="text"  required="true" class="form-control" placeholder="College" name='college' value={college} onChange={handleChange} />
          </div>
        </div>

        <input class="btn btn-secondary btn-lg submit" type="submit" value="Submit"/>

      </form>

    </div>
  )
}

export default Form