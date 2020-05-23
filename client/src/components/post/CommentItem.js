import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/posts';

const CommentItem = ({ auth, deleteComment, postId, comment: { _id, text, name, user, date } }) => {
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
					Post on <Moment format="YYYY/MM/DD">{date}</Moment>
				</p>
				{!auth.loading &&
				user === auth.user._id && (
					<button onClick={(e) => deleteComment(postId, _id)} type="button" className="btn btn-danger">
						<i className="fas fa-times" />
					</button>
				)}
			</div>
		</div>
	);
};

CommentItem.propTypes = {
	postId: PropTypes.number.isRequired,
	auth: PropTypes.object.isRequired,
	comment: PropTypes.object.isRequired,
	deleteComment: PropTypes.func.isRequired
};
const mapStateToProp = (state) => ({
	auth: state.auth
});
export default connect(mapStateToProp, { deleteComment })(CommentItem);
