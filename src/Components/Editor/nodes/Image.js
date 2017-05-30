import React from 'react'
import Dropdown from 'react-dropdown'

const defaultSize = 1;
const options = [
  { value: 256, label: 'Small' },
  { value: 480, label: 'Medium' },
  { value: 768, label: 'Large' },
  { value: 1024, label: 'Very Large' }
];

export default class Image extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected || options[defaultSize]
    };
  }

  onSelect = (value) => {
    const { node } = this.props
    this.setState({selected: value});
    this.setData({src: node.data.get('src'), width: value.value});
  }

  render() {
    const {editor, node} = this.props;
    const state = editor.getState();
    const isFocused = state.selection.hasEdgeIn(node)
    const width = node.data.get('width') || options[defaultSize].value;
    const src = node.data.get('src') + '?w=' + width;
    const className = isFocused ? 'active' : null
    
    if (!isFocused) {
      return (
      <div style={{textAlign: 'center'}}><img src={src} className={className} width={width} {...this.props.attributes}/></div>);
    }

    return (
        <div className="ane-image" style={{width: width}} {...this.props.attributes}>
        <div className="header">
        <div className="controls-container">
                <Dropdown options={options} onChange={this.onSelect} value={this.state.selected} />
                <span>test yeah</span>
                <ul className="controls">
                    <li className="block__action" onClick={this.removeImage}>
                        <svg className="block__action__icon" width="24" height="24" viewBox="0 0 24 24">
                            <g fill="none" fillRule="evenodd">
                                <path d="M0 0h24v24H0z"></path>
                                <path d="M7 18c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V8H7v10zM18 5h-3l-1-1h-4L9 5H6v2h12V5z" fill="currentColor"></path>
                            </g>
                        </svg>
                    </li>
                </ul>
            </div>
            </div>
        <img src={src} width={width} {...this.props.attributes}/>
    </div>);
  }

  removeImage = () => {
    const {editor, node} = this.props;
    const state = editor.getState();
    const next = state
      .transform()
      .removeNodeByKey(node.key)
      .apply();

    editor.onChange(next);
  }

  setData = (data) => {
    const {editor, node} = this.props;
    const state = editor.getState();
    const next = state
      .transform()
      .setNodeByKey(node.key, { data })
      .apply();

    editor.onChange(next);
  }
}