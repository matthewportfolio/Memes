import React, { Component } from 'react';
import Meme from './meme';
import InfiniteScroll from 'react-infinite-scroller';
import posed from 'react-pose';

const Dim = posed.div({
    idle: {
        opacity: 0,
        transition: { duration: 100 },
    },
    visible: {
        opacity: 0.8,
        delay: 100,
        transition: { duration: 200 },
    }
});

class Memes extends Component {

    async componentDidMount() {
        const memes = (await fetch('/api/memes').then(res => res.json()));
        return this.setState({ currentMemes: memes.slice(0, 10), memes, initial: false });
    }

    handleFocus = bool => this.setState({ focused: bool });

    loadMore = async () => {
        if (this.state.initial) return;

        const memes = this.state.memes.filter(meme => this.state.currentMemes.every(m => m.id !== meme.id)).slice(0, 10);
        if (!memes.length) return this.setState({ hasMore: false });
        return this.setState({ currentMemes: [...this.state.currentMemes, ...memes] });
    }

    state = {
        memes: [],
        currentMemes: [],
        initial: true,
        hasMore: true,
        focused: false
    }

    render() {

        const { currentMemes, focused } = this.state;

        return (
            <React.Fragment>
                <Dim className='dim' pose={focused ? 'visible' : 'idle'} />
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadMore}
                    hasMore={this.state.hasMore}
                >
                    {currentMemes.map(meme =>
                        <Meme onFocus={this.handleFocus} meme={meme} key={meme.id} on />
                    )}
                </InfiniteScroll>
                {!this.state.hasMore && <p className="text-center text-light">i&#39;m out of memes, sorry! :/</p>}
            </React.Fragment>
        );
    }
}

export default Memes;