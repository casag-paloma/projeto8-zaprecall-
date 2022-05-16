import React from "react";
import logoPequeno from "../assets/img/logo-pequeno.png";
import setinha from "../assets/img/setinha.png"
import party from "../assets/img/party.png"
import sad from "../assets/img/sad.png"

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
    const [ icons, setIcons] =React.useState();
    const [firstIcon, setFirstIcon] = React.useState(true);
    const [finalized, setFinalized] = React.useState(false);
    const [emoji, setEmoji]= React.useState();
    const [message, setMessage] = React.useState();
    const [text, setText] = React.useState();
    const [hasWrong, setHasWrong] = React.useState(false);

    function AddQtd(){
        setQtd(qtd+1);
    }

    function AddIcons(newIcon, newClass){
        if(firstIcon){
            setIcons([{name:newIcon, class:`white ${newClass}`}])
            setFirstIcon(false);
        } else{
            setIcons([...icons,{name:newIcon, class:`white ${newClass}`}])
        }
    }

    function VerifyWrong(){
        
        if(icons.length === 8){
            setFinalized(true);
            for(let i = 0; i < icons.length; i++){
                if(icons[i].class === "white wrong"){
                    setHasWrong(true);
                }
            }
        }
    };
    
    function RenderMessage(){
        if(hasWrong){    
            setEmoji(sad);
            setMessage("Putz...");
            setText("Ainda faltam alguns... Mas não desanime!");
        } else{
            setEmoji(party);
            setMessage("Parabéns!");
            setText("Você não esqueceu de nenhum flashcard!!");
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
                {finalized ? (
                    <div className="message">
                        <div className="primary-text">
                            <img src={emoji} alt="Emoji"/>
                            <span> <strong> {message}</strong></span>
                        </div>
                        <div className="text"> {text}</div>
                    </div>                
                ):(
                    <></>
                )}
                <div> {qtd}/8 CONCLUIDOS</div>
                { firstIcon ? (
                    <></>
                ):(
                    <AnswerIcon VerifyWrong={VerifyWrong} RenderMessage={RenderMessage}>
                        {icons.map((icon, index) => <ion-icon key={index}  name={icon.name} class={icon.class}></ion-icon> )}
                    </AnswerIcon>
                )}
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
                            <div className="question"> {answer}</div>
                            <div className="buttons">
                                <button onClick={()=>ClickButton("red","close-outline", "wrong")}className="wrong"> Não lembrei </button>
                                <button onClick={()=>ClickButton("orange","help-outline", "almost")} className="almost"> Quase não lembrei </button>
                                <button onClick={()=>ClickButton("green","checkmark-outline", "rigth")}className="rigth"> Zap! </button>
                            </div>
                        </div>      
                    ) : (
                        <div className="card-front">
                            <div className="question"> {question}</div>
                            <img src={setinha} alt="Seta" onClick={()=>setAnswered(true)}/>
                        </div>
                    )}

                </>
            ) : (
                <div className="card-back" onClick={OpenFlashcard}>
                    <span className={type}>{back}</span>
                    <ion-icon class={iconClass} name={icon}></ion-icon>
                </div>
            )}
        </li>
    )
};

function AnswerIcon({children, VerifyWrong, RenderMessage}){
    VerifyWrong()
    RenderMessage()
    return(
        <div className="icons">
            {children}
        </div>
    )
};