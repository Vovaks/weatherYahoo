import React, {Component} from 'react';
import WeatherForecastDisplay from './WeatherForecastDisplay'

export default class WeatherForecasts extends Component {
    render() {
        if (!this.props.forecast) return <p>Loading...</p>;

        let forecasts = this.props.forecast;
        let units = this.props.units;

        return forecasts.map((currentForecast, index) => (
            <div className={'component'} key={index}>
                <div className={'weather-Forcast-Grid'} key={currentForecast.date}>
                    <WeatherForecastDisplay
                        forecast={currentForecast}
                        units={units}
                    />
                </div>
            </div>
        ));
    }
}
