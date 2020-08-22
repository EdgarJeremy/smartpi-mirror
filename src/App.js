import React from 'react';
import Clock from 'react-clock';
import { OpenWeatherMap } from './ReactWeather';
import './App.css';
import 'react-clock/dist/Clock.css';

class App extends React.Component {
  state = {
    now: new Date()
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({ now: new Date() });
    }, 1000);
  }
  render() {
    const { now } = this.state;
    return (
      <div>
        <div className="announcements">
          <marquee>Lorem ipsum, atau ringkasnya lipsum, adalah teks standar yang ditempatkan untuk mendemostrasikan elemen grafis atau presentasi visual seperti font, tipografi, dan tata letak.</marquee>
        </div>
        <div className="world-info">
          <div className="clock">
            <Clock value={now} />
          </div>
          <div className="weather">
            <OpenWeatherMap city="Manado" country="ID" appid="f4021121e0f3d767f2d553d146bc09f7" />
          </div>
        </div>
        <div className="greetings">
          Selamat {now.getHours() > 0 && now.getHours() < 12 ? 'Pagi' : (now.getHours() > 12 && now.getHours() < 18 ? 'Sore' : 'Malam')}
        </div>
        <div className="agendas">
          <ul className="timeline">
            <li className="timeline__line"></li>
            <li className="timeline__item">
              <div className="info">
                <div className="dot"></div>
                <time className="time">08:00</time>
                <h4 className="title">Leaving Home</h4>
              </div>
            </li>
            <li className="timeline__item">
              <div className="info">
                <div className="dot"></div>
                <time className="time">09:30</time>
                <h4 className="speaker">Event 01</h4>
              </div>
            </li>
            <li className="timeline__item">
              <div className="info">
                <div className="dot"></div>
                <time className="time">11:30</time>
                <h4 className="speaker">Event 02</h4>
              </div>
            </li>
            <li className="timeline__item break">
              <div className="info">
                <div className="dot"></div>
                <time className="time">12:00</time>
                <h4 className="title">Lunch</h4>
              </div>
            </li>
            <li className="timeline__item">
              <div className="info">
                <div className="dot"></div>
                <time className="time">13:00</time>
                <h4 className="speaker">Event 03</h4>
              </div>
            </li>
            <li className="timeline__item end">
              <div className="info">
                <div className="dot"></div>
                <time className="time">18:30</time>
                <h4 className="title">Back to home</h4>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default App;
