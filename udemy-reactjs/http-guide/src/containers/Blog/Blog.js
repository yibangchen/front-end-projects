import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost'

class Blog extends Component {

    render () {

        return (
            <div>
                <header className="Blog">
                    <nav>
                        <ul>
                            <li><NavLink 
                                to="/" exact
                                activeClassName="active"
                                activeStyle={{ color:'#fa923f' }}>Home</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                            <li></li>
                        </ul>
                    </nav>
                </header>

                {/*<Route path="/" exact render={() => <h1>Home</h1>} />
                    Mind the order of route! :id would overwrite all following
                */}
                <Switch>
                    <Route path="/new-post" component={NewPost} />
                    <Route path="/" component={Posts} />
                </Switch>
            </div>
        );
    }
}

export default Blog;