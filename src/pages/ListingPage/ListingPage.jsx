import React from "react";
import "./ListingPage.css";
import goBackSvg from "../../components/SVGs/goBackArrow.svg";
import bedRoomsSvg from "../../components/SVGs/bedRoomsSvg.svg";
import areaIcon from "../../components/SVGs/areaIcon.svg";
import locationIcon from "../../components/SVGs/locationIcon.svg";
import zipIcon from "../../components/SVGs/zipIcon.svg";
import mailIcon from "../../components/SVGs/mailIcon.svg";
import phoneNumberIcon from "../../components/SVGs/phoneNumberIcon.svg";

const ListingPage = () => {
  return (
    <div className="ListingPageDiv">
      <img className="goBackArrow" src={goBackSvg} />
      <div className="listingDiv">
        <div className="ImgAndDate">
          <img className="listingImage"></img>
          <span className="listDate">გამოქვეყნების თარიღი 08/08/24</span>
        </div>
        <div className="listingInfoDiv">
          <span className="listingPrice">80, 458 ₾</span>
          <div className="listingInfos">
            <div className="listingInfo ">
              <img className="locationSvg" src={locationIcon}></img>
              <span className="listingAdressSpan">
                თბილისი, ი. ჭავჭავაძის 53
              </span>
            </div>
            <div className="listingInfo ">
              <img className="areaSvg" src={areaIcon}></img>
              <span className="listingAdressSpan">ფართი 55 მ</span>
              <sup>2</sup>
            </div>
            <div className="listingInfo ">
              <img className="bedRoomsSvg" src={bedRoomsSvg}></img>
              <span className="listingAdressSpan">საძინებელი 2</span>
            </div>
            <div className="listingInfo ">
              <img className="zipSvg" src={zipIcon}></img>
              <span className="listingAdressSpan">საფოსტო ინდექსი 2525</span>
            </div>
          </div>
          <span className="listingDescription">
            იყიდება ბინა ჭავჭავაძის ქუჩაზე, ვაკეში. ბინა არის ახალი რემონტით,
            ორი საძინებლითა და დიდი აივნებით. მოწყობილია ავეჯითა და ტექნიკით.{" "}
          </span>
          <div className="agentInfoDiv">
            <div className="agent">
              <img className="agentImg"></img>
              <div className="agentInfo">
                <span className="agentName">სოფიო გელოვანი</span>
                <span className="agentStatus">აგენტი</span>
              </div>
            </div>

            <div className="agentContacts">
              <div className="agentEmailDiv">
                <img className="mailIcon" src={mailIcon} />
                <div className="agentEmail">sophio.gelovani@redberry.ge</div>
              </div>
              <div className="agentNumberDiv">
                <img className="phoneNumberIcon" src={phoneNumberIcon} />
                <div className="agentNumber">577 777 777</div>
              </div>
            </div>
          </div>
          <button className="deleteListingBtn">ლისტინგის წაშლა</button>
        </div>
      </div>

      <div className="carousel"></div>
    </div>
  );
};

export default ListingPage;
