import { Editor, Raw, findDOMNode } from 'slate'
import Portal from 'react-portal'
import React from 'react'
import ReactDOM from 'react-dom'
import isImage from 'is-image'
import isUrl from 'is-url'
import upload from './plugins/upload';
import NodeImage from './nodes/Image';
import './index.css';

const plugins = [
  upload({
    extensions: ['png'],
    applyTransform: (transform, file, id) => {
      return transform.insertBlock({
        type: 'image',
        isVoid: true,
        key: id,
        data: { src: file }
      })
    }
  })
];
/**
 * Define a schema.
 *
 * @type {Object}
 */
const DEFAULT_NODE = 'paragraph'
const schema = {
  nodes: {
    'block-quote': props => <blockquote {...props.attributes}>{props.children}</blockquote>,
    'bulleted-list': props => <ul {...props.attributes}>{props.children}</ul>,
    'heading-one': props => <h1 {...props.attributes}>{props.children}</h1>,
    'heading-two': props => <h2 {...props.attributes}>{props.children}</h2>,
    'list-item': props => <li {...props.attributes}>{props.children}</li>,
    'numbered-list': props => <ol {...props.attributes}>{props.children}</ol>,
    'image': NodeImage,
    paragraph: (props) => {
      return <p {...props.attributes}>{props.children}</p>
    },
    asd: (props) => {
      const { node, state } = props
      const active = state.isFocused && state.selection.hasEdgeIn(node)
      const src = node.data.get('src')
      const className = active ? 'active' : null
      return (
        <img src={src} className={className} {...props.attributes} />
      )
    },
  },
  marks: {
    bold: props => <strong>{props.children}</strong>,
    code: props => <code>{props.children}</code>,
    italic: props => <em>{props.children}</em>,
    underlined: props => <u>{props.children}</u>,
  }
}

/**
 * The hovering menu example.
 *
 * @type {Component}
 */

class HoveringMenu extends React.Component {

  /**
   * Deserialize the raw initial state.
   *
   * @type {Object}
   */

  state = {
    state: Raw.deserialize(initialState, { terse: true })
  };

  /**
   * On update, update the menu.
   */

  componentDidMount = () => {
    this.updateMenu()
    this.updateMenuLeft()
  }

  componentDidUpdate = () => {
    this.updateMenu()
    this.updateMenuLeft()
  }

  /**
   * Check if the current selection has a mark with `type` in it.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasMark = (type) => {
    const { state } = this.state
    return state.marks.some(mark => mark.type == type)
  }

  /**
   * Check if the any of the currently selected blocks are of `type`.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasBlock = (type) => {
    const { state } = this.state
    return state.blocks.some(node => node.type == type)
  }

  /**
   * On change, save the new state.
   *
   * @param {State} state
   */

  onChange = (state) => {
    this.setState({ state })
    if (this.props.onChange) this.props.onChange({state: state});
    // const st = State.create(markdown);
    // const st2 = State.create(html);
    // const str = st.serializeDocument(state.document);
    // const str2 = st2.serializeDocument(state.document);
    // console.log(str)
    // console.log(str2)
  }

  onClickImage = (e) => {
    e.preventDefault()
    const src = window.prompt('Enter the URL of the image:')
    if (!src) return
    let { state } = this.state
    state = this.insertImage(state, src)
    this.onChange(state)
  }


  insertImage = (state, src) => {
    return state
      .transform()
      .insertBlock({
        type: 'image',
        isVoid: true,
        data: { src }
      })
      .apply()
  }

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} e
   * @param {String} type
   */

  onClickMark = (e, type) => {
    e.preventDefault()
    let { state } = this.state

    state = state
      .transform()
      .toggleMark(type)
      .apply()

    this.setState({ state })
  }

  /**
   * When a block button is clicked, toggle the block type.
   *
   * @param {Event} e
   * @param {String} type
   */

  onClickBlock = (e, type) => {
    e.preventDefault()
    let { state } = this.state
    const transform = state.transform()
    const { document } = state

    // Handle everything but list buttons.
    if (type != 'bulleted-list' && type != 'numbered-list') {
      const isActive = this.hasBlock(type)
      const isList = this.hasBlock('list-item')

      if (isList) {
        transform
          .setBlock(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      }

      else {
        transform
          .setBlock(isActive ? DEFAULT_NODE : type)
      }
    }

    // Handle the extra wrapping required for list buttons.
    else {
      const isList = this.hasBlock('list-item')
      const isType = state.blocks.some((block) => {
        return !!document.getClosest(block.key, parent => parent.type == type)
      })

      if (isList && isType) {
        transform
          .setBlock(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else if (isList) {
        transform
          .unwrapBlock(type == 'bulleted-list' ? 'numbered-list' : 'bulleted-list')
          .wrapBlock(type)
      } else {
        transform
          .setBlock('list-item')
          .wrapBlock(type)
      }
    }

    state = transform.apply()
    this.setState({ state })
  }

  /**
   * When the portal opens, cache the menu element.
   *
   * @param {Element} portal
   */

  onOpen = (portal) => {
    this.setState({ menu: portal.firstChild })
  }

  onOpenLeft = (portal) => {
    this.setState({ menuLeft: portal.firstChild })
  }

  /**
   * Render.
   *
   * @return {Element}
   */

  render = () => {
    return (
      <div>
        {this.renderMenuLeft()}
        {this.renderMenu()}
        {this.renderEditor()}
      </div>
    )
  }

  /**
   * Render the hovering menu.
   *
   * @return {Element}
   */

  renderMenu = () => {
    return (
      <Portal isOpened onOpen={this.onOpen}>
        <div className="menu hover-menu">
          {this.renderMarkButton('bold', 'format_bold')}
          {this.renderMarkButton('italic', 'format_italic')}
          {this.renderMarkButton('underlined', 'format_underlined')}
          {this.renderMarkButton('code', 'code')}
          {this.renderBlockButton('heading-one', 'looks_one')}
          {this.renderBlockButton('heading-two', 'looks_two')}
          {this.renderBlockButton('block-quote', 'format_quote')}
          {this.renderBlockButton('numbered-list', 'format_list_numbered')}
          {this.renderBlockButton('bulleted-list', 'format_list_bulleted')}
        </div>
      </Portal>
    )
  }

  renderMenuLeft = () => {
    return (
      <Portal isOpened onOpen={this.onOpenLeft}>
        <div className="menu-left">
          <span className="open-hover-left-menu">
            <span className="material-icons">add_circle_outline</span>
            <div className="menu hover-left-menu closed hlm-add">
                <span className="material-icons button" onMouseDown={this.onClickImage}>image</span>
            </div>
          </span>
          <span className="open-hover-left-menu">
            <span className="material-icons">line_style</span>
            <div className="menu hover-left-menu closed hlm-style">
                {this.renderBlockButton('heading-one', 'looks_one')}
                {this.renderBlockButton('heading-two', 'looks_two')}
                {this.renderBlockButton('block-quote', 'format_quote')}
                {this.renderBlockButton('numbered-list', 'format_list_numbered')}
                {this.renderBlockButton('bulleted-list', 'format_list_bulleted')}
            </div>
          </span>
        </div>
      </Portal>
    )
  }

  /**
   * Render a mark-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type)
    const onMouseDown = e => this.onClickMark(e, type)

    return (
      <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
        <span className="material-icons">{icon}</span>
      </span>
    )
  }

  renderBlockButton = (type, icon) => {
    const isActive = this.hasBlock(type)
    const onMouseDown = e => this.onClickBlock(e, type)

    return (
      <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
        <span className="material-icons">{icon}</span>
      </span>
    )
  }

  /**
   * Render the Slate editor.
   *
   * @return {Element}
   */

  renderEditor = () => {
    return (
      <div className="editor" ref={(r) => {this.editorRef = r}}>
        <Editor
          schema={schema}
          state={this.state.state}
          onChange={this.onChange}
          plugins={plugins}
        />
      </div>
    )
  }

  /**
   * Update the menu's absolute position.
   */

  updateMenu = () => {
    const { menu, state } = this.state
    if (!menu) return

    if (state.isBlurred || state.isCollapsed) {
      menu.removeAttribute('style')
      return
    }

    const selection = window.getSelection()
    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    menu.style.opacity = 1
    menu.style.top = `${rect.top + window.scrollY - menu.offsetHeight}px`
    menu.style.left = `${rect.left + window.scrollX - menu.offsetWidth / 2 + rect.width / 2}px`
  }

  updateMenuLeft = () => {
    if (!this.editorRef) return;

    const { menuLeft, state } = this.state
    if (!menuLeft) return

    if (state.isBlurred) {
      menuLeft.removeAttribute('style')
      return;
    }
    try {
      const domNode = ReactDOM.findDOMNode(this.editorRef);
      let editorRect = domNode.getBoundingClientRect()
    
      let rectNode = findDOMNode(state.anchorText).getBoundingClientRect()
      let rect = position();
      
      let height = 24;
      let width = height * 2;

      // align menuLeft to the middle
      let top = (rect.top || rectNode.top + window.scrollY);
      top = top + (rect.height || rectNode.height) / 2;
      top = top - height/2

      menuLeft.style.top = `${top}px`
      menuLeft.style.left = `${editorRect.left - width}px`
      menuLeft.style.height = `${height}px`
      menuLeft.style.width = `${width}px`
      menuLeft.style['font-size'] = menuLeft.style.height
    } catch(e) {
      menuLeft.removeAttribute('style')
      return;
    }
  }
}

/**
 * Export.
 */

export default HoveringMenu
const position = function() {

  if (window.getSelection) {
    var selection = window.getSelection();
    if (!selection.rangeCount) return;

    var range = selection.getRangeAt(0);
    return range.getBoundingClientRect();
  }

  if (document.selection) {
    return document.selection
      .createRange()
      .getBoundingClientRect();
  }
};

const initialState = {
  "nodes": [
    {
      "kind": "block",
      "type": "paragraph",
      "nodes": [
        {
          "kind": "text",
          "ranges": [
            {
              "text": "This is editable "
            },
            {
              "text": "rich",
              "marks": [
                {
                  "type": "bold"
                }
              ]
            },
            {
              "text": " text, "
            },
            {
              "text": "much",
              "marks": [
                {
                  "type": "italic"
                }
              ]
            },
            {
              "text": " better than a "
            },
            {
              "text": "<textarea>",
              "marks": [
                {
                  "type": "code"
                }
              ]
            },
            {
              "text": "!"
            }
          ]
        }
      ]
    },
    {
      "kind": "block",
      "type": "paragraph",
      "nodes": [
        {
          "kind": "text",
          "ranges": [
            {
              "text": "Since it's rich text, you can do things like turn a selection of text "
            },
            {
              "text": "bold",
              "marks": [
                {
                  "type": "bold"
                }
              ]
            },{
              "text": ", or add a semantically rendered block quote in the middle of the page, like this:"
            }
          ]
        }
      ]
    },
    {
      "kind": "block",
      "type": "block-quote",
      "nodes": [
        {
          "kind": "text",
          "text": "A wise quote."
        }
      ]
    },
    {
      "kind": "block",
      "type": "paragraph",
      "nodes": [
        {
          "kind": "text",
          "text": "Try it out for yourself!"
        }
      ]
    }
  ]
}