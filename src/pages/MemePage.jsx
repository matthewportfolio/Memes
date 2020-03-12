import React, { Component } from 'react';
import Memes from '../components/MemePage/memes';

class MemePage extends Component {
    render() {
        document.title = 'memes';
        return (
            <React.Fragment>
            <div className='logo'>
                <h1 className='title'>memes</h1>
                <h2 className='createdBy'>created by fripp#4444</h2>
                <img className='logo' src='https://i.imgur.com/rvHV38S.png' />
            </div>
            <Memes />
            </React.Fragment>
        );
    }
}

export default MemePage;
