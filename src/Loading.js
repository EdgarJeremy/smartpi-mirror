import React from 'react';
import './App.css';

export default class Loading extends React.Component {

    render() {
        return(
            <div style={{textAlign: 'center', marginTop: 200}}>
                <img width="100%" src={require('./loading.gif')} />
                <h2>Menunggu koneksi...</h2>
            </div>
        )
    }

}