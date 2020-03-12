import React, { Component } from 'react';
import posed from 'react-pose';

const Box = posed.div({
    hoverable: true,
    pressable: true,
    init: {
        scale: 1,
    },
    hover: {
        scale: 1.2,
    },
    press: {
        scale: 1.1,
    }
});
class NotFoundPage extends Component {
    render() {
        document.title = '404';
        return (
            <Box>
                <h1 className='text-center error'>404</h1>
                <h2 className='text-center text-white'>Not Found :(</h2>
            </Box>
        );
    }
}

export default NotFoundPage;