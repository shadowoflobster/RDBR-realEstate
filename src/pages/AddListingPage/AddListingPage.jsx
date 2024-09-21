import React, { useState, useEffect } from "react";
import "./AddListingPage.css";
import "../../components/AddAgentPopup/AddAgentPopup.css";
import formCheckMark from "../../components/SVGs/formCheckMark.svg";
import RegionDropDown from "../../components/RegionDropDown/RegionDropDown";
import CityDropDown from "../../components/CityDropDown/CityDropDown";
import removeIcon from "../../components/SVGs/removeImage.svg";
import addFile from "../../components/SVGs/addFile.svg";
import AgentDropDown from "../../components/agentDropDown/agentDropDown";

const AddListingPage = () => {
  const API_TOKEN = process.env.REACT_APP_API_TOKEN;
  const [selectedOption, setSelectedOption] = useState("");
  const [listingFormInfo, setListingFormInfo] = useState({
    address: "",
    image: null,
    region_id: "",
    description: "",
    city_id: "",
    zip_code: "",
    price: "",
    area: "",
    bedrooms: "",
    is_rental: "",
    agent_id: "",
  });
  const [errors, setErrors] = useState({});
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetch("https://api.real-estate-manager.redberryinternship.ge/api/regions")
      .then((response) => response.json())
      .then((data) => {
        setRegions(data);
      })
      .catch((error) => {
        console.error("Error fetching regions:", error);
      });
  }, []);
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch(
          "https://api.real-estate-manager.redberryinternship.ge/api/agents",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setAgents(data);
        } else {
          console.error("Error fetching agents:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchAgents();
  }, [API_TOKEN]);

  useEffect(() => {
    if (listingFormInfo.region_id) {
      fetch(
        `https://api.real-estate-manager.redberryinternship.ge/api/cities?region_id=${listingFormInfo.region_id}`
      )
        .then((response) => response.json())
        .then((data) => {
          setCities(data);
        })
        .catch((error) => {
          console.error("Error fetching cities:", error);
        });
    }
  }, [listingFormInfo.region_id]);

  const handleRegionSelect = (region) => {
    setListingFormInfo({ ...listingFormInfo, region_id: parseInt(region.id) });
  };

  const handleCitySelect = (city) => {
    setListingFormInfo({ ...listingFormInfo, city_id: parseInt(city.id) });
  };
  const handleAgentSelect = (agent) => {
    setListingFormInfo({ ...listingFormInfo, agent_id: parseInt(agent.id) });
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    setListingFormInfo({
      ...listingFormInfo,
      is_rental: value === "forRent" ? 1 : 0,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "price" || name === "area" || name === "bedrooms") {
      if (!/^\d*$/.test(value)) return; 
    }
    setListingFormInfo({ ...listingFormInfo, [name]: value });
    validateForm(name, value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setListingFormInfo((prevState) => ({
        ...prevState,
        image: file, // Store file in image
      }));
      console.log(file); // Log the file to make sure it exists
    } else {
      console.log("No file selected.");
    }
  };
  const validateForm = () => {
    const newErrors = {};
    const {
      address,
      zip_code,
      price,
      area,
      bedrooms,
      description,
      image,
      region_id,
      city_id,
      agent_id,
    } = listingFormInfo;

    if (!address || address.length < 2) {
      newErrors.address = true;
    }
    if (!/^\d+$/.test(zip_code)) {
      newErrors.zip_code = true;
    }
    if (!/^\d+$/.test(price)) {
      newErrors.price = true;
    }
    if (!/^\d+$/.test(area)) {
      newErrors.area = true;
    }
    if (!bedrooms || bedrooms.length < 1) {
      newErrors.bedrooms = true;
    }
    if (!description || description.length < 5) {
      newErrors.description = true;
    }
    if (!image) {
      newErrors.image = true;
    }
    if (!region_id) {
      newErrors.region_id = true;
    }
    if (!city_id) {
      newErrors.city_id = true;
    }
    if (!agent_id) {
      newErrors.agent_id = true;
    }

    // setErrors(newErrors);
    // return Object.keys(newErrors).length === 0;
    return newErrors;
  };
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
  
    if (Object.keys(validationErrors).length === 0) {
      const formDataToSend = new FormData();
  
      formDataToSend.append("address", listingFormInfo.address);
      formDataToSend.append("image", listingFormInfo.image);
      formDataToSend.append("region_id", listingFormInfo.region_id);
      formDataToSend.append("description", listingFormInfo.description);
      formDataToSend.append("city_id", listingFormInfo.city_id);
      formDataToSend.append("zip_code", listingFormInfo.zip_code);
      formDataToSend.append("price", Number(listingFormInfo.price));
      formDataToSend.append("area", Number(listingFormInfo.area));
      formDataToSend.append("bedrooms", Number(listingFormInfo.bedrooms));
      formDataToSend.append("is_rental", listingFormInfo.is_rental);
      formDataToSend.append("agent_id", listingFormInfo.agent_id);
  
      fetch("https://api.real-estate-manager.redberryinternship.ge/api/real-estates", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: formDataToSend,
      })
        .then((response) => {
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          return response.json(); // Adjust based on your API's response
        })
        .then((data) => {
          console.log("Success:", data);
          // Optionally reset the form or show success message
        })
        .catch(async (error) => {
          if (error.response) {
            // Server responded with a status other than 200 range
            const errorResponse = await error.response.json();
            console.error("Error submitting form:", errorResponse);
          } else {
            // No response from the server
            console.error("Network error:", error);
          }
        
        });
    } else {
      setErrors(validationErrors);
    }
  };
  
  return (
    <div className="AddListingPageDiv">
      <div className="AddListingPageHeader">ლისტინგის დამატება</div>
      <div className="listingFormDiv">
        <div className="offerTypeDiv">
          <div className="addListingHeader">გარიგების ტიპი</div>
          <div className="offerTypeRadioButtons">
            <div className="radioDiv">
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  gap: "7px",
                }}
              >
                <input
                  className="radioButton"
                  type="radio"
                  value="forSale"
                  checked={selectedOption === "forSale"}
                  onChange={handleOptionChange}
                />
                იყიდება
              </label>
            </div>
            <div className="radioDiv">
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  gap: "7px",
                }}
              >
                <input
                  className="radioButton"
                  type="radio"
                  value="forRent"
                  checked={selectedOption === "forRent"}
                  onChange={handleOptionChange}
                />
                ქირავდება
              </label>
            </div>
          </div>
        </div>

        <div className="addListingLocation">
          <div className="addListingHeader">მდებარეობა</div>
          <div className="listingFormLine">
            <div className="form-group">
              <label className="agentFormInputLabel" htmlFor="address">
                მისამართი *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className={`formInput ${errors.address ? "errorInput" : ""}`}
                value={listingFormInfo.address}
                onChange={handleInputChange}
                required
              />
              <div className="validationHint">
                <img src={formCheckMark} alt="Checkmark" />
                <span>მინიმუმ ორი სიმბოლო</span>
              </div>
            </div>
            <div className="form-group">
              <label className="agentFormInputLabel" htmlFor="zip_code">
                საფოსტო ინდექსი *
              </label>
              <input
                type="number  "
                id="zip_code"
                name="zip_code"
                className={`formInput ${errors.zip_code ? "errorInput" : ""}`}
                value={listingFormInfo.zip_code}
                onChange={handleInputChange}
                required
              />
              <div className="validationHint">
                <img src={formCheckMark} alt="Checkmark" />
                <span>მხოლოდ რიცხვები</span>
              </div>
            </div>
          </div>

          <div className="listingFormLine">
            <div className="form-group">
              <label className="agentFormInputLabel" htmlFor="region">
                რეგიონი
              </label>
              <RegionDropDown regions={regions} onSelect={handleRegionSelect} />
            </div>
            <div className="form-group">
              <label className="agentFormInputLabel" htmlFor="city">
                ქალაქი
              </label>
              <CityDropDown cities={cities} onSelect={handleCitySelect} />
            </div>
          </div>
        </div>

        <div className="addListingLocation">
          <div className="addListingHeader">ბინის დეტალები</div>
          <div className="listingFormLine">
            <div className="form-group">
              <label className="agentFormInputLabel" htmlFor="price">
                ფასი *
              </label>
              <input
                type="text"
                id="price"
                name="price"
                className={`formInput ${errors.price ? "errorInput" : ""}`}
                value={listingFormInfo.price}
                onChange={handleInputChange}
                required
              />
              <div className="validationHint">
                <img src={formCheckMark} alt="Checkmark" />
                <span>მხოლოდ რიცხვები</span>
              </div>
            </div>
            <div className="form-group">
              <label className="agentFormInputLabel" htmlFor="area">
                ფართობი *
              </label>
              <input
                type="text"
                id="area"
                name="area"
                className={`formInput ${errors.area ? "errorInput" : ""}`}
                value={listingFormInfo.area}
                onChange={handleInputChange}
                required
              />
              <div className="validationHint">
                <img src={formCheckMark} alt="Checkmark" />
                <span>მხოლოდ რიცხვები</span>
              </div>
            </div>
          </div>

          <div className="form-group" style={{ marginTop: "20px" }}>
            <label className="agentFormInputLabel" htmlFor="bedrooms">
              საძინებლების რაოდენობა *
            </label>
            <input
              type="number"
              id="bedrooms"
              name="bedrooms"
              className={`formInput ${errors.bedrooms ? "errorInput" : ""}`}
              value={listingFormInfo.bedrooms}
              onChange={handleInputChange}
              required
            />
            <div className="validationHint">
              <img src={formCheckMark} alt="Checkmark" />
              <span>მხოლოდ რიცხვები</span>
            </div>
          </div>

          <div className="form-group" style={{ marginTop: "20px" }}>
            <label className="agentFormInputLabel" htmlFor="description">
              აღწერა *
            </label>
            <input
              type="text"
              id="description"
              name="description"
              className="formDescriptionInput"
              value={listingFormInfo.description}
              onChange={handleInputChange}
              required
            />
            <div className="validationHint">
              <img src={formCheckMark} alt="Checkmark" />
              <span>მინიმუმ ხუთი სიტყვა</span>
            </div>
          </div>

          <div className="listingImageUploadDiv">
            <label className="listingFormInputLabel" htmlFor="file">
              ატვირთეთ ფოტო *
            </label>
            <div
              className="listingImageInputForm"
              onClick={() =>
                document.querySelector(".listingImageInput").click()
              }
            >
              <input
                className="listingImageInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
              {!listingFormInfo.image ? (
                <img src={addFile} alt="Add File" />
              ) : (
                <div className="uploadedImage">
                  <img
                    src={URL.createObjectURL(listingFormInfo.image)}
                    alt="Uploaded"
                    style={{ width: "92px", height: "82px" }}
                  />
                  <img
                    className="removeImageIcon"
                    src={removeIcon}
                    alt="Remove"
                    onClick={() =>
                      setListingFormInfo({ ...listingFormInfo, image: null })
                    }
                  />
                </div>
              )}
              {errors.file && <span className="error">{errors.file}</span>}
            </div>
          </div>
          <div className="form-group">
            <div className="addListingHeader" style={{ marginTop: "80px" }}>
              აგენტი
            </div>
            <label
              className="listingFormInputLabel"
              htmlFor="city"
              style={{ marginTop: "15px" }}
            >
              აირჩიე
            </label>
            <AgentDropDown agents={agents} onSelect={handleAgentSelect} />
          </div>
        </div>
      </div>
      <div className="listingModalButtonsDiv">
        <button className="modalButton cancelListing">გაუქმება</button>
        <button className="modalButton addListing" onClick={handleSubmit}>
          დაამატე ლისტინგი
        </button>
      </div>
    </div>
  );
};

export default AddListingPage;
