import React, {Component} from 'react';

export default class WeatherDate extends Component {
    render() {
        if(!this.props.condition.code)return <p>Loading...</p>;

        let windSpeed = this.props.wind.speed;
        let unitsSpeed = this.props.units.speed;
        let unitsTemperature = this.props.units.temperature;
        let temp = this.props.condition.temp;
        let weatherText = this.props.condition.text;
        let code = this.props.condition.code;

        return(
            <div className={"weatherToday"} key = {"weatherToday"}>
                {temp} {unitsTemperature}
                <img alt={weatherText} src={"http://l.yimg.com/a/i/us/we/52/" + code + ".gif"}/><br/>
                {weatherText}<br/>
                Wind speed: {windSpeed}({unitsSpeed})
            </div>
        )
    }
}
