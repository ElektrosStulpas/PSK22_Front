import React, { useEffect, useState } from "react";
import axios from 'axios';
import authHeader from "../services/auth-header";
import AuthService from "../services/auth.service";
import { Form, Button } from "react-bootstrap";

const API_URL = 'https://gariunaicloud.azurewebsites.net/api/Users/';

const Profile = () => {

  const [editing, setEditing] = useState(true);
  const [initialState, setInitialState] = useState(
    {
      userName: "",
      email: "",
      password: "",
      phoneNumber: "",
    }
  )

  async function getProfileData() {
    axios.get(API_URL + "me", { headers: authHeader() }).then(response => setInitialState(response.data))
  }


  useEffect(() => { getProfileData(); }, [])

  function SetEditing() {
      setEditing(!editing)
  }

  function updateUserData(formData){
    if (editing === false) {
      var iWantToSendPost = {
        email: formData.email.value,
        phoneNumber: formData.phoneNumber.value,
      }
      axios.post(API_URL + "me", iWantToSendPost, { headers: authHeader() });
    }
  }


  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{initialState.userName}</strong> profile
        </h3>
      </header>
      <Form onSubmit={e => {e.preventDefault(); updateUserData(e.target); SetEditing()}}>
        <fieldset disabled={editing}>
          <Form.Group>
            <Form.Label>Your email:</Form.Label>
            <Form.Control type="text" id="email" name="email" defaultValue={initialState.email} required minLength="4" maxLength="40" size="40"></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Your phone number:</Form.Label>
            <Form.Control type="text" id="phoneNumber" name="phoneNumber" defaultValue={initialState.phoneNumber} required minLength="4" maxLength="40" size="40"></Form.Control>
          </Form.Group>
        </fieldset>
        <Button type="submit"> {editing ? "Edit your profile" : "Save"}</Button>
      </Form>
    </div>
  );
};
export default Profile;