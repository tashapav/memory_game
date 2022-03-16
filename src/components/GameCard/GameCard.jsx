import React from 'react';
import './GameCard.css';

function GameCard({card, openedCards, trueOpenedCards, turnOverTheCard}) {
    let isOpenedCard

    if (openedCards.includes(card)) {
        isOpenedCard = true
    } else if (trueOpenedCards.includes(card.id)) {
        isOpenedCard = true
    } else {
        isOpenedCard = false
    }
    return(
        <div className={`card ${isOpenedCard ? 'opened-card' : ''}`} onClick={() => turnOverTheCard(card)}>
            <div className='content-wrapper'>
                <div className='front-side'>
                    <img src={card.image} alt={card.name}/>
                </div>
                <div className='back-side'> </div>
            </div>
        </div>
    )
}

export default GameCard;
