import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from './../layouts/Spinner';
import PostItem from './../posts/PostItem';
import { getPostById } from '../../actions/posts';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ getPostById, posts: { post, loading }, match }) => {
	useEffect(
		() => {
			getPostById(match.params.id);
		},
		[ getPostById, match.params.id ]
	);
	return loading || post === null ? (
		<Spinner />
	) : (
		<Fragment>
			<Link to="/posts" className="btn">
				Back to Posts
			</Link>
			<PostItem post={post} showActions={false} />
			<CommentForm postId={post._id} />
			<div className="comments">
				{post.comments.map((comment) => <CommentItem key={comment._id} comment={comment} postId={post._id} />)}
			</div>
		</Fragment>
	);
};

Post.propTypes = {
	getPostById: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	posts: state.posts
});

export default connect(mapStateToProps, { getPostById })(Post);
