import React from 'react';
import { Route } from 'react-router-dom'

import PostList from './components/PostList.js';
import Header from './components/Header.js';
import SideNav from './components/SideNav.js';

class Readable extends React.Component {
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
