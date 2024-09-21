import React, { useState } from "react";
import formCheckMark from "../SVGs/formCheckMark.svg";
import "./AddAgentPopup.css";
import addFile from "../SVGs/addFile.svg";
import removeIcon from "../SVGs/removeImage.svg";

const AddAgentPopup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    file: null,
  });
  const [errors, setErrors] = useState({});
  const API_TOKEN = process.env.REACT_APP_API_TOKEN;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, file });
    }
  };

  const handleRemoveFile = () => {
    setFormData({ ...formData, file: null }); // Reset the file
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    if (name === "firstName") {
      if (!value || value.length < 2) {
        newErrors.firstName = true;
      } else {
        delete newErrors.firstName;
      }
    }

    if (name === "lastName") {
      if (value && value.length < 2) {
        newErrors.lastName = true;
      } else {
        delete newErrors.lastName;
      }
    }

    if (name === "email") {
      if (!value || !value.endsWith("@redberry.ge")) {
        newErrors.email = true;
      } else {
        delete newErrors.email;
      }
    }

    if (name === "telephone") {
      const phoneRegex = /^5\d{8}$/;
      if (!value || !phoneRegex.test(value)) {
        newErrors.telephone = true;
      } else {
        delete newErrors.telephone;
      }
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};
    const { firstName, lastName, email, telephone, file } = formData;

    if (!firstName || firstName.length < 2) {
      newErrors.firstName = true;
    }
    if (lastName && lastName.length < 2) {
      newErrors.lastName = true;
    }
    if (!email || !email.endsWith("@redberry.ge")) {
      newErrors.email = true;
    }
    const phoneRegex = /^5\d{8}$/;
    if (!telephone || !phoneRegex.test(telephone)) {
      newErrors.telephone = true;
    }
    if (!file) {
      newErrors.file = true;
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.firstName);
      formDataToSend.append("surname", formData.lastName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.telephone);
      formDataToSend.append("avatar", formData.file);
      console.log([...formDataToSend]);

      fetch(
        "https://api.real-estate-manager.redberryinternship.ge/api/agents",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            
          },
          body: formDataToSend,
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();
        })
        .then((text) => {
          console.log("Response:", text);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="AddAgentModalOverlay">
      <div className="AddAgentModalDiv">
        <span className="modalHeader">აგენტის დამატება</span>
        <div className="AgentFormDiv">
          <div className="formLine">
            <div className="form-group">
              <label
                className={`agentFormInputLabel ${
                  errors.firstName ? "errorLabel" : ""
                }`}
                htmlFor="firstName"
              >
                სახელი *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className={`formInput ${errors.firstName ? "errorInput" : ""}`}
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <div
                className={`validationHint ${
                  errors.firstName ? "errorHint" : ""
                }`}
              >
                {!errors.firstName && (
                  <img src={formCheckMark} alt="Checkmark" />
                )}
                <span>მინიმუმ ორი სიმბოლო</span>
              </div>
            </div>
            <div className="form-group">
              <label
                className={`agentFormInputLabel ${
                  errors.lastName ? "errorLabel" : ""
                }`}
                htmlFor="lastName"
              >
                გვარი
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className={`formInput ${errors.lastName ? "errorInput" : ""}`}
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <div
                className={`validationHint ${
                  errors.lastName ? "errorHint" : ""
                }`}
              >
                {!errors.lastName && (
                  <img src={formCheckMark} alt="Checkmark" />
                )}
                <span>მინიმუმ ორი სიმბოლო</span>
              </div>
            </div>
          </div>
          <div className="formLine">
            <div className="form-group">
              <label
                className={`agentFormInputLabel ${
                  errors.email ? "errorLabel" : ""
                }`}
                htmlFor="email"
              >
                ელ-ფოსტა*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`formInput ${errors.email ? "errorInput" : ""}`}
                value={formData.email}
                onChange={handleChange}
                required
              />
              <div
                className={`validationHint ${errors.email ? "errorHint" : ""}`}
              >
                {!errors.email && <img src={formCheckMark} alt="Checkmark" />}
                <span>გამოიყენეთ @redberry.ge ფოსტა</span>
              </div>
            </div>
            <div className="form-group">
              <label
                className={`agentFormInputLabel ${
                  errors.telephone ? "errorLabel" : ""
                }`}
                htmlFor="telephone"
              >
                ტელეფონის ნომერი
              </label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                className={`formInput ${errors.telephone ? "errorInput" : ""}`}
                value={formData.telephone}
                onChange={handleChange}
                required
              />
              <div
                className={`validationHint ${
                  errors.telephone ? "errorHint" : ""
                }`}
              >
                {!errors.telephone && (
                  <img src={formCheckMark} alt="Checkmark" />
                )}
                <span>მხოლოდ რიცხვები (5XXXXXXXX)</span>
              </div>
            </div>
          </div>
          <div className="agentImageUploadDiv">
            <label className="agentImageUploadLabel" htmlFor="file">
              ატვირთეთ ფოტო *
            </label>
            <div
              className="agentImageInputForm"
              onClick={() => document.querySelector(".agentImageInput").click()}
            >
              <input
                className="agentImageInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
              {!formData.file ? (
                <img src={addFile} alt="Add File" />
              ) : (
                <div className="uploadedImage">
                  <img
                    src={URL.createObjectURL(formData.file)}
                    alt="Uploaded"
                    style={{ width: "92px", height: "82px" }}
                  />
                  <img
                    className="removeImageIcon"
                    src={removeIcon}
                    alt="Remove"
                    onClick={handleRemoveFile}
                  />
                </div>
              )}
              {errors.file && <span className="error">{errors.file}</span>}
            </div>
          </div>
        </div>
        <div className="agentModalButtonsDiv">
          <button className="modalButton cancelAgent">გაუქმება</button>
          <button className="modalButton addAgent" onClick={handleSubmit}>
            დაამატე აგენტი
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAgentPopup;
