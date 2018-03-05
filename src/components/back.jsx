import React from 'react';
import {
  Row,
  Col,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default () => (
  <Row>
    <Col>
      <Link to="/" style={{ color: 'white', position: 'absolute', left: '1em', fontSize: '2em', zIndex: 10 }}>
        <i className="fa fa-arrow-left" />
        Back
      </Link>
    </Col>
  </Row>
);
