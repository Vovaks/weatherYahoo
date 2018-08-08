import React, {Component} from 'react';

export default class WeatherTitle extends Component {
    render() {
        if (!this.props.location) return <p>Loading...</p>;

        let city = this.props.location.city;
        let country = this.props.location.country;

        return (
            <div className={'component'}>
                <div className={"display-3"} key={city}>
                    {city}, {country}
                </div>
            </div>
        )
    }
}
