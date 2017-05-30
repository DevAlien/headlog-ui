import React, { Component } from 'react';
import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';

class SidebarMenu extends Component {

  render() {
    return(
      <List selectable ripple>
        <ListItem caption='Create' className="menu-item" leftIcon='create' />
        <ListItem caption='Settings' leftIcon='settings' />
      </List>
    )
  }
}

export default SidebarMenu;