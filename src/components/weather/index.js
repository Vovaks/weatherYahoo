import React, {Component} from 'react';
import request from "superagent";
import WeatherForecasts from './WeatherForecasts';
import WeatherTitle from "./WeatherTitle";
import WeatherDate from "./WeatherDate";

class Weather extends Component {

    constructor(props) {
        super(props);
        this.handleCityNameChange = this.handleCityNameChange.bind(this);
        this.state = {
            weatherData: {
                location: {
                },
                units: {
                },
                condition: {
                },
                wind: {
                }
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
                    let resWeather = JSON.parse(res.text);
                    let results = resWeather.query.results.channel;

                    // console.log('queryCount', resWeather.query.count);
                    // console.log('results', results);

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
                <input
                    type="text"
                    onChange={this.handleCityNameChange}
                    id="cityName"
                    className="form-control"
                    placeholder={"Enter City Name"}
                    required
                />
                <button
                    className="Search"
                    onClick={this.loadFromYahooWeatherApi.bind(this)}
                    type="button"
                >
                    {"Search"}
                </button>
                <WeatherTitle
                    location={this.state.weatherData.location}
                />
                <WeatherDate
                    wind={this.state.weatherData.wind}
                    units={this.state.weatherData.units}
                    condition={this.state.weatherData.condition}
                />
                <WeatherForecasts
                    forecast={this.state.weatherData.forecast}
                    units={this.state.weatherData.units}
                    name={this.state.cityName}
                />
            </div>
        );
    }
}


export default Weather;
