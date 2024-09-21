import React from "react";
import bedRoomsSvg from "../SVGs/bedRoomsSvg.svg";
import areaIcon from "../SVGs/areaIcon.svg";
import locationIcon from "../SVGs/locationIcon.svg";
import zipIcon from "../SVGs/zipIcon.svg";
import './Card.css';

const Card = ({ cardImage, cardOffer, cardPrice, cardAddress, cardBedrooms, cardArea, cardZip }) => {
    return (
        <div className="cardDiv">
            <img className="cardImage" src={cardImage} alt="card" />
            <div className="cardDetailsDiv">
                <div className="cardDetails">
                    <span className="cardPrice">{cardPrice} ₾</span>
                    <div className="cardAddress">
                        <img className="locationSvg" src={locationIcon} alt="Location icon" />
                        <span className="cardAddressSpan">{cardAddress}</span>
                    </div>
                    <div className="cardIconDetails">
                        <div className="bedRooms">
                            <img className="bedRoomsSvg" src={bedRoomsSvg} alt="Bedrooms icon" />
                            <span className="bedRoomsValue">{cardBedrooms}</span>
                        </div>
                        <div className="area">
                            <img className="areaIcon" src={areaIcon} alt="Area icon" />
                            <span className="areaValue">{cardArea} მ<sup>2</sup></span>
                        </div>
                        <div className="zip">
                            <img className="zipIcon" src={zipIcon} alt="Zip icon" />
                            <span className="zipValue">{cardZip}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
