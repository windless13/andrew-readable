import React from 'react';
import { Route } from 'react-router-dom'

import * as ReadableAPI from './ReadableAPI.js';
import PostList from './components/PostList.js';
import Header from './components/Header.js';
import SideNav from './components/SideNav.js';

class Readable extends React.Component {
    componentDidMount() {
        console.log('hi');
        ReadableAPI.getPostsFromCategory('react').then((result) => {
            console.log(result);
        });
    }



    render() {
        return (
            <div>
                <Header/>
                <SideNav/>
                <Route
                    exact path='/'
                    render={() => (
                        <PostList />
                    )}
                >
                </Route>
            </div>
        );
    }
}

export default Readable;
