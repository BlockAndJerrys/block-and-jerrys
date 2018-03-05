import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import {
  Row,
  Col,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { teamInfo, constants } from '../utils';

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
    color: constants.PINK,
  },
};

class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contributors: [],
    };
    this.handleTeamInfoRender = this.handleTeamInfoRender.bind(this);
    this.handleContributorsRender = this.handleContributorsRender.bind(this);
    axios.get('https://api.github.com/repos/BlockAndJerrys/block-and-jerrys/contributors')
      .then(res => {
        const contributors = res.data.filter(x => !(x.login === 'tangsauce' || x.login === 'robertDurst' || x.login === 'andywong418'));
        contributors.push({ login: 'ewbao', avatar_url: 'https://avatars3.githubusercontent.com/u/5509753?v=4', html_url: 'https://github.com/ewbao' });
        this.setState({ contributors });
      });
  }

  handleContributorsRender() {
    return this.state.contributors.map(x => (
      <div>
        <a href={x.html_url} style={{ color: constants.PINK }}>
          <h2>{x.login}</h2>
        </a>
        <a href={x.html_url}>
          <Avatar src={x.avatar_url} size={150} />
        </a>
      </div>
    ));
  }

  handleTeamInfoRender() {
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
    ));
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
        <Row style={{ marginTop: '1em' }}>
          <h1>Open Source Contributors</h1>
          <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around', padding: '0 30%' }}>
            { this.handleContributorsRender() }
          </div>
        </Row>
      </div>
    );
  }
}

export default AboutUs;
