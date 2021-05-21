import React, { Component } from 'react';
import { connect } from 'react-redux';
import About from '../SVG/AboutUs';

export class AboutUs extends Component {
  render() {
    return (
      <div>
        <div>
          <h3>Our Mission</h3>
          <h4>
            Making selecting and managing your mental health easier and more
            accessible. Because finding and prioritizing your mental health
            professional should be easy and convenient
          </h4>
        </div>

        <div>
          <h3>Our Providers</h3>
          <p>
            Hello Health offers access to licensed, trained, experienced, and
            accredited psychiatrist, psychologists (PhD / PsyD), and board
            licensed professional counselors and therapists (LPC).
          </p>
        </div>

        <div>
          <h3>Our Team</h3>
          <p>
            We are passionate and compassionate professionals team of developers
            who are driven by our mission. In developing this application we
            hope to build a resource for mental health. Check out our team!
          </p>
          <img
            className='photo'
            height={300}
            width={300}
            src='https://ca.slack-edge.com/T024FPYBQ-U01HVGXDKL7-9f1006440219-512'
          />

          <img
            className='photo'
            height={300}
            width={300}
            src='https://ca.slack-edge.com/T024FPYBQ-U01JGF243E0-89e19e4353a9-512'
          />
          <img
            className='photo'
            height={300}
            width={300}
            src='https://ca.slack-edge.com/T024FPYBQ-U01PXDH1PTK-65bf8620e716-512'
          />
          <img
            className='photo'
            height={300}
            width={300}
            src='https://ca.slack-edge.com/T024FPYBQ-U01PFMW4F0V-366ee5aa3832-512'
          />
        </div>
        <About />
      </div>
    );
  }
}

export default AboutUs;
