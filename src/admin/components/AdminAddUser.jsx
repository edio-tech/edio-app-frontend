import * as Form from "@radix-ui/react-form";
import { BeatLoader } from "react-spinners";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import Cookies from "js-cookie";

import usersAPI from "api_link/users";
import useLogContext from "hooks/useLogContext";
import useAuth from "hooks/useAuth";

import "styles/pages/login.css";

const AdminAddUser = ({ setHash, setRefetch }) => {
  const { development } = useLogContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setProfilePic(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.append("email_verified", false);
    formData.append("accepted_terms", false);
    console.log("formData", formData);

    if (profilePic) {
      formData.append("profile_pic", profilePic);
    }

    try {
      const res = await usersAPI.register(formData);

      if (res.status < 200 || res.status >= 300) {
        console.log("error result object:", res.data);
        if (development) {
          setErrors(res.data.detail);
        } else {
          setErrors("There was an error creating the User.");
        }
        return;
      }

      let user_content = res.data;
      if (development) {
        console.log("User Creation Successful", user_content);
      }
      setHash("");
      setRefetch(true);
    } catch (err) {
      console.log("Errors have been caught");
      console.log(err);
      setErrors(err.message);
      if (development) {
        console.log(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-container mrg">
      <div className="global-form">
        <Form.Root onSubmit={handleSubmit}>
          <div className="global-form-group">
            <Form.Field name="name">
              <Form.Label>Name</Form.Label>
              <Form.Control asChild>
                <input id="name" type="text" required />
              </Form.Control>
              <Form.Message match="valueMissing" className="error-message">
                Name is required
              </Form.Message>
            </Form.Field>
          </div>
          <div className="global-form-group">
            <Form.Field name="email">
              <Form.Label>Email</Form.Label>
              <Form.Control asChild>
                <input id="email" type="email" required />
              </Form.Control>
              <Form.Message match="valueMissing" className="error-message">
                Email is required
              </Form.Message>
              <Form.Message match="typeMismatch" className="error-message">
                Please enter a valid email address
              </Form.Message>
            </Form.Field>
          </div>
          <div className="global-form-group">
            <Form.Field name="password">
              <Form.Label>Password</Form.Label>
              <Form.Control asChild>
                <input id="password" type="password" required />
              </Form.Control>
              <Form.Message match="valueMissing" className="error-message">
                Password is required
              </Form.Message>
            </Form.Field>
          </div>
          <div className="global-form-group">
            <Form.Field name="role">
              <Form.Label>Role</Form.Label>
              <Form.Control asChild>
                <select id="role" required>
                  <option value="">Select a role</option>
                  <option value="CUSTOMER">CUSTOMER</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="CREATOR">CREATOR</option>
                </select>
              </Form.Control>
              <Form.Message match="valueMissing" className="error-message">
                Role selection is required
              </Form.Message>
            </Form.Field>
          </div>
          <div className="global-form-group">
            <Form.Field name="profile_pic">
              <Form.Label>Profile Picture</Form.Label>
              <div {...getRootProps()} className="dropzone" style={{ border: "2px dashed #cccccc", padding: "20px", textAlign: "center", cursor: "pointer" }}>
                <input {...getInputProps()} />
                {isDragActive ? <p>Drop the image here ...</p> : <p>Drag 'n' drop a profile picture here, or click to select a file</p>}
              </div>
              {profilePic && <p>Selected file: {profilePic.name}</p>}
            </Form.Field>
          </div>
          {errors && <div className="error-message">{errors}</div>}
          <div className="global-flex-form-button-container">
            <Form.Submit asChild>
              <button type="submit" className="global-form-submit-button">
                {loading ? <BeatLoader /> : "Submit"}
              </button>
            </Form.Submit>
          </div>
        </Form.Root>
      </div>
    </div>
  );
};

export default AdminAddUser;
