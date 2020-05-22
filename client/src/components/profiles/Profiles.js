import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Spinner from './../layouts/Spinner';
import { getProfiles } from './../../actions/profile';
import PropTypes from 'prop-types';
import ProfileItem from './ProfilesItem';
const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
	useEffect(
		() => {
			getProfiles();
		},
		[ getProfiles ]
	);
	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<Fragment>
					<h1 className="large text-primary">Developers</h1>
					<p className="lead">
						<i className="fab fa-connectdevelop" />Browse and connect with developers
					</p>
					<div className="profiles">
						{profiles.length > 0 ? (
							profiles.map((profile) => <ProfileItem key={profile._id} profile={profile} />)
						) : (
							<h3>No profile found... </h3>
						)}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};
const mapStateToProps = (state) => ({
	profile: state.profile
});
Profiles.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.array.isRequired
};
export default connect(mapStateToProps, { getProfiles })(Profiles);
