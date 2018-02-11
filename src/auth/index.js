import Auth0Lock from 'auth0-lock';
import { withRouter } from 'react-router-dom';
import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { homepage } from '../../package.json';

const AUTH_CONFIG = {
  clientId: 'MaSSz3P8F5978YQu2g1hsoo4PqxHv6pP',
  domain: 'vinspee-test.auth0.com',
  callbackURL: process.env.NODE_ENV === 'production'
    ? `${homepage}${process.env.PUBLIC_URL}login`
    : `http://localhost:3000/login`,
};

class AuthProvider extends PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired, // eslint-disable-line
    children: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      profile: null,
    };
  }

  getProfile = (cb) => {
    const accessToken = this.getAccessToken();
    if (accessToken) {
      this.lock.getUserInfo(accessToken, (err, profile) => {
        cb(err, profile);
      });
    }
  }

  getAccessToken = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('No access token found');
    }
    return accessToken;
  }

  setSession = (authResult) => {
    console.log({ authResult });
    if (authResult && authResult.accessToken && authResult.idToken) {
      // Set the time that the access token will expire at
      const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('accessToken', authResult.accessToken);
      localStorage.setItem('idToken', authResult.idToken);
      localStorage.setItem('expiresAt', expiresAt);
      this.getProfile((err, profile) => {
        if (err) {
          throw new Error(err);
        }
        this.setState(state => ({
          ...state,
          profile,
        }));
        this.props.history.replace('/');
      });
      // navigate to the home route
    }
  }

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expiresAt'));
    if (expiresAt) {
      return new Date().getTime() < expiresAt;
    }
    return false;
  }

  login = () => {
    // Call the show method to display the widget.
    this.lock.show();
  }

  logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('expiresAt');
    // navigate to the home route
    this.props.history.replace('/');
    this.setState(() => ({
      profile: null,
    }));
  }

  componentDidMount() {
    this.lock = new Auth0Lock(AUTH_CONFIG.clientId, AUTH_CONFIG.domain, {
      autoclose: true,
      auth: {
        redirectUrl: AUTH_CONFIG.callbackURL,
        responseType: 'token id_token',
        audience: `https://${AUTH_CONFIG.domain}/userinfo`,
        params: {
          scope: 'openid profile',
        },
      },
    });

    this.lock.on('authenticated', this.setSession);
    // Add a callback for Lock's `authorization_error` event
    this.lock.on('authorization_error', (err) => {
      console.error(err); // eslint-disable-line no-console
      this.props.history.replace('/');
    });
    if (this.isAuthenticated) {
      this.getProfile((err, profile) => {
        if (err) {
          throw new Error(err.statusText);
        }
        this.setState(state => ({
          ...state,
          profile,
        }));
        this.props.history.replace('/');
      });
    }
  }

  componentWillUnmount() {
    this.lock = null;
  }

  render() {
    const { children } = this.props;
    return children({
      profile: this.state.profile,
      authInstance: this.lock,
      login: this.login,
      logout: this.logout,
      authenticated: this.isAuthenticated(),
    });
  }
}

export default withRouter(AuthProvider);
