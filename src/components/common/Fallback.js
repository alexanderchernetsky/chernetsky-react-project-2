import React from 'react';
import {faSpinner} from "@fortawesome/free-solid-svg-icons/index";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index";

const Fallback =  (
    <div className="mt-5 text-center">
      <FontAwesomeIcon icon={faSpinner} spin size='4x'/>
    </div>
);

export default Fallback;