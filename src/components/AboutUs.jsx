import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import {
  Row,
  Col,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { teamInfo } from '../utils'

const styles = {
  container: {
    textAlign: 'center',
    color: 'white',
  },
  card: {
  },
  desc: {
    overflowWrap: 'break-word',
    fontSize: '1.5em',
    marginTop: '0.6em',
  },
  icons: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    margin: '0 0.4em',
    fontSize: '2em',
    color: '#ed4d7e',
  },
};

class AboutUs extends Component {
  constructor(props) {
    super(props);

    this.handleTeamInfoRender = this.handleTeamInfoRender.bind(this)
  }

  handleTeamInfoRender(){
    return teamInfo.map(teamMember => (
      <Col xsOffset={1} xs={10} md={4} mdOffset={0} key={teamMember.name} style={styles.card}>
        <h1 style={{ fontSize: '4em' }}>{teamMember.name}</h1>
        <Avatar src={teamMember.img} size={180} />
        <p style={styles.desc}>
          {teamMember.description}
        </p>
        <div style={styles.icons}>
          {teamMember.icons.map(socialIcons => (
            <a key={socialIcons.href} href={socialIcons.href}>
              <i style={styles.icon} className={`fa ${socialIcons.faClass} fa-lg`} />
            </a>
          ))}
        </div>
      </Col>
    ))
  }

  render() {

    return (
      <div style={styles.container}>
        <Row>
          <Col>
            <Link to="/" style={{ color: 'white', position: 'absolute', left: '1em', fontSize: '2em', zIndex: 10 }}>
              <i className="fa fa-arrow-left" />
              Back
            </Link>
          </Col>
        </Row>
        <Row style={{ marginTop: '1em' }}>
          { this.handleTeamInfoRender() }
        </Row>
      </div>
    );
  }
}

export default AboutUs
