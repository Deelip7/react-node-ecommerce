import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Dimmer, Loader, Message } from 'semantic-ui-react';

const Profile = () => {
  const userDetail = useSelector((state) => state.userLogin);

  const { loading, userInfo, error } = userDetail;

  return <></>;
};

export default Profile;
