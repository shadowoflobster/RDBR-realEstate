import React from 'react';
import Card from '../Card/Card';
import './CardCarousel.css';

const CardCarousel = ({ cards }) => {
    return (
        <div className="carouselContainer">
            <div className="carousel">
                {cards.map((card, index) => (
                    <Card
                        key={index}
                        cardImage={card.cardImage}
                        cardOffer={card.cardOffer}
                        cardPrice={card.cardPrice}
                        cardAddress={card.cardAddress}
                        cardBedrooms={card.cardBedrooms}
                        cardArea={card.cardArea}
                        cardZip={card.cardZip}
                    />
                ))}
            </div>
        </div>
    );
};

export default CardCarousel;