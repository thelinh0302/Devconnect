import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import DashboardAction from './DashboardAction';
import Experiences from './Experiences';
import Education from './Education';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
const Dashboard = ({ getCurrentProfile, auth: { user }, profiles: { profile, loading }, deleteAccount }) => {
	useEffect(
		() => {
			getCurrentProfile();
		},
		[ getCurrentProfile ]
	);
	return loading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className="large text-primary">Dashboard </h1>
			<p className="lead">
				<i className="fas-fa-user" /> Welcome {user && user.name}
			</p>
			{profile !== null ? (
				<Fragment>
					<DashboardAction />
					<Experiences experience={profile.experience} />
					<Education education={profile.education} />
					<div className="my-2">
						<button onClick={() => deleteAccount()} className="btn btn-danger">
							<i className="fas fa-user-minus" />
							Delete My Account
						</button>
					</div>
				</Fragment>
			) : (
				<Fragment>
					<p>You have not yet setup profile,please add some info </p>
					<Link to="/create-profile" className="btn btn-primary my-1">
						Add Profile{' '}
					</Link>
				</Fragment>
			)}
		</Fragment>
	);
};
Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profiles: PropTypes.object.isRequired,
	deleteAccount: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
	profiles: state.profile,
	auth: state.auth
});
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
