import React, {Component} from 'react';
import request from "superagent";
import {Button} from 'react-bootstrap';
import WeatherForecasts from './WeatherForecasts';
import WeatherTitle from "./WeatherTitle";
import WeatherDate from "./WeatherDate";

class Weather extends Component {

    constructor(props) {
        super(props);
        this.handleCityNameChange = this.handleCityNameChange.bind(this);
        this.state = {
            weatherData: {
                location: {},
                units: {},
                condition: {},
                wind: {}
            },
            cityName: 'Tallinn',//TODO:can get coordinate from navigator.geolocation
            format: 'json',// json/xml
            units: 'c' // use 'c' or 'f'
        };
    }

    createUrl() {
        let cityName = this.state.cityName;
        let format = this.state.format;
        let units = this.state.units;
        let url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20" +
            "(select%20woeid%20from%20geo.places(1)%20where%20text%3D'" +
            cityName + "')and%20u='" + units + "'&format=" + format;
        return url;
    };

    loadFromYahooWeatherApi() {
        request
            .get(this.createUrl())
            .then((res) => {
                if (res) {
                    let resWeather = JSON.parse(res.text);// console.log('queryCount', resWeather.query.count);
                    let results = resWeather.query.results.channel; // console.log('results', results);

                    this.setState({
                        weatherData: {
                            units: results.units,
                            location: results.location,
                            condition: results.item.condition,
                            wind: results.wind,
                            forecast: results.item.forecast
                        }
                    });
                }
            })
    }

    handleCityNameChange(e) {
        this.setState({cityName: e.target.value})
    }

    componentDidMount() {
        this.loadFromYahooWeatherApi();
    }

    render() {
        return (
            <div className={"Weather"}>
                <div className={'row'}>
                    <div className={'col-10'}>
                        <input
                            type="text"
                            onChange={this.handleCityNameChange}
                            id="cityName"
                            className="form-control"
                            placeholder={"Enter City Name"}
                            required
                        />
                    </div>
                    <div className={'col-2'}>
                        <Button
                            bsStyle="primary"
                            className="searchBtn"
                            onClick={this.loadFromYahooWeatherApi.bind(this)}
                            type="button"
                        >
                            {"Search"}
                        </Button>
                    </div>

                </div>
                <WeatherTitle
                    location={this.state.weatherData.location}
                />
                <WeatherDate
                    wind={this.state.weatherData.wind}
                    units={this.state.weatherData.units}
                    condition={this.state.weatherData.condition}
                />

                <div className={"forecast"}>
                    <h1>Forecast</h1>

                    <div className="row">
                        <div className="col-sm">
                            <h3>Day:</h3>
                        </div>
                        <div className="col-sm">
                            <h3>Weather:</h3>
                        </div>
                        <div className="col-sm">
                            <h3>Higher:</h3>
                        </div>
                        <div className="col-sm">
                            <h3>Lower:</h3>
                        </div>
                    </div>
                    <WeatherForecasts
                        forecast={this.state.weatherData.forecast}
                        units={this.state.weatherData.units}
                    />
                </div>
            </div>
        );
    }
}


export default Weather;
