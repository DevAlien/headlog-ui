import React, { Component } from 'react';
import Button from 'react-toolbox/lib/button/Button';
import {connect} from 'react-redux';

import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Navigation from 'react-toolbox/lib/navigation/Navigation';
import Link from 'react-toolbox/lib/link/Link';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';
import Avatar from 'react-toolbox/lib/avatar/Avatar';
import IconMenu from 'react-toolbox/lib/menu/IconMenu';
import MenuItem from 'react-toolbox/lib/menu/MenuItem';
import MenuDivider from 'react-toolbox/lib/menu/MenuDivider';

import { Row, Col, ScreenClassRender } from 'react-grid-system';

const albums = [
    { value: 1, artist: 'Radiohead', album: 'In Rainbows', img: 'http://www.clasesdeperiodismo.com/wp-content/uploads/2012/02/radiohead-in-rainbows.png' },
    { value: 2, artist: 'QOTSA', album: 'Sons for the Deaf', img: 'http://static.musictoday.com/store/bands/93/product_large/MUDD6669.JPG' },
    { value: 3, artist: 'Kendrick Lamar', album: 'Good Kid Maad City', img: 'https://cdn.shopify.com/s/files/1/0131/9332/products/0bd4b1846ba3890f574810dbeddddf8c.500x500x1_grande.png?v=1425070323' },
    { value: 4, artist: 'Pixies', album: 'Doolittle', img: 'http://www.resident-music.com/image/cache/data/Emilys_Packshots/Pixies/Pixies_Doolittlke-500x500.jpg', disabled: true }
  ];

const GithubIcon = () => (
  <svg viewBox="0 0 284 277">
    <g><path d="M141.888675,0.0234927555 C63.5359948,0.0234927555 0,63.5477395 0,141.912168 C0,204.6023 40.6554239,257.788232 97.0321356,276.549924 C104.12328,277.86336 106.726656,273.471926 106.726656,269.724287 C106.726656,266.340838 106.595077,255.16371 106.533987,243.307542 C67.0604204,251.890693 58.7310279,226.56652 58.7310279,226.56652 C52.2766299,210.166193 42.9768456,205.805304 42.9768456,205.805304 C30.1032937,196.998939 43.9472374,197.17986 43.9472374,197.17986 C58.1953153,198.180797 65.6976425,211.801527 65.6976425,211.801527 C78.35268,233.493192 98.8906827,227.222064 106.987463,223.596605 C108.260955,214.426049 111.938106,208.166669 115.995895,204.623447 C84.4804813,201.035582 51.3508808,188.869264 51.3508808,134.501475 C51.3508808,119.01045 56.8936274,106.353063 65.9701981,96.4165325 C64.4969882,92.842765 59.6403297,78.411417 67.3447241,58.8673023 C67.3447241,58.8673023 79.2596322,55.0538738 106.374213,73.4114319 C117.692318,70.2676443 129.83044,68.6910512 141.888675,68.63701 C153.94691,68.6910512 166.09443,70.2676443 177.433682,73.4114319 C204.515368,55.0538738 216.413829,58.8673023 216.413829,58.8673023 C224.13702,78.411417 219.278012,92.842765 217.804802,96.4165325 C226.902519,106.353063 232.407672,119.01045 232.407672,134.501475 C232.407672,188.998493 199.214632,200.997988 167.619331,204.510665 C172.708602,208.913848 177.243363,217.54869 177.243363,230.786433 C177.243363,249.771339 177.078889,265.050898 177.078889,269.724287 C177.078889,273.500121 179.632923,277.92445 186.825101,276.531127 C243.171268,257.748288 283.775,204.581154 283.775,141.912168 C283.775,63.5477395 220.248404,0.0234927555 141.888675,0.0234927555" /></g>
  </svg>
);

const customItem = (item) => {
    const containerStyle = {
      display: 'flex',
      flexDirection: 'row'
    };

    const imageStyle = {
      display: 'flex',
      width: '32px',
      height: '32px',
      flexGrow: 0,
      marginRight: '8px',
      backgroundColor: '#ccc'
    };

    const contentStyle = {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 2
    };

    return (
      <div style={containerStyle}>
        <img src={item.img} style={imageStyle}/>
        <div style={contentStyle}>
          <strong>{item.artist}</strong>
          <small>{item.album}</small>
        </div>
      </div>
    );
  }


const style = {
  maxWidth: 400,
  margin: '50px auto'
};

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    console.log('dio mio')
  }

  getWidth = (colWidth) => {
    return `${(100 / 12) * colWidth}%`;
  }

  appbarLeftStyleFunction = (screenClass, props) => {
    let colWidth = 12;
    if (screenClass === 'sm') colWidth = 4;
    if (screenClass === 'md') colWidth = 3;
    if (screenClass === 'lg') colWidth = 2;
    if (screenClass === 'xl') colWidth = 2;

    return {
        width: this.getWidth(colWidth),
        ...props.style,
    };
  };

  appbarRightStyleFunction = (screenClass, props) => {
    let colWidth = 12;
    if (screenClass === 'sm') colWidth = 8;
    if (screenClass === 'md') colWidth = 9;
    if (screenClass === 'lg') colWidth = 10;
    if (screenClass === 'xl') colWidth = 10;

    return {
        width: this.getWidth(colWidth),
        ...props.style,
    };
  };


  onChange = (type, text) => {
    this.setState({[type]: text});
  };

  render() {
    return (
      <AppBar flat className="appbar-custom">
    <ScreenClassRender style={this.appbarLeftStyleFunction}>
      <div className="appbar-left">
      <Dropdown
        className="appbar-dd"
          auto={false}
          source={albums}
          template={customItem}
          value={1}
        />
        </div>
    </ScreenClassRender>
    <ScreenClassRender style={this.appbarRightStyleFunction}>
    <div className="appbar-right">
      {/*<Navigation type='horizontal' style={{float: "right"}}>
        <Link href='http://' label='Inbox' icon='inbox' />
        <Link href='http://' active label='Profile' icon='person' />
      </Navigation>*/}
      <div style={{float: "right"}}>
        <IconMenu className="appbar-menu-icon" icon={
          <span>
            <Avatar title="DevAlien" image="https://placeimg.com/80/80/animals" />
            <span className="appbar-avatar-name">DevAlien</span>
          </span>} position='topRight' menuRipple>
          <MenuItem value='download' icon='get_app' caption='Download' />
          <MenuItem value='help' icon='favorite' caption='Favorite' />
          <MenuItem value='settings' icon='open_in_browser' caption='Open in app' />
          <MenuDivider />
          <MenuItem value='signout' icon='delete' caption='Delete' disabled />
        </IconMenu>
      </div>
    </div>
    </ScreenClassRender>
  </AppBar>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    loaded: state.app.loaded,
    user: state.app.user,
    account: state.app.account,
    snackbar: state.snackbar
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);