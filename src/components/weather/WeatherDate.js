import React, {Component} from 'react';

export default class WeatherDate extends Component {
    render() {
        if (!this.props.condition.code) return <p>Loading...</p>;

        let windSpeed = this.props.wind.speed;
        let unitsSpeed = this.props.units.speed;
        let unitsTemperature = this.props.units.temperature;
        let temp = this.props.condition.temp;
        let weatherText = this.props.condition.text;
        let code = this.props.condition.code;

        return (
            <div className={"component"} key={"weatherToday"}>
                <div className="container">
                    <div className="row">
                        <div className="column col-6 col-sm-2">
                            <div className={"display-1"}>
                                {temp}
                                {unitsTemperature}
                            </div>
                        </div>
                        <div className="column col-6 col-sm-2">
                            <img className={'weatherDateImg'} alt={weatherText}
                                 src={"http://l.yimg.com/a/i/us/we/52/" + code + ".gif"}/>
                            <div className={"display-5"}>
                                {weatherText}
                            </div>
                            <br/>
                        </div>
                    </div><br/>
                    <div className={"display-5"}>
                        Wind speed: {windSpeed}{unitsSpeed}
                    </div>
                </div>
            </div>
        )
    }
}
