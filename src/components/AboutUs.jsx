import React from 'react';
import Avatar from 'material-ui/Avatar';
import {
  Row,
  Col,
} from 'react-bootstrap';

import jeff from '../assets/jeff.jpg';
import rob from '../assets/rob.jpg';
import dros from '../assets/dros.jpg';

const cards = [
  {
    img: rob,
    name: 'Rob Durst',
    description: 'Rob is taking a gap year from Colby College, where he is majoring in Computer Science and Mathematics. When he is not interning at Stellar or getting the most liked cat on CryptoKitties, he is co-organizing the SF Crypto Devs Meetup.',
    flavor: 'Doge Food',
    icons: [
      { href: 'http://robdurst.com/', faClass: 'fa-angle-double-right' },
      { href: 'https://github.com/robertDurst', faClass: 'fa-github' },
      { href: 'https://www.linkedin.com/in/robertdurst/', faClass: 'fa-linkedin' },
      { href: 'https://twitter.com/g_durst', faClass: 'fa-twitter' },
    ],
  },
  {
    img: jeff,
    name: 'Jeff Tang',
    description: 'Jeff is taking a gap year from Rice University, where he is majoring in Computer Science. When he is not thinking about startups and entrepreneurship, he is reading a book and/or listening to music.',
    flavor: 'Vitalik Garcia',
    icons: [
      { href: 'http://tangjeff.com', faClass: 'fa-angle-double-right' },
      { href: 'https://github.com/tangsauce/', faClass: 'fa-github' },
      { href: 'https://www.linkedin.com/in/tangjeff0/', faClass: 'fa-linkedin' },
    ],
  },
  {
    img: dros,
    name: 'Andros Wong',
    description: 'Andros completed his Bachelors and Masters in Engineering at Oxford University, specializing in AI and Machine Learning. When he is not interning at Ripple, he is cracking moves on the dance floor.',
    flavor: 'Segwit2x',
    icons: [
      { href: 'https://github.com/andywong418/', faClass: 'fa-github' },
      { href: 'https://www.linkedin.com/in/andros-wong-2b066943/', faClass: 'fa-linkedin' },
    ],
  },
];

const styles = {
  container: {
    // display: 'flex',
    // flexFlow: 'row wrap',
    // alignItems: 'center',
    // justifyContent: 'space-around',
    textAlign: 'center',
    color: 'white',
    // background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 70%, rgba(0, 0, 0, 0.2) 100%)',
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

export default class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div style={styles.container}>
        <Row>
          <Col>
            <a href="/" style={{ color: 'white', position: 'absolute', left: '1em', fontSize: '2em' }}>
              <i className="fa fa-arrow-left" />
              Back
            </a>
          </Col>
        </Row>
        <Row style={{ marginTop: '1em' }}>
          {cards.map(x => (
            <Col xsOffset={1} xs={10} md={4} mdOffset={0} key={x.name} style={styles.card}>
              <h1 style={{ fontSize: '4em' }}>{x.name}</h1>
              <Avatar src={x.img} size={180} />
              <p style={styles.desc}>
                {x.description}
              </p>
              <div style={styles.icons}>
                {x.icons.map(y => (
                  <a key={y.href} href={y.href}>
                    <i style={styles.icon} className={`fa ${y.faClass} fa-lg`} />
                  </a>
                ))}
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
