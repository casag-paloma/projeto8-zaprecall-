import React from "react";
import "../assets/css/reset.css";
import "../assets/css/styles.css";
import FlashcardPage from "./FlashcardPage";
import logo from "../assets/img/logo.png"



export default function App(){
    const [clicked, setClicked]= React.useState(false);

    return(
        <>
            {clicked ?
            (
                <FlashcardPage/>
            ) : (
                <div className="logo">
                    <img src={logo} alt="Logo" />
                    <h1>ZapRecall</h1>
                    <button onClick={()=> setClicked(true)}> Inicial Recall!</button>
                </div>
            )}
        </>
    );
};

