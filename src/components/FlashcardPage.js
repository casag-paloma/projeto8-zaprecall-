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
    const [ qtd, setQtd] =React.useState(0);
    const [ icons, setIcons] =React.useState([
            {}                    
    ]);
    const [firstIcon, setFirstIcon] = React.useState(true);
    
    function AddQtd(){
        setQtd(qtd+1);
    }

    function AddIcons(newIcon, newClass){
        if(firstIcon){
            setIcons([{name:newIcon, class:newClass}])
            setFirstIcon(false);
            console.log("firsticon")
        } else{
            setIcons([...icons,{name:newIcon, class:newClass}])
        }

    }


    return(
        <>
            <div className="header">
                <img src={logoPequeno} alt="Logo Pequeno"/>
                <span> ZapRecall </span>
            </div>

            <ul className="cards">
                {shuffledDeck.map((flashcard, index) => <Flashcard key={index} back={`Pergunta ${index+1}`} question={flashcard.question} answer={flashcard.answer} AddQtd={AddQtd} AddIcons={AddIcons} /> )}
            </ul>

            <div className="footer">
                <span> {qtd}/8 CONCLUIDOS</span>
                <AnswerIcon>
                    {icons.map((icon, index) => <ion-icon key={index}  name={icon.name} className={icon.class}></ion-icon> )}
                </AnswerIcon>
            </div>
        </>
    );
};


function Flashcard({back, question, answer, AddQtd, AddIcons}){
    const [clicked, setClicked] = React.useState(false);
    const [answered, setAnswered] = React.useState(false);
    const [type, setType] = React.useState();
    const [icon, setIcon] = React.useState("play-outline");
    const [iconClass, setIconClass] = React.useState();

    function ClickButton(type, icon, iconClass){
        setClicked(false);
        setType(`${type} strikethrough`)
        setIcon(icon);
        setIconClass(`white ${iconClass}`);
        AddQtd();
        AddIcons(icon, iconClass);
    }

    function OpenFlashcard(){
        if(!answered){
            setClicked(true)
        }
    }

    return(
        <li>
            {clicked ?(
                <>
                {answered ? (
                        <div className="card-front">
                            <span> {answer}</span>
                            <div className="buttons">
                                <button onClick={()=>ClickButton("red","close-circle-outline", "wrong")}className="wrong"> Não lembrei </button>
                                <button onClick={()=>ClickButton("orange","help-circle-outline", "almost")} className="almost"> Quase não lembrei </button>
                                <button onClick={()=>ClickButton("green","checkmark-circle-outline", "rigth")}className="rigth"> Zap! </button>
                            </div>
                        </div>      
                    ) : (
                        <div className="card-front">
                            <span> {question}</span>
                            <img src={setinha} alt="Seta" onClick={()=>setAnswered(true)}/>
                        </div>
                    )}

                </>
            ) : (
                <div className="card-back" onClick={OpenFlashcard}>
                    <span className={type}>{back}</span>
                    <ion-icon className={iconClass} name={icon}></ion-icon>
                </div>
            )}
        </li>
    )
}

function AnswerIcon({children}){
    return(
        <div className="emoticons">
            {children}
        </div>
    )
}