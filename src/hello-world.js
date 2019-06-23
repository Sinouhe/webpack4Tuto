import HelloWorldButton from "./components/hello-world-button/hello-world-button";
import addImage from './add-image'
import Heading from './components/heading/heading'
import React from 'react';

const heading = new Heading();
heading.render('hello world');
const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();
//addImage();

if (process.env.NODE_ENV === 'production') {
    console.log('production mode')
} else if (process.env.NODE_ENV === 'development') {
    console.log('dev mode')
}

helloWorldButton.methodThatNotExist();