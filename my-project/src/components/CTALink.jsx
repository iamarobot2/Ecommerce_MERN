import React from 'react';
import { Link } from 'react-router-dom';

function CTALink(props) {
    return (
        <Link to={props.link} className='flex flex-row items-center justify-center w-full bg-purple-700 text-white h-10 rounded-sm px-4 hover:bg-purple-500 hover:text-black hover:font-bold' >{props.text}</Link>
    );
}

export default CTALink;