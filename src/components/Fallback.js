import React from 'react';
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Fallback =  (
    <div className="mt-5 text-center">
      <FontAwesomeIcon icon={faSpinner} spin size='4x'/>
    </div>
);

export default Fallback;