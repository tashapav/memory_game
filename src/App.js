import React, { useState } from 'react';
import './App.css';
import Game from './components/Game/Game.jsx';
import Modal from './components/Modal/Modal.jsx';

function App() {
    const [isOpen, setIsOpen] = useState(true)

    return (
    <div className="App">
        {isOpen ? <Modal setIsOpen={setIsOpen} isOpen={isOpen}/> : null}
        <Game setIsOpen={setIsOpen} isOpen={isOpen}/>
    </div>
    );
}

export default App;
