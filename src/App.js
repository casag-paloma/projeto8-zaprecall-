export default function App(){
    return(
        <>
            <TelaBoasVindas/>
        </>
    );
};

function TelaBoasVindas(){
    return(
        <div className="logo">
            <img src="./img/logo.png" alt="Logo" />
            <h1>ZapRecall</h1>
            <button onClick={TelaPerguntas}> Inicial Recall!</button>
        </div>
    );
};

function TelaPerguntas(){
    console.log("botao");
    return(
        <h1>teste tela TelaPerguntas</h1>
    )
}