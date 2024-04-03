/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 2nd April  2024
    Application : FoodWise
    ----------------------------------------------------
*/

import React from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../containers/LoginContainer/UserContext";
import "./ViewProfile.css";

const ViewProfile = ({ userData }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { email, profile } = user;

  // Function to format the date of birth
  const formatDateOfBirth = (timestamp) => {
    if (!timestamp) return ""; // Return empty string if timestamp is not provided

    // Convert the string timestamp to a number
    const timestampNumber = parseInt(timestamp);

    return format(new Date(timestampNumber), "MMMM dd yyyy, EEEE"); // Format the date using date-fns
  };

  const handleEditProfile = () => {
    // Navigate to the edit profile page
    navigate("/editprofile");
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div></div>
        <h2>User Profile</h2>
        <button className="btn btn-lg btn-success" onClick={handleEditProfile}>
          Edit Profile
        </button>
      </div>
      <hr />
      <div className="profile-body">
        <div className="profile-image">
          <img src={profile.profileImage} alt="Profile" />
        </div>
        <div className="profile-details">
          <div className="profile-row">
            <span className="profile-label">Email:</span>
            <span className="profile-value">{email}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Name:</span>
            <span className="profile-value">
              {profile.firstName} {profile.lastName}
            </span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Date of Birth:</span>
            <span className="profile-value">
              {formatDateOfBirth(profile.dateOfBirth)}
            </span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Phone Number:</span>
            <span className="profile-value">{profile.phoneNumber}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Address:</span>
            <span className="profile-value">{profile.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
