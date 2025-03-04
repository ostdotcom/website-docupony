/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc) {
    const baseUrl = this.props.config.baseUrl;
    return `${baseUrl}docs/${this.props.language ? `${this.props.language}/` : ''}${doc}`;
  }

  pageUrl(doc) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (this.props.language ? `${this.props.language}/` : '') + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a className="navbar-brand ost-brand mr-0" href="https://ost.com/" title="OST">
            <svg id="icon-logo" viewBox="0 0 98.219 53">
              <path d="M262.348,1082.47l4.619-7.23a4.675,4.675,0,1,0-2.768-1.78l-5.738,8.98A18.277,18.277,0,1,0,262.348,1082.47Zm-2.1,27.92a9.725,9.725,0,1,1,9.071-13.16,5.616,5.616,0,1,0-.01,6.9A9.7,9.7,0,0,1,260.247,1110.39Zm40.565-13.07c-6.067-2.33-6.815-3.38-6.815-5.03s1.5-3.01,4.193-3.01a6.917,6.917,0,0,1,6.441,3.98l0.674,0.08,5.542-3.6c-2.023-4.51-7.039-7.44-13.332-7.44-8.087,0-13.1,4.36-13.1,10.14,0,4.81,2.4,8.04,10.559,11.04,5.542,1.95,6.74,3.38,6.74,5.03,0,2.03-1.871,3.38-4.867,3.38-3.071,0-5.693-1.72-7.49-4.65l-0.524-.08-5.841,3.91c2.771,5.11,7.788,7.81,14.378,7.81,8.464,0,13.856-4.36,13.856-10.37C311.222,1103.41,308.6,1100.4,300.812,1097.32Zm39.167,12.47-0.674-.38a8.64,8.64,0,0,1-3.669.91c-3.445,0-4.718-1.28-4.718-5.41v-13.45h9.211v-7.73h-9.211V1070.2h-2.1l-7.789,4.59v8.94h-6.141v7.73h6.067v16c0,7.51,4.194,11.42,11.907,11.42a21.08,21.08,0,0,0,7.339-1.28Z" transform="translate(-242 -1066)"></path>
            </svg>
          </a>
          <div>
            <h5>OST Platform</h5>
            <a href="/platform">
              Docs
            </a>
            <a href="/platform/docs/sdk">
              SDKs
            </a>
            <a href="/platform/docs/api">
              API References
            </a>
          </div>
          <div>
            {/* <h5>Community</h5>
            <a href={this.pageUrl('users.html')}>
              User Showcase
            </a>
            <a
              href="http://stackoverflow.com/questions/tagged/"
              target="_blank"
              rel="noreferrer noopener">
              Stack Overflow
            </a>
            <a href="https://discordapp.com/">Project Chat</a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer noopener">
              Twitter
            </a> */}
          </div>


          <div className="col-12 col-md mb-3 mb-sm-0">
            <div className="social-links">
              <h6 className="text-uppercase">Join The Community</h6>
              <ul className="footer-nav list-unstyled">
                <li>
                  <a href="https://t.me/ostdotcom" target="_blank" title="OST - Telegram">
                    <span className="footer-social-telegram-icon social-icons"></span>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/OSTdotcom" target="_blank" title="OST - Twitter">
                    <span className="footer-social-twitter-icon social-icons"></span>
                  </a>
                </li>
                <li>
                  <a href="https://medium.com/ostdotcom" target="_blank" title="OST - Medium">
                    <span className="footer-social-medium-icon social-icons"></span>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/18209852" target="_blank" title="OST - Linkedin">
                    <span className="footer-social-linkedIn-icon social-icons"></span>
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/OST" target="_blank" title="OST - Facebook">
                    <span className="footer-social-facebook-icon social-icons"></span>
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/ostdotcom" target="_blank" title="OST - Youtube">
                    <span className="footer-social-youtube-icon social-icons"></span>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/ostdotcom" target="_blank" title="OST - GitHub">
                    <span className="footer-social-github-icon social-icons "></span>
                  </a>
                </li>
                <li>
                  <a href="https://gitter.im/OpenSTFoundation/SimpleToken" target="_blank" title="OST - Gitter">
                    <span className="footer-social-gitter-icon social-icons"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </section>
        <section className="copyright">Copyright © 2019 <a href="https://ost.com" target="_blank">OST.com</a> Inc. All Rights Reserved.</section>
      </footer>
    );
  }
}

module.exports = Footer;
