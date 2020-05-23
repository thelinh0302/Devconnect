import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from './../../actions/posts';
const PostItem = ({
	post: { _id, text, name, user, likes, comments, date },
	auth,
	addLike,
	removeLike,
	deletePost,
	showActions
}) => {
	console.log(date);
	return (
		<div className="post bg-white p-1 my-1">
			<div>
				<Link to={`/profile/${user}`}>
					{/* <img className="round-img" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200" alt="" /> */}
					<h4>{name}</h4>
				</Link>
			</div>
			<div>
				<p className="my-1">{text}</p>
				<p className="post-date">
					Posted on <Moment format="YYYY/DD/MM">{date}</Moment>
				</p>
				{showActions && (
					<Fragment>
						<button onClick={(e) => addLike(_id)} type="button" className="btn btn-light">
							<i className="fas fa-thumbs-up" />{' '}
							<span>{likes.length > 0 && <span> {likes.length} </span>}</span>
						</button>
						<button onClick={(e) => removeLike(_id)} type="button" className="btn btn-light">
							<i className="fas fa-thumbs-down" />
						</button>
						<Link to={`/posts/${_id}`} className="btn btn-primary">
							Discussion{' '}
							{comments.length > 0 && <span className="comment-count"> {comments.length} </span>}
						</Link>
						{!auth.loading &&
						user === auth.user._id && (
							<button onClick={(e) => deletePost(_id)} type="button" className="btn btn-danger">
								<i className="fas fa-times" />
							</button>
						)}
					</Fragment>
				)}
			</div>
		</div>
	);
};
PostItem.defaultProps = {
	showActions: true
};
PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired
};
const mapStateToprops = (state) => ({
	auth: state.auth
});
export default connect(mapStateToprops, { addLike, removeLike, deletePost })(PostItem);
