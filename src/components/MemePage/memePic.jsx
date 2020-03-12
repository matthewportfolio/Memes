/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import posed from 'react-pose';

const Image = posed.img({
    default: { scale: 1, zIndex: 1 },
    zoom: { scale: 1.4, zIndex: 2 }
});

class MemePic extends Component {
    constructor() {
        super();

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    state = { isZoomed: false };

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.onFocus(false);
            return this.setState({ isZoomed: false });
        }
    }

    zoomIn() {
        window.addEventListener('scroll', this.zoomOut);
        window.addEventListener('mousedown', this.handleClickOutside);
        this.props.onFocus(true);
        return this.setState({ isZoomed: true });
    }

    zoomOut = () => {
        window.removeEventListener('scroll', this.zoomOut);
        window.removeEventListener('mousedown', this.handleClickOutside);
        this.props.onFocus(false);
        return this.setState({ isZoomed: false });
    };

    toggleZoom = () => this.state.isZoomed ? this.zoomOut() : this.zoomIn();

    render() {

        const { image } = this.props;

        return (
            <Image
                ref={this.setWrapperRef}
                src={image.url}
                draggable='false'
                className='card-img-top meme'
                pose={this.state.isZoomed ? 'zoom' : 'default'}
                onClick={this.toggleZoom}
            />
        );
    }
}

export default MemePic;