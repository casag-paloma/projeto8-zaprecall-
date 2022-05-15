
import logo from "../assets/img/logo.png"

export default function WelcomePage(){
    return(
        <div className="logo">
            <img src={logo} alt="Logo" />
            <h1>ZapRecall</h1>
            <button > Inicial Recall!</button>
        
        </div>
    );
};