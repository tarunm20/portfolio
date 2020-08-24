import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Social from './social';

function Footer() {
  return (
    <div className="footer" style={{bottom:"0px"}}>
      <Row md={12}>
        <Col>
          <Social />
        </Col>
        <Col>
          <span className="credits d-flex justify-content-end">Website made by Tarun Murugan</span>
        </Col>
      </Row>
    </div>
  );
}

export default Footer;