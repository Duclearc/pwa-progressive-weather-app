export default function weatherCardComponent(props) {
    console.log(`https://openpropsmap.org/img/wn/${props.weather.weather[0].icon}@2x.png`, 'PROPS')
    return (
        <div className="city">
                    <h2 className="city-name">
                        <span>
                            {props.weather.name}
                        </span>
                        <sup>
                            {props.weather.sys.country}
                        </sup>
                    </h2>
                    <div className="city-temp">
                        {Math.round(props.weather.main.temp)}
                        <sup>
                            &deg;C
                        </sup>
                    </div>
                    <div className="info">
                        <img
                            className="city-icon"
                            src={`https://openpropsmap.org/img/wn/${props.weather.weather[0].icon}@2x.png`} 
                            alt={props.weather.weather[0].description}
                        />
                        <span className="city-temp-description">{props.weather.weather[0].description}</span>
                    </div>
                </div>
    )
  }