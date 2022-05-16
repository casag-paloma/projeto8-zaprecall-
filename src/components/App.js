import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import "../assets/css/reset.css";
import "../assets/css/styles.css";
import FlashcardPage from "./FlashcardPage";
import logo from "../assets/img/logo.png"


export default function App(){

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<WelcomePage/>}/>
                <Route path="/flashcards" element={<FlashcardPage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

function WelcomePage(){
    return(
        <div className="logo">
            <img src={logo} alt="Logo" />
            <h1>ZapRecall</h1>
            <Link to={"/flashcards"}>
                <button className="start-button" > Inicial Recall!</button>
            </Link>
        </div>
    );
};