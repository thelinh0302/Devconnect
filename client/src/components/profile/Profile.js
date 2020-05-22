import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
const Profile = ({ getProfileById, profile: { profile, loading }, auth, match }) => {
	useEffect(
		() => {
			getProfileById(match.params.id);
		},
		[ getProfileById, match.params.id ]
	);
	return (
		<Fragment>
			{profile === null || loading ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to="/profiles" className="btn btn-light">
						Back to Profiles
					</Link>
					{auth.isAuthenticated &&
					auth.loading === false &&
					auth.user._id === profile.user._id && (
						<Link to="/edit-profile" className="btn btn-dark">
							Edit Profile
						</Link>
					)}
					<div className="profile-grid my-1">
						{/* Top */}
						<ProfileTop profile={profile} />
						{/* About */}
						<ProfileAbout profile={profile} />

						{/* Experience */}

						<div className="profile-exp bg-white p-2">
							<h2 className="text-primary">Experience</h2>
							{profile.experience.length > 0 ? (
								<Fragment>
									{profile.experience.map((experience) => (
										<ProfileExperience
											key={experience._id}
											dateFrom={experience.from}
											experience={experience}
										/>
									))}
								</Fragment>
							) : (
								<h4> No experience credential </h4>
							)}
						</div>
						{/* Education */}
						<div className="profile-edu bg-white p-2">
							<h2 className="text-primary">Education</h2>
							{profile.education.length > 0 ? (
								<Fragment>
									{profile.education.map((education) => <ProfileEducation education={education} />)}
								</Fragment>
							) : (
								<h4> No education </h4>
							)}
						</div>
						{/* Github */}
						{/* {/* {profile.githubusername && <ProfileGithub username={profile.githubusername} />}
						<div className="profile-github">
							<h2 className="text-primary my-1">
								<i className="fab fa-github" /> Github Repos
							</h2>
							<div className="repo bg-white p-1 my-1">
								<div>
									<h4>
										<a href="#" target="_blank" rel="noopener noreferrer">
											Repo One
										</a>
									</h4>
									<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, laborum!</p>
								</div>
								<div>
									<ul>
										<li className="badge badge-primary">Stars: 44</li>
										<li className="badge badge-dark">Watchers: 21</li>
										<li className="badge badge-light">Forks: 25</li>
									</ul>
								</div>
							</div>
							<div className="repo bg-white p-1 my-1">
								<div>
									<h4>
										<a href="#" target="_blank" rel="noopener noreferrer">
											Repo Two
										</a>
									</h4>
									<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, laborum!</p>
								</div>
								<div>
									<ul>
										<li className="badge badge-primary">Stars: 44</li>
										<li className="badge badge-dark">Watchers: 21</li>
										<li className="badge badge-light">Forks: 25</li>
									</ul>
								</div>
							</div>
						</div> */}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth
});
export default connect(mapStateToProps, { getProfileById })(Profile);
