import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addComment } from '../../actions/posts';
import { connect } from 'react-redux';

const CommentForm = ({ postId, addComment }) => {
	const [ text, setText ] = useState('');
	return (
		<div className="post-form">
			<div className="bg-primary p">
				<h3>Leave a comment</h3>
			</div>
			<form
				className="form my-1"
				onSubmit={(e) => {
					e.preventDefault();
					addComment(postId, { text });
					setText('');
				}}
			>
				<textarea
					name="text"
					cols={30}
					rows={5}
					placeholder="Create a post"
					onChange={(e) => setText(e.target.value)}
					required
					value={text}
				/>
				<input type="submit" className="btn btn-dark my-1" defaultValue="Submit" />
			</form>
		</div>
	);
};

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired
};

export default connect(null, { addComment })(CommentForm);
