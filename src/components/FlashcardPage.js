import React from "react";
import logoPequeno from "../assets/img/logo-pequeno.png";
import setinha from "../assets/img/setinha.png"

function shuffler() { 
	return Math.random() - 0.5; 
}

const deck = [
    {question: "O que é JSX?", answer:"Uma extensão de linguagem do JavaScript"},
    {question: "O React é __", answer:"uma biblioteca JavaScript para construção de interfaces"},
    {question: "Componentes devem iniciar com __", answer:"letra maiúscula"},
    {question: "Podemos colocar __ dentro do JSX", answer:"expressões"},
    {question: "O ReactDOM nos ajuda __", answer:"interagindo com a DOM para colocar componentes React na mesma"},
    {question: "Usamos o npm para __?", answer:"gerenciar os pacotes necessários e suas dependências"},
    {question: "Usamos props para __", answer:"passar diferentes informações para componentes "},
    {question: "Usamos estado (state) para __ ", answer:"dizer para o React quais informações quando atualizadas devem renderizar a tela novamente"}
];

const shuffledDeck = deck.sort(shuffler);

export default function FlashcardPage(){
    
    return(
        <>
            <Header/>
            <Flashcards/>
            <Footer/>
        </>
    );
};

function Header(){
    return(
        <div className="header">
            <img src={logoPequeno} alt="Logo Pequeno"/>
            <span> ZapRecall </span>
        </div>
    )
};



function Flashcards(){
    return(
        <ul className="cards">
            {shuffledDeck.map((flashcard, index) => <Flashcard key={index} 
            back={`Pergunta ${index+1}`} question={flashcard.question} answer={flashcard.answer}/>)}
        </ul>
    )
};

function Flashcard({back, question, answer}){
    const [clicked, setClicked] = React.useState(false);

    return(
        <li>
            {clicked ?(
                <FlashcardFront question={question} answer={answer}/>
            ) : (
                <div className="card-back" onClick={()=>setClicked(true)}>
                    <span>{back}</span>
                    <ion-icon name="play-outline"></ion-icon>
                </div>
            )}
        </li>
    )
}

function FlashcardFront({question, answer}){
    const [answered, setAnswered] = React.useState(true);

    return(
        <>
            {answered ? (
                        <div className="card-front">
                            <span> {answer}</span>
                            <div className="buttons">
                                <button className="wrong"> Não lembrei </button>
                                <button className="almost"> Quase não lembrei </button>
                                <button className="rigth"> Zap! </button>
                            </div>
                        </div>      
                    ) : (
                        <div className="card-front">
                            <span> {question}</span>
                            <img src={setinha} alt="Seta"/>
                        </div>

                    )}
        </>
    )
}

function Footer(){
    return(
        <div className="footer">
            <span> 0/4 CONCLUIDOS</span>
        </div>
    )
};


// function Outros(){
//    return(
//        <>
//        <div className="card-front">
//              <span> {deck[1].question}</span>
//                <img src={setinha} alt="Seta"/>
//            </div>
//
//            <div className="card-frente">
//                <span> {deck[1].answer}</span>
//                <div className="buttons">
//                    <button className="errado"> Não lembrei </button>
//                    <button className="quase"> Quase não lembrei </button>
//                    <button className="certo"> Zap! </button>
//                </div>
//            </div>
//        </>
//    )
//}