import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGithub, faInstagram} from "@fortawesome/free-brands-svg-icons";

function Social() {
  return (
    <div className="f-social-container">
      <a href="https://github.com/tarunm20" className="github social">
        <FontAwesomeIcon icon={faGithub} size="2x" />
      </a>
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className="instagram social">
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </a>
    </div>
  );
}
 
export default Social;