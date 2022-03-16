import React from 'react';
import './Modal.css';

function Modal({setIsOpen, isOpen}) {

    const changeIsOpen = () => setIsOpen(!isOpen)

    return (
    <div className='modal'>
        <div className='modal__content'>
            <h1>Правила игры</h1>
            <p>Чтобы начать игру, нажмите "Начать игру". Далее у вас будет 2 скунды, чтобы запомнить расположение карточек на поле. После закрытия карточек нажмите на любые две карточки, если картинки на них совпадают, карточки остаются открытыми, иначе они закрываются. Чтобы пройти игру нужно собрать все пары одинаковых карточек. "Рестарт" - начать игру заново.</p>
            <button onClick={changeIsOpen}>К игре</button>
        </div>
    </div>
    );
}

export default Modal;