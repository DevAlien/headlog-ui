import React from 'react';
import {createDevTools} from 'redux-devtools';
import Inspector from 'redux-devtools-inspector';
import DockMonitor from 'redux-devtools-dock-monitor';
import Dispatcher from 'redux-devtools-dispatch';
import MultipleMonitors from 'redux-devtools-multiple-monitors';

let tools = (
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-w" defaultIsVisible={false}>
    <MultipleMonitors>
      <Inspector />
      <Dispatcher />
    </MultipleMonitors>
  </DockMonitor>);

export default createDevTools(tools);
