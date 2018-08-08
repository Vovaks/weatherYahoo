import React, {Component} from 'react';
import request from "superagent";

class Weather extends Component {

    constructor(props) {
        super(props);
        this.handleCityNameChange = this.handleCityNameChange.bind(this);
        this.state = {
            weatherData: {
                location: {
                    city: '',
                    country: '',
                },
                units: {
                    speed: '',
                    temperature: ''
                },
                condition: {
                    code: '32',
                    temp: '',
                    text: ''
                },
                wind: {
                    speed: ''
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

                    console.log('queryCount', resWeather.query.count);
                    console.log('results', results);

                    this.setState({
                        weatherData: {
                            units: results.units,
                            location: results.location,
                            condition: results.item.condition,
                            wind: results.wind,
                            forecast: results.item.forecast
                        }
                    });
                    console.log('weatherData', this.state.weatherData);
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
        let city = this.state.weatherData.location.city;
        let country = this.state.weatherData.location.country;
        let windSpeed = this.state.weatherData.wind.speed;
        let unitsSpeed = this.state.weatherData.units.speed;
        let unitsTemperature = this.state.weatherData.units.temperature;
        let temp = this.state.weatherData.condition.temp;
        let weatherText = this.state.weatherData.condition.text;
        let code = this.state.weatherData.condition.code;

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
                <div>
                    <h2>{city}, {country}</h2><br/>
                </div>
                <div className={"weatherToday"}>
                    {temp} {unitsTemperature}
                    <img alt={weatherText} src={"http://l.yimg.com/a/i/us/we/52/" + code + ".gif"}/><br/>
                    {weatherText}<br/>
                    Wind speed: {windSpeed}({unitsSpeed})
                </div>
                <div className={"forecast"}>

                </div>
            </div>
        );
    }
}


export default Weather;
