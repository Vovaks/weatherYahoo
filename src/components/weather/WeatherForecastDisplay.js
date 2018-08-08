import React from 'react';

const WeatherForecastDisplay = (props) => {
    if (!props.forecast.code) return <p>Loading...</p>;
    return (
        <div className="row weatherForecastRow">
            <div className="col-xs-offset-4 col-xs-1">
                <div className="col-xs-1">
                    {props.forecast.day}
                </div>
                <div className="col-xs-1">
                    <img alt={props.forecast.code}
                         src={"http://l.yimg.com/a/i/us/we/52/" + props.forecast.code + ".gif"}/><br/>
                </div>
                <div className="col-xs-1">
                    {props.forecast.high}
                </div>
                <div className="col-xs-1">
                    {props.forecast.low}
                </div>
            </div>
        </div>
    );
};

export default WeatherForecastDisplay;

