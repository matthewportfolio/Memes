/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import MemePic from './memePic';
import posed from 'react-pose';

const Modal = posed.div({
    enter: {
        y: 0,
        opacity: 1,
        transition: { duration: 1500 },
        round: true
    },
    invis: {
        y: 50,
        opacity: 0,
        transition: { duration: 1500 }
    }
});

const Info = posed.div({
    closed: { height: 0, transition: { duration: 200 } },
    open: { height: 'auto', transition: { duration: 200 } }
});

const transition = {
    duration: 200,
    ease: [0, 0.36, 0.69, 0.99]
};

const Content = posed.div({
    closed: {
        y: -100,
        transition
    },
    open: {
        y: 0,
        transition
    }
});

class Meme extends Component {

    componentDidMount() {
        this.setState({ isVisible: true });
    }

    state = { clicked: false, isVisible: false, infoOpen: false };

    render() {

        const { meme, onFocus } = this.props;
        const { infoOpen } = this.state;
        const pose = this.state.infoOpen ? 'open' : 'closed';

        return (
            <Modal className='p-4' pose={this.state.isVisible ? 'enter' : 'invis'}>

                <Card style={{ width: '25rem', margin: 'auto' }}>

                    <Card.Title
                        onClick={() => this.setState({ infoOpen: !infoOpen })}
                        style={{ cursor: 'pointer' }}
                        className='p-2 m-0 text-light'>{meme.title}
                    </Card.Title>

                    <MemePic image={meme.image} onFocus={onFocus} />

                    <Info pose={pose}>

                        <Content className='m-2' pose={pose}>
                            <a
                                className='text-secondary font-weight-light m-0'
                                href={`https://www.reddit.com/r/${meme.subreddit}/comments/${meme.id}`}
                                style={{ textDecoration: 'none' }}>r/{meme.subreddit}
                            </a>
                            <p className='text-white m-0'>🡡 {meme.upvotes}</p>
                        </Content>
                        
                    </Info>
                </Card>

            </Modal >
        );
    }
}


export default Meme;