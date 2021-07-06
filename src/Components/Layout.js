import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../mycss.css";
import { useForm } from "react-hook-form";
import {
  CountryDropdown,
  RegionDropdown,
} from "react-indian-state-region-selector";

//----start-----

function Layout(props) {
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
  });
  const [input, setinput] = useState({
    Fname: "",
    Lname: "",
    phoneNo: "",
    region: "",
    state: "",
  });
  const [editbtn, setEdit] = useState({ edit: "false", ind: "" });
  // const [items, setItems] = useState([]);

  const handleChange = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const selectState = (val) => {
    setinput({ ...input, state: val });
  };

  const selectRegion = (val) => {
    setinput({ ...input, region: val });
  };

  //-----Edit-----

  const Edit = (e) => {
    const index = e.target.name;
    setinput({
      Fname: props.formData[index].Fname,
      Lname: props.formData[index].Lname,
      phoneNo: props.formData[index].phoneNo,
    });
    setEdit({ ...editbtn, edit: "true", ind: index });
  };

  //-----Delete-----

  const Delete = (e) => {
    const index = e.target.name;
    console.log("deleteindex", index);
    const arrayAfterDeletion = props.formData.filter(
      (obj) => obj !== props.formData[index]
    );
    props.formDataHandler(arrayAfterDeletion);
  };

  //-----add--------

  const addItem = (value) => {
    if (props.formData.length === 0) {
      props.formDataHandler([input]);
    }

    if (editbtn.edit === "true") {
      setEdit({ ...editbtn, edit: "false" });
      props.formData[editbtn.ind] = input;
    }

    if (editbtn.edit === "false") {
      props.formData &&
        props.formData.map((obj) => {
          if (obj.Fname !== input.Fname && obj.phoneNo !== input.phoneNo) {
            props.formDataHandler([...props.formData, input]);
          }
        });
    }
    if (input.Fname !== "" && input.Lname !== "" && input.phoneNo !== "") {
      setinput({ Fname: "", Lname: "", phoneNo: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit(addItem)} className="form ">
      {/*---- input types----- */}

      <div className="input">
        <label>Fname</label>
        <input
          type="text"
          name="Fname"
          value={input.Fname}
          onChange={handleChange}
          ref={register({ required: true, minLength: 2 })}
        />
        {errors.Fname && (
          <div className="errors"> *Minimum 2 char required </div>
        )}
      </div>

      <div className="input">
        <label>Lname</label>
        <input
          type="text"
          name="Lname"
          value={input.Lname}
          onChange={handleChange}
          ref={register({ required: true, minLength: 2 })}
        />
        {errors.Lname && <div className="errors">*Minimum 2 char required</div>}
      </div>

      <div className="input">
        <label>phoneNo</label>
        <input
          type="number"
          name="phoneNo"
          value={input.phoneNo}
          onChange={handleChange}
          ref={register({
            required: "phone no is required",
            maxLength:10,
            minLength:10
          })}
        />
        {errors.phoneNo &&  <div className="errors">*Minimum 10 numbers are required</div> }
      </div>
      <div className="input">
        <label>select country</label>
        <br />
        <CountryDropdown
          className="countryoptions"
          defaultOptionLabel="Select a country."
          value={input.state}
          onChange={selectState}
        />
      </div>

      <div className="input">
        <label>select state</label>
        <br />
        <RegionDropdown
          className="stateoptions"
          country={input.state}
          value={input.region}
          onChange={selectRegion}
          defaultOptionLabel="select region"
          blankOptionLabel="select region"
        />
      </div>

      <label>submit</label>
      <input type="submit" className="submit" />

      <table>
        <thead>
          <tr>
            <th className="col">Fname</th>
            <th className="col">Lname</th>
            <th className="col">phoneNo</th>
            <th className="col">state</th>
            <th className="col">Region</th>
            <th className="col">Edit</th>
            <th className="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.formData &&
            props.formData.map((obj, index) => (
              <tr className="row" key={uuidv4()}>
                <td className="col" key={uuidv4()}>
                  {obj.Fname}
                </td>
                <td className="col" key={uuidv4()}>
                  {obj.Lname}
                </td>
                <td className="col" key={uuidv4()}>
                  {obj.phoneNo}
                </td>
                <td className="col" key={uuidv4()}>
                  {obj.state}
                </td>
                <td className="col" key={uuidv4()}>
                  {obj.region}
                </td>
                <td className="col" key={uuidv4()}>
                  <input
                    type="button"
                    name={index}
                    value="Edit"
                    onClick={Edit}
                  />
                </td>
                <td className="col" key={uuidv4()}>
                  <input
                    type="button"
                    name={index}
                    value="Delete"
                    onClick={Delete}
                  />
                </td>
              </tr>
              ))}
          </tbody>
      </table>
    </form>
  );
}

export default Layout;
