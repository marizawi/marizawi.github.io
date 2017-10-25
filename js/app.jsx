import React from 'react';
import ReactDOM from 'react-dom';
import { Router,
    Route,
    Link,
    IndexLink,
    IndexRoute,
    hashHistory
} from 'react-router';

document.addEventListener('DOMContentLoaded', function(){

    class App extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                citiesSea: ["Paris", "Tokyo", "Washington, D.C.", "Rome", "Seoul", "Tirana", "Buenos Aires", "Canberra", "Phnom Penh", "Havana", "Copenhagen", "Helsinki", "Reykjavik", "Jerusalem", "Jakarta", "Tarawa", "Beirut", "Kuala Lumpur", "Rabat", "Amsterdam", "Lima", "Doha", "Singapore", "Bangkok", "Hanoi", "Santiago", "Montevideo", "Dublin", "Lisbon"],
                citiesMount: ["Madrid", "Tokyo", "Rome", "Seoul", "Tirana", "Buenos Aires", "Canberra", "Ottawa", "Jerusalem", "Rabat", "Lima"],
                citiesBoth: ["Paris", "Madrid", "Tokyo", "Washington, D.C.", "London", "Rome", "Tirana", "Buenos Aires", "Canberra", "Brasilia", "Phnom Penh", "Ottawa", "Havana", "Copenhagen", "Helsinki", "Berlin", "Jerusalem", "Jakarta", "Tarawa", "Beirut", "Kuala Lumpur", "Rabat", "Amsterdam", "Lima", "Doha", "Singapore", "Bangkok", "Hanoi", "Harare", "Santiago", "Montevideo", "Dublin", "Lisbon"],
                city: "",
                visibility: true,
                weather: false,
                info: false,
                map: false,
                tab: false,
                about: false,
                text: true,
                selectedRadio: "Sea",
            }
        }

        handleAbout = () => {
            this.setState({
                about: !this.state.about,
                text: !this.state.text,
            })
        }

        getRandCity() {
            if (this.state.selectedRadio === "Sea") {
                let randSea = Math.floor(Math.random() * this.state.citiesSea.length);
                return this.state.citiesSea[randSea];
            } else if (this.state.selectedRadio === "Mountains") {
                let randMount = Math.floor(Math.random() * this.state.citiesMount.length);
                return this.state.citiesMount[randMount];
            } else {
                let randBoth = Math.floor(Math.random() * this.state.citiesBoth.length);
                return this.state.citiesBoth[randBoth];
            }
        }

        handleClick = () => {
            this.setState({
                city: this.getRandCity(),
                visibility: false,
                tab: "",
            })
        }

        handleWeather = () => {
            this.setState({
                weather: true,
                tab: "weather",
            })
        }

        handleInfo = () => {
            this.setState({
                info: true,
                tab: "info",
            })
        }

        handleMap = () => {
            this.setState({
                map: true,
                tab: "map",
            })
        }

        handleRadioChange = (event) => {
            this.setState({
                selectedRadio: event.currentTarget.value,
            })
        };

        render() {
            const visibility = this.state.visibility ? "none" : "block";

            const style = {
                display: visibility,
            }

            let weather = null;

            if (this.state.weather && this.state.tab === "weather") {
                weather = <Weather city={this.state.city} />
            }

            let information = null;

            if (this.state.info && this.state.tab === "info") {
                information = <Info city={this.state.city} defaultText={"Do you want to see exchange rate?"} />
            }

            let map = null;

            if (this.state.map && this.state.tab === "map") {
                map = <Map city={this.state.city} />
            }

            let text = null;

            if (this.state.text) {
                text = "ABOUT"
            } else {
                text = "MAIN"
            }

            let about = null;

            if (this.state.about) {
                about = <div className="about">
                    <div>
                        <h3>If you can't decide on your holiday destination - this is the place for you!</h3>
                        <p>This simple application helps you find random place for your vacations. Additionally, it presents basic information about chosen country, it shows current weather and in case you have no idea where the country is located, the map helps you out.</p>
                        <h2>Check it out!</h2>
                    </div>
                </div>
            } else {
                about = <div className="city-input-parent">
                    <div className="click-section">
                        <div className="input-section">
                            <div>
                            <input id="city-input" value={this.state.city} />
                                <div className="choice">
                                    <input type="radio" value="Sea" checked={this.state.selectedRadio === 'Sea'} onChange={this.handleRadioChange} /> Sea
                                    <input type="radio" value="Mountains" checked={this.state.selectedRadio === 'Mountains'} onChange={this.handleRadioChange} /> Mountains
                                    <input type="radio" value="Nevermind" checked={this.state.selectedRadio === 'Nevermind'} onChange={this.handleRadioChange} /> Never mind
                                </div>
                            <input className="city-button" onClick={this.handleClick} value="Click" type="submit" />
                            </div>
                            <div className="links" style={style}>
                            <a onClick={this.handleInfo}>Info</a> <a onClick={this.handleWeather}>Weather</a> <a onClick={this.handleMap}>Map</a>
                            </div>
                        </div>
                    </div>
                    {information}
                    {weather}
                    {map}
                </div>
            }

            return (
                <div id="container">
                <header>
                    <div>
                        <h1>NAMBY-PAMBY</h1>
                        <h3>you are just one click away from finding your holiday destination</h3>
                        <hr/>
                    </div>
                    <div>
                        <h2 onClick={this.handleAbout}>{text}</h2>
                    </div>
                </header>
                {about}
                <footer>
                    <hr/>
                    <div>
                        <h3>&copy; Maria Zawiązalec</h3>
                        <a href="https://github.com/marizawi"><img src="./images/github.png"/></a>
                        <a href="https://www.linkedin.com/in/maria-zawiazalec/"><img src="./images/linkedin.png"/></a>
                    </div>
                </footer>
                </div>
            )
        }
    }

    class Info extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                inform: false,
                currency: null,
                exch: false,
                text: this.props.defaultText,
            }
        }

        setCurrency = (currency) => {
            this.setState({
                currency: currency,
            })
        }

        handleExch = () => {
            this.setState({
                exch: true,
            })
        }

        handleMouseEnter = () => {
            this.setState({
                text: "Click",
            })
        }

        handleMouseLeave = () => {
            this.setState({
                text: this.props.defaultText,
            })
        }

        render() {
            let exch = null;

            if (this.state.exch) {
                exch = <Exchange city={this.props.city} currency={this.state.currency} />
            }

            if(this.state.inform) {
                return <div className="info">
                    <div className="row">
                        <div className="country-flag">
                            <img src={this.state.inform[0].flag} />
                        </div>
                        <div className="country-info">
                            <div className="country-name">
                                <h2>{this.state.inform[0].name}</h2>
                                <h2>{this.state.inform[0].region}</h2>
                            </div>
                            <p><strong>Language:</strong> {this.state.inform[0].languages[0].name}</p>
                            <p><strong>Area:</strong> {this.state.inform[0].area} km<sup>2</sup></p>
                            <p><strong>Population:</strong> {this.state.inform[0].population}</p>
                            <p><strong>Currency:</strong> {this.state.inform[0].currencies[0].code}</p>
                        </div>
                    </div>
                    <h2 onClick={this.handleExch} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>{this.state.text}</h2>
                    {exch}
                </div>
            }
            return <h2>Loading...</h2>
        }

        componentDidMount() {
            var apiInfoUrl = "https://restcountries.eu/rest/v2/capital/"
            console.log(apiInfoUrl)
            $.ajax({
                url: apiInfoUrl+this.props.city
            })
                .done((response) => {
                    console.log(response);
                    this.setCurrency(response[0].currencies[0].code);
                    this.setState({
                        inform: response,
                    })
                })
                .fail(function(error){
                    console.log(error);
                })
        }
    }

    class Weather extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                data: false,
            }

            this.icons = {};

            this.icons["01d"] = "./images/png/sunny.png";
            this.icons["01n"] = "./images/png/moon-1.png";
            this.icons["02d"] = "./images/png/clouds-1.png";
            this.icons["02n"] = "./images/png/cloudy-night.png";
            this.icons["03d"] = "./images/png/clouds.png";
            this.icons["03n"] = "./images/png/clouds.png";
            this.icons["04d"] = "./images/png/clouds.png";
            this.icons["04n"] = "./images/png/clouds.png";
            this.icons["09d"] = "./images/png/summer-rain.png";
            this.icons["09n"] = "./images/png/stars.png";
            this.icons["10d"] = "./images/png/raining.png";
            this.icons["10n"] = "./images/png/raining.png";
            this.icons["11d"] = "./images/png/storm.png";
            this.icons["11n"] = "./images/png/storm-2.png";
            this.icons["13d"] = "./images/png/snowing.png";
            this.icons["13n"] = "./images/png/snowing.png";
            this.icons["50d"] = "./images/png/sunset-2.png";
            this.icons["50n"] = "./images/png/moon-13.png";

        }
        render() {
            if(this.state.data) {
                const icon = this.icons[this.state.data.weather[0].icon];
                if (typeof icon !== "undefined") {
                    return <div className="weather">
                        <div className="row">
                            <div className="weather-main">
                                <h1>{this.state.data.name}</h1>
                                <h2>{this.state.data.weather[0].main}</h2>
                                <h3>{Math.ceil(this.state.data.main.temp)} °C</h3>
                            </div>
                            <div className="weather-icon">
                                <img src={icon}/>
                            </div>
                        </div>
                    </div>
                } else {
                    return <div>Unfortunately no data</div>
                }
            }
            return <h2>Loading...</h2>
        }

        componentDidMount() {
            var apiWeatUrl = "https://api.openweathermap.org/data/2.5/weather?q="+this.props.city+"&units=metric&appid=1035af6c108ae667219e8190d9da9f4e"
            $.ajax({
                url: apiWeatUrl
            })
             .done((response) => {
                console.log(response);
                this.setState({
                    data: response,
                })
             })
             .fail(function(error){
                 console.log(error);
                })
        }
    }

    class Map extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                maps: false,
            }
        }

        render() {
            return <div id="map"></div>
        }

        componentDidMount() {
                this.map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 6,
                    center: {lat: -34.397, lng: 150.644}
                });
                var geocoder = new google.maps.Geocoder();

                var address = this.props.city;
                geocoder.geocode({'address': address}, (results, status) => {
                    if (status === 'OK') {
                        this.map.setCenter(results[0].geometry.location);
                        var marker = new google.maps.Marker({
                            map: this.map,
                            position: results[0].geometry.location
                        });
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });

        }
    }

    class Exchange extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                curr: false,
            }
        }

        render() {
            if(this.state.curr) {
                if (this.props.currency === this.state.curr.base){
                    return <h3>The official currency in {this.props.city} is EUR</h3>
                } else if (typeof this.state.curr.rates[this.props.currency] !== "undefined") {
                    return <div>
                        <h2>1 {this.state.curr.base} - {this.state.curr.rates[this.props.currency]} {this.props.currency}</h2>
                    </div>
                } else {
                    return <h3>Unfortunately no data</h3>
                }
            }
            return <h2>Loading...</h2>
        }

        componentDidMount() {
            var apiExUrl = "https://api.fixer.io/latest"
            $.ajax({
                url: apiExUrl
            })
                .done((response) => {
                    console.log(response);
                    this.setState({
                        curr: response,
                    })
                })
                .fail(function(error){
                    console.log(error);
                })
        }
    }


    ReactDOM.render(
        <App />,
        document.getElementById('app')
);
});