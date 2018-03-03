/*
   menu.js - structure with organized menu data
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys
*/

import jeff from '../assets/jeff.jpg';
import rob from '../assets/rob.jpg';
import dros from '../assets/dros.jpg';

export default [
  {
    description: 'Rob is taking a gap year from Colby College, where he is majoring in Computer Science and Mathematics. When he is not interning at Stellar or getting the most liked cat on CryptoKitties, he is co-organizing the SF Crypto Devs Meetup.',
    flavor: 'Doge Food',
    icons: [
      { href: 'http://robdurst.com/', faClass: 'fa-angle-double-right' },
      { href: 'https://github.com/robertDurst', faClass: 'fa-github' },
      { href: 'https://www.linkedin.com/in/robertdurst/', faClass: 'fa-linkedin' },
      { href: 'https://twitter.com/g_durst', faClass: 'fa-twitter' },
    ],
    img: rob,
    name: 'Rob Durst',
  },
  {
    description: 'Jeff is taking a gap year from Rice University, where he is majoring in Computer Science. When he is not thinking about startups and entrepreneurship, he is reading a book and/or listening to music.',
    flavor: 'Vitalik Garcia',
    icons: [
      { href: 'http://tangjeff.com', faClass: 'fa-angle-double-right' },
      { href: 'https://github.com/tangsauce/', faClass: 'fa-github' },
      { href: 'https://www.linkedin.com/in/tangjeff0/', faClass: 'fa-linkedin' },
    ],
    img: jeff,
    name: 'Jeff Tang',
  },
  {
    description: 'Andros completed his Bachelors and Masters in Engineering at Oxford University, specializing in AI and Machine Learning. When he is not interning at Ripple, he is cracking moves on the dance floor.',
    flavor: 'Segwit2x',
    icons: [
      { href: 'https://github.com/andywong418/', faClass: 'fa-github' },
      { href: 'https://www.linkedin.com/in/andros-wong-2b066943/', faClass: 'fa-linkedin' },
    ],
    img: dros,
    name: 'Andros Wong',
  },
];
