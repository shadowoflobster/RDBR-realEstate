import React from "react";
import bedRoomsSvg from "../SVGs/bedRoomsSvg.svg";
import areaIcon from "../SVGs/areaIcon.svg";
import locationIcon from "../SVGs/locationIcon.svg";
import zipIcon from "../SVGs/zipIcon.svg";
import './Card.css';



const Card = (cardImage,cardOffer, cardPrice, cardAddress, cardBedrooms, cardArea, cardZip) => {
    return (
        <div className="cardDiv">
            <img className="cardImage" style={{ backgroundImage: `url(${cardImage})`}} ></img>
            <div className="cardDetailsDiv">
                <div className="cardDetails">
                    <span className="cardPrice">{cardPrice} ₾</span>
                    <div className="cardAdress"><img className="locationSvg"  src={locationIcon}></img><span className="cardAdressSpan">{cardAddress}</span></div>
                    <div className="cardIconDetails">
                        <div className="bedRooms"><img className="bedRoomsSvg" src={bedRoomsSvg}></img><span className="bedRoomsValue">{cardBedrooms}</span></div>
                   <div className="area"><img className="areaIcon" src={areaIcon}></img><span className="areaValue">{cardArea} მ</span><sup>2</sup></div>
                        
                        <div className="zip"><img className="zipIcon" src={zipIcon}></img><span className="zipValue">{cardZip}</span></div>

                    
                </div>
            </div>
        </div>
</div>
    )
}

export default Card

