import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from './../layouts/Spinner';
import { getGitHubRepos } from '../../actions/profile';
const ProfileGithub = ({ username, getGitHubRepos, repos }) => {
	useEffect(
		() => {
			getGitHubRepos(username);
		},
		[ getGitHubRepos(username) ]
	);
	return <div />;
};

ProfileGithub.propTypes = {
	ProfileGithub: PropTypes.func.isRequired,
	repos: PropTypes.array.isRequired,
	username: PropTypes.string.isRequired
};
const mapStateToProps = (state) => ({
	repos: state.profile.repos
});
export default connect(mapStateToProps, { getGitHubRepos })(ProfileGithub);
