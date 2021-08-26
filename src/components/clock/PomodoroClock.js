import React from 'react';
import './PomodoroClock.css';
import NotificationAudioA from '../../commons/mp3/notification_a.mp3';
import NotificationAudioB from '../../commons/mp3/notification_b.mp3';
import NotificationAudioClick from '../../commons/mp3/notification_click.mp3';

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

        this.audioA = new Audio(NotificationAudioA);
        this.audioB = new Audio(NotificationAudioB);
        this.audioClick = new Audio(NotificationAudioClick);
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
            this.audioA.play();
            clearInterval(this.intervalClock);
            this.setState({ intervalo: true, clock: "", sessao: "Sessão de intervalo" });
            this.calculoTempo(60 * 1);            
        }
        else if (this.state.clock === "00:00" && this.state.intervalo === true)
        {
            this.audioB.play();
            clearInterval(this.intervalClock);
            this.setState({ clock: "", sessao: "Intervalo concluido." });
        }
    }

    componentWillUnmount(){
        clearInterval(this.intervalClock);
    }

    handlerIniciarClick(){
        this.audioClick.play();

        this.setState({ pause: false });

        if (this.state.sessao === "Inicie uma sessão de trabalho") {
            this.setState({ sessao: "Sessão de trabalho" });
            clearInterval(this.intervalClock);
            this.calculoTempo(60 * 1);
        }
    }

    handlerPauseClick(){
        this.audioClick.play();

        this.setState({ pause: true });
    }

    handlerResetClick(){
        this.audioClick.play();

        this.setState({ 
            intervalo: false,
            sessao: "Sessão de trabalho",
            clock: "",
            pause: false
        });

        clearInterval(this.intervalClock);
        this.calculoTempo(60 * 25);
    }

    render(){
        return(
            <div>
                <h1>Pomodoro clock</h1>
                <h2>{this.state.sessao}</h2>
                <h3>{this.state.clock}</h3>

                <div className="bnt-group">
                    <button className="button" onClick={this.handlerIniciarClick}>Iniciar</button>&nbsp;|&nbsp;
                    <button className="button" onClick={this.handlerPauseClick}>Pausar</button>&nbsp;|&nbsp;
                    <button className="button" onClick={this.handlerResetClick}>Reset</button>
                </div>
                
            </div>
        )
    }
}

export default PomodoroClock;