import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
import asyncComponent from '../../hoc/asyncComponent';
// import NewPost from './NewPost/NewPost';
// import asyn 
const AsyncNewPost = asyncComponent( () => {
    return import('./NewPost/NewPost'); // dynamic import 
});

class Blog extends Component {

    state = {
        auth: true
    }

    render () {

        return (
            <div>
                <header className="Blog">
                    <nav>
                        <ul>
                            <li><NavLink 
                                to="/posts" exact
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
                    { this.state.auth ? <Route path="/new-post" component={ AsyncNewPost } /> : null}
                    <Route path="/posts" component={Posts} />
                    <Route render={ () => <h1>Not Found</h1>} />
                    {/*<Redirect from="/" to="/posts" />*/}
                </Switch>
            </div>
        );
    }
}

export default Blog;