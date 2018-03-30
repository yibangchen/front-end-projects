import React, { Component } from 'react';
import axios from '../../../axios';

import { Route } from 'react-router-dom';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import './Posts.css';

class Posts extends Component {
	
    state = {
        posts: []
    }

    componentDidMount () {

    	console.log(this.props);

        axios.get('/posts')
            .then(res => {
                const posts = res.data.slice(0, 4);
                const updatedPosts =posts.map(p => {
                    return {
                        ...p,
                        author: 'Kitten'
                    }
                });
                this.setState({posts: updatedPosts});
            })
            .catch(err => { console.log(err) });
    }

    postSelectedHandler = (id) => {
    	this.props.history.push({ pathname: '/' + id});
        // this.setState({selectedPostId: id});
    }

	render () {

		let posts = <p style={{textAlign: "center"}}>Something went wrong</p>

        if (! this.state.error) {
            posts = this.state.posts.map(
                p => {
                    return (
                    	// <Link to={'/' + p.id} key={p.id}>
                    		<Post 
                    			key={p.id}
                                title={p.title} 
                                author={p.author} 
                                clicked={ ()=> this.postSelectedHandler(p.id) }/>
                        // </Link>
                    )
                }
            );
        }

		return (
			<div>
	            <section className="Posts">
	                { posts }
	            </section>
	            <Route path="/:id" exact component={FullPost} />
			</div>
		);
	}
}

export default Posts;