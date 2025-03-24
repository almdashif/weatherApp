interface WeatherIcons {
    [key: string]: NodeJS.Require;
}

export const weatherIcons: WeatherIcons = {
    'clear-day': require('../Images/weather/sunny.png'), // ☀️
    'clear-night': require('../Images/weather/clear-night.png'), // 🌙
    'rain': require('../Images/weather/rainy.png'), // 🌧️
    'snow': require('../Images/weather/snowy.png'), // ❄️
    'sleet': require('../Images/weather/sleet.png'), // 🌨️
    'wind': require('../Images/weather/windy.png'), // 🌬️
    'fog': require('../Images/weather/foggy.png'), // 🌫️
    'cloudy': require('../Images/weather/cloudy.png'), // ☁️
    'partly-cloudy-day': require('../Images/weather/partly-cloudy.png'), // ⛅
    'partly-cloudy-night': require('../Images/weather/partly-cloudy-night.png'), // 🌥️
    'default': require('../Images/weather/cloudy.png'), // 🌈
};
