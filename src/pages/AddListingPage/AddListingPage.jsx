import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "./AddListingPage.css";
import "../../components/AddAgentPopup/AddAgentPopup.css";
import formCheckMark from "../../components/SVGs/formCheckMark.svg";
import RegionDropDown from "../../components/RegionDropDown/RegionDropDown";
import CityDropDown from "../../components/CityDropDown/CityDropDown";
import removeIcon from "../../components/SVGs/removeImage.svg";
import addFile from "../../components/SVGs/addFile.svg";
import AgentDropDown from "../../components/agentDropDown/agentDropDown";

const AddListingPage = () => {
  const navigate = useNavigate();
  const API_TOKEN = process.env.REACT_APP_API_TOKEN;
  const [selectedOption, setSelectedOption] = useState("");
  const [addAgent, setAddAgent] = useState(0);
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
  const errors=({})
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
  const handleAddAgent = () => {
    setAddAgent(addAgent === 0 ? 1 : 0);
  }
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
        image: file, 
      }));
      console.log(file); 
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

 
    return newErrors;
  };
  
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.set('region_id', listingFormInfo.region_id);
    formData.set('price', listingFormInfo.price);
    formData.set('zip_code', listingFormInfo.zipCode);
    formData.set('area', listingFormInfo.area);
    formData.set('city_id', listingFormInfo.city.id);
    formData.set('address', listingFormInfo.address);
    formData.set('agent_id', listingFormInfo.agent_id);
    formData.set('bedrooms', listingFormInfo.bedrooms);
    formData.set('is_rental', listingFormInfo.is_rental);
    formData.set('description', listingFormInfo.description);
    formData.set('image', listingFormInfo.image);

    const API_TOKEN = "9d0e1e63-3b0d-4cdc-8709-0d5023a183cd";
    if (!API_TOKEN) {
        throw new Error("API token is missing.");
    }

    try {
        const response = await fetch('https://api.real-estate-manager.redberryinternship.ge/api/real-estates', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${API_TOKEN}`
            },
            body: formData
        });

        if (!response.ok) {
            let errorText = 'Unexpected error during request.';
            try {
                const errorResponse = await response.json();
                errorText = errorResponse.message || 'Error processing the request.';
            } catch (jsonError) {
                errorText = 'Unable to parse the error response.';
            }
            console.error('Request failed with status:', response.status, 'Message:', errorText);
            throw new Error(errorText);
        }

        // Parse and log successful response
        const responseData = await response.json();
        console.log('Form submission successful:', responseData);
        return responseData;

    } catch (err) {
        console.error('An error occurred:', err);
        throw err;
    }
}
const handleCancel = () => {
  navigate("/"); 
};

  
  return (
    <div className="AddListingPageDiv">
      <div className="AddListingPageHeader">ლისტინგის დამატება</div>
      <div className="listingFormDiv">
        <form className="offerTypeDiv">
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
        </form>

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
              <RegionDropDown name="region_id" regions={regions} onSelect={handleRegionSelect} />
            </div>
            <div className="form-group">
              <label className="agentFormInputLabel" htmlFor="city">
                ქალაქი
              </label>
              <CityDropDown name="city_id" cities={cities} onSelect={handleCitySelect} />
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
                name="file"
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
            <AgentDropDown name="agent_id" agents={agents} onSelect={handleAgentSelect}  />
          </div>
        </div>
      </div>
      <div className="listingModalButtonsDiv">
        <button className="modalButton cancelListing"  onClick={handleCancel}>გაუქმება</button>
        <button className="modalButton addListing" onClick={handleSubmit} onAddAgent={handleAddAgent}>
          დაამატე ლისტინგი
        </button>
      </div>
    </div>
  );
};

export default AddListingPage;
