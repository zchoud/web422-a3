import React from 'react';
import JumboHead from './elements/JumboHead'

function NotFound() {
  return <div>
    {<JumboHead
          head={`Nothing to show`}
          subtitle={``}
        /> }
  </div>;
}

export default NotFound;