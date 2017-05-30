// @flow
import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';

export default class ProgressiveImage extends React.Component {
  constructor(props: ProgressiveImageProps) {
    super(props);
    this.image = {};
    this.state = {
      image: props.placeholder,
      displayPlaceholder: true,
      isVisible: false
    };
  }

  componentDidMount() {
    
  }

  // componentWillReceiveProps(nextProps: ProgressiveImageProps) {
  //   const { src, placeholder } = nextProps;
  //   // We only invalidate the current image if the src has changed.
  //   if (src !== this.props.src) {
  //     this.setState({ image: placeholder }, () => {
  //       this.loadImage(src);
  //     });
  //   }
  // }

  componentWillUnmount() {
    if (this.image) {
      this.image.onload = null;
      this.image.onerror = null;
    }
  }

  loadImage = (src: string) => {
    // If there is already an image we nullify the onload
    // and onerror props so it does not incorrectly set state
    // when it resolves
    if (this.image) {
      this.image.onload = null;
      this.image.onerror = null;
    }
    const image = new Image();
    this.image = image;
    image.onload = this.onLoad;
    image.onerror = this.onError;
    image.src = src;
    
  }

  
  onLoad = () => {
    // use this.image.src instead of this.props.src to
    // avoid the possibility of props being updated and the
    // new image loading before the new props are available as
    // this.props.
    this.setState({
      image: this.image.src
    });
    setTimeout(() => {
      this.setState({
        displayPlaceholder: false
      });
    }, 1000)
  }

  onError = (errorEvent: Event) => {
    const { onError } = this.props;
    if (onError) {
      onError(errorEvent);
    }
  }

  onChange = (isVisible) => {
    console.log(this.props.pname)
    console.log('Element is now %s', isVisible ? 'visible' : 'hidden');
    if (isVisible === true) {
      this.setState({
        isVisible: true
      });
      const { src } = this.props;
      this.loadImage(src);
    }
  };

  render() {
    const { image, displayPlaceholder, isVisible } = this.state;
    const { children } = this.props;
    console.log('props', this.props)
    let content = [];
    if (displayPlaceholder) {
      content.push(<img src={this.props.placeholder} />);
    }
      
    if (this.image.src) {
      content.push(<img src={this.image.src} className={(displayPlaceholder ? 'reveal' : '')}/>);
    }

    let result = (<div style={{width:"800px"}} className="progressive">
        {content}
        </div>);
    
    if (isVisible) {
      return result;
    }
    return (
      <VisibilitySensor onChange={this.onChange} delayedCall={true}>
        {result}
        </VisibilitySensor>
    );
    if (!children || typeof children !== 'function') {
      throw new Error(
        `ProgressiveImage requires a function as its only child`
      );
    }
    return children(image);
  }
}