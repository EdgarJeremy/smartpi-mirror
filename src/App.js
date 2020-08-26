import React from 'react';
import Clock from 'react-clock';
import SiriusAdapter from '@edgarjeremy/sirius.adapter';
import { OpenWeatherMap } from './ReactWeather';
import './App.css';
import 'react-clock/dist/Clock.css';

const { REACT_APP_SERVER_API, REACT_APP_SERVER_PORT } = process.env;

const adapter = new SiriusAdapter(REACT_APP_SERVER_API, REACT_APP_SERVER_PORT, localStorage);

class App extends React.Component {
  state = {
    now: new Date(),
    models: null,
    announcements: null,
    agendas: null
  }

  async fetchAnnouncements() {
    const { models } = this.state;
    const date = new Date();
    const announcements = await models.Announcement.collection({
      attributes: ['id', 'description', 'date'],
      where: {
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      }
    });
    this.setState({ announcements });
  }

  async fetchAgendas() {
    const { models } = this.state;
    const date = new Date();
    const agendas = await models.Agenda.collection({
      attributes: ['id', 'description', 'date', 'time'],
      where: {
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      }
    });
    this.setState({ agendas });
  }

  componentDidMount() {
    adapter.connect().then((models) => {
      this.setState({ models }, () => {
        setInterval(() => {
          this.setState({ now: new Date() });
          this.fetchAnnouncements();
          this.fetchAgendas();
        }, 1000);
      });
    });
  }
  render() {
    const { now, announcements, agendas } = this.state;
    return (
      <div>
        <div className="announcements">
          <marquee>
            {announcements ? announcements.rows.map((a, i) => (
              <span>[{a.date}] {a.description} — </span>
            )) : 'memuat pengumuman...'}
          </marquee>
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
            {agendas ? agendas.rows.map((ag, i) => (
              i !== agendas.rows.length ? (
                <li className="timeline__item">
                  <div className="info">
                    <div className="dot"></div>
                    <time className="time">{ag.time}</time>
                    <h4 className="title">{ag.description}</h4>
                  </div>
                </li>
              ) : (
                  <li className="timeline__item end">
                    <div className="info">
                      <div className="dot"></div>
                      <time className="time">{ag.time}</time>
                      <h4 className="title">{ag.description}</h4>
                    </div>
                  </li>
                )
            )) : (null)}
          </ul>
        </div>
      </div>
    )
  }
}

export default App;
