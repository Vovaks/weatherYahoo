import React, {Component} from 'react';
import WeatherForecastDisplay from './WeatherForecastDisplay'

export default class WeatherForecasts extends Component {
    render() {
        if(!this.props.forecast)return <p>Loading...</p>;

        let forecasts = this.props.forecast;
        return forecasts.map((currentForecast) => (

            <div className = {'weather-Forcast-Grid'} key = {currentForecast.date}>
                <WeatherForecastDisplay
                    forecast = {currentForecast}
                />
            </div>
        ));
    }
}
