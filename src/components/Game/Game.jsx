import React, { useEffect, useState } from 'react';
import './Game.css';
import Apple from '../../images/apple.png'
import Book from '../../images/book.png'
import Cupcake from '../../images/cupcake.png'
import Dog from '../../images/dog.png'
import Games from '../../images/games.png'
import Gifts from '../../images/gifts.png'
import Star from '../../images/star.png'
import Strawberry from '../../images/strawberry.png'
import GameCard from '../GameCard/GameCard.jsx';

const allCards = [
    {id: 1, name: 'apple', image: Apple},
    {id: 2, name: 'apple', image: Apple},
    {id: 3, name: 'book', image: Book},
    {id: 4, name: 'book', image: Book},
    {id: 5, name: 'cupcake', image: Cupcake},
    {id: 6, name: 'cupcake', image: Cupcake},
    {id: 7, name: 'dog', image: Dog},
    {id: 8, name: 'dog', image: Dog},
    {id: 9, name: 'games', image: Games},
    {id: 10, name: 'games', image: Games},
    {id: 11, name: 'gifts', image: Gifts},
    {id: 12, name: 'gifts', image: Gifts},
    {id: 13, name: 'star', image: Star},
    {id: 14, name: 'star', image: Star},
    {id: 15, name: 'strawberry', image: Strawberry},
    {id: 16, name: 'strawberry', image: Strawberry}
]

function Game({setIsOpen, isOpen}) {

    const [inGame, setInGame] = useState(false)
    const [cards, setCards] = useState([])
    const [openedCards, setOpenedCards] = useState([])
    const [trueOpenedCards, setTrueOpenedCards] = useState([])

    const changeIsOpen = () => setIsOpen(!isOpen)
    const changeInGame = () => setInGame(!inGame)

    function shuffle(cards) {
        let newOrderOfCards = cards
        for (let i = newOrderOfCards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [newOrderOfCards[i], newOrderOfCards[j]] = [newOrderOfCards[j], newOrderOfCards[i]];
        }
        return newOrderOfCards
    }
    
    function turnOverTheCard(card) {
        if (openedCards.length < 2 && inGame) {
            setOpenedCards([...openedCards, card])
        }
    }

    function startGame() {
        setCards(shuffle(allCards))
        setOpenedCards([...cards])
        setTimeout(() => {
            setOpenedCards([])
            setTrueOpenedCards([])
        }, 2000)
        if (inGame == false) {
            changeInGame()
        }
        
    }
    useEffect(() => {
        setCards(shuffle(allCards))
    },[])

    useEffect(() => {
        if (trueOpenedCards.length === 16) {
            setTimeout(() => {
                setTrueOpenedCards([])
                if (inGame == true) {
                    changeInGame()
                }
            }, 2000)
        }
    },[trueOpenedCards])

    useEffect(() => {
        if (openedCards.length === 2) {
            if (openedCards[0].name === openedCards[1].name) {
                setTrueOpenedCards([...trueOpenedCards, openedCards[0].id, openedCards[1].id])
            }
            setTimeout(() => setOpenedCards([]), 1000)
        }
    }, [openedCards])


    return (
    <div className='container'>
        <button onClick={changeIsOpen}>Вернуться к правилам</button>
        <div className='game'>
            <h1>Memory game</h1>
            <div className='cards'>
                {cards.map((card) => <GameCard key={card.id} card={card} openedCards={openedCards} trueOpenedCards={trueOpenedCards} turnOverTheCard={turnOverTheCard}/>)}
            </div>
            <button onClick={startGame}>{inGame ? 'Рестарт' : 'Начать игру' }</button>
        </div>
    </div>
    );
}

export default Game;
