import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from './../layouts/Spinner';
import { getPost } from './../../actions/posts';
import PostItem from './PostItem';
import PostForm from './PostForm';
const Posts = ({ posts: { posts, loading }, getPost }) => {
	useEffect(
		() => {
			getPost();
		},
		[ getPost ]
	);
	return loading ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className="large text-primary">Posts</h1>
			<p className="lead">
				<i className="fas fa-user"> </i>Welcome to the community
			</p>
			{/* PostForm */}
			<PostForm />
			<div className="posts">{posts.map((post, index) => <PostItem key={index} post={post} />)}</div>
		</Fragment>
	);
};

Posts.propTypes = {
	getPost: PropTypes.func.isRequired,
	posts: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	posts: state.posts
});
export default connect(mapStateToProps, { getPost })(Posts);
