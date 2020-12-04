import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Dimmer, Loader, Message } from 'semantic-ui-react';

const Profile = () => {
  const userLogin = useSelector((state) => state.userLogin);

  const { loading, userInfo, error } = userLogin;

  return (
    <>
      {/* {userInfo ? (
        loading ? (
          <Dimmer active>
            <Loader size='large' />
          </Dimmer>
        ) : error ? (
          <div>
            <Message style={{ margin: '0 auto', width: '50%' }} error header='Something went wrong. Please try again' list={[error]} />
          </div>
        ) : (
          <div>
            <h1>{userInfo.name}</h1>
          </div>
        )
      ) : null} */}
    </>
  );
};

export default Profile;
