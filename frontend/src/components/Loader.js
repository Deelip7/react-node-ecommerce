import React from 'react';
import { Dimmer, Loader as Spinner } from 'semantic-ui-react';

const Loader = () => {
  return (
    <Dimmer active>
      <Spinner size='massive' />
    </Dimmer>
  );
};

export default Loader;
