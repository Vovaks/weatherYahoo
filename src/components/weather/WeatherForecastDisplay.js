import React from 'react';

const WeatherForecastDisplay = (props) => {
    if (!props.forecast.code) return <p>Loading...</p>;

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm">
                    {props.forecast.day}
                </div>
                <div className="col-sm">
                    <img alt={props.forecast.code}
                         src={"http://l.yimg.com/a/i/us/we/52/" + props.forecast.code + ".gif"}/><br/>
                </div>
                <div className="col-sm">
                    {props.forecast.high}
                    {props.units.temperature}
                </div>
                <div className="col-sm">
                    {props.forecast.low}
                    {props.units.temperature}
                </div>
            </div>
        </div>
    );
};

export default WeatherForecastDisplay;

