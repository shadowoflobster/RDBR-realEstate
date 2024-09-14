import React from "react";
import bedRoomsSvg from "../SVGs/bedRoomsSvg.svg";
import areaIcon from "../SVGs/areaIcon.svg";
import locationIcon from "../SVGs/locationIcon.svg";
import zipIcon from "../SVGs/zipIcon.svg";
import './Card.css';



const Card = () => {
    return (
        <div className="cardDiv">
            <div className="cardImage" ><div className="offerStatus">იყიდება</div></div>
            <div className="cardDetailsDiv">
                <div className="cardDetails">
                    <span className="cardPrice">80 000 ₾</span>
                    <div className="cardAdress"><img className="locationSvg"  src={locationIcon}></img><span className="cardAdressSpan">ჭავჭავეაძე</span></div>
                    <div className="cardIconDetails">
                        <div className="bedRooms"><img className="bedRoomsSvg" src={bedRoomsSvg}></img><span className="bedRoomsValue">2</span></div>
                   <div className="area"><img className="areaIcon" src={areaIcon}></img><span className="areaValue">55 მ</span><sup>2</sup></div>
                        
                        <div className="zip"><img className="zipIcon" src={zipIcon}></img><span className="zipValue">1204</span></div>

                    
                </div>
            </div>
        </div>
</div>
    )
}

export default Card

/*
const card = ({cardImage, cardPrice, cardAddres, cardBedrooms, cardArea, cardZip});


const Card = () => {
    return (
        <div className="cardDiv">
            <div className="cardImage" style={"backgroundImage:url(${cardImage})"}><div className="offerStatus">იყიდება</div></div>
            <div className="cardDetailsDiv">
                <div className="cardDetails">
                    <span className="cardPrice">{cardPrice} ₾</span>
                    <div className="cardAdress"><img className="locationSvg"  src={locationIcon}></img><span className="cardAdressSpan">{cardAddres}</span></div>
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
*/