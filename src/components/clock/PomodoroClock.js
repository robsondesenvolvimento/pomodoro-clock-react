import React from 'react';

class PomodoroClock extends React.Component {

    constructor(props){
        super(props);
        this.state = { 
            intervalo: false,
            sessao: "Inicie uma sessão de trabalho",
            clock: "",
            pause: false
        }

        this.handlerIniciarClick = this.handlerIniciarClick.bind(this);
        this.handlerPauseClick = this.handlerPauseClick.bind(this);
        this.handlerResetClick = this.handlerResetClick.bind(this);
    }

    calculoTempo(duration){        
        var timer = duration, minutes, seconds;
        this.intervalClock = setInterval(() => {
            if(this.state.pause === false){
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                var clocks = minutes + ":" + seconds;
                this.setState({ clock: clocks });

                if (--timer < 0) {
                    timer = duration;
                }
            }
        }, 1000);        
    }

    componentDidUpdate(){
        if (this.state.clock === "00:00" && this.state.intervalo === false)
        {
            clearInterval(this.intervalClock);
            this.setState({ intervalo: true, clock: "", sessao: "Sessão de intervalo" });
            this.calculoTempo(60 * 1);
        }
        else if (this.state.clock === "00:00" && this.state.intervalo === true)
        {
            clearInterval(this.intervalClock);
            this.setState({ clock: "", sessao: "Intervalo concluido." });
        }
    }

    componentWillUnmount(){
        clearInterval(this.intervalClock);
    }

    handlerIniciarClick(){
        this.setState({ pause: false });

        if (this.state.sessao === "Inicie uma sessão de trabalho") {
            this.setState({ sessao: "Sessão de trabalho" });
            clearInterval(this.intervalClock);
            this.calculoTempo(60 * 25);
        }
    }

    handlerPauseClick(){
        this.setState({ pause: true });
    }

    handlerResetClick(){
        this.setState({ 
            intervalo: false,
            sessao: "Sessão de trabalho",
            clock: "",
            pause: false
        });

        clearInterval(this.intervalClock);
        this.calculoTempo(60 * 5);
    }

    render(){
        return(
            <div>
                <h1>Pomodoro clock</h1>
                <h2>{this.state.sessao}</h2>
                <h3>{this.state.clock}</h3>
                <button onClick={this.handlerIniciarClick}>Iniciar</button>
                <button onClick={this.handlerPauseClick}>Pausar</button>
                <button onClick={this.handlerResetClick}>Reset</button>
            </div>
        )
    }
}

export default PomodoroClock;