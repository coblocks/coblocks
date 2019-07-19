import classnames from 'classnames';

import './styles/editor.scss';

const {Component} = wp.element;
const {RangeControl} = wp.components;
const {ButtonGroup} = wp.components;
const {Button} = wp.components;

class ImageCropControl extends Component {
    constructor(props) {
        super(props);

        const {offsetX, offsetY, cropWidth, cropHeight, rotation} = props;

        this.state = {
            x: offsetX,
            y: offsetY,
            w: cropWidth,
            h: cropHeight,
            r: rotation,
            midX: offsetX + cropWidth / 2,
            midY: offsetY + cropHeight / 2,
            containerWidth: 0,
            aspectRatio: 1,
            imageWidth: 1000,
            imageHeight: 1000
        };

        this.mouseDownListener = this.mouseDownListener.bind(this);
        this.mouseMoveListener = this.mouseMoveListener.bind(this);
        this.mouseUpListener = this.mouseUpListener.bind(this);
        this.handleImageLoaded = this.handleImageLoaded.bind(this);
        this.imageContainer = React.createRef();
        this.imageReference = React.createRef();
    }

    componentDidMount() {
        this.setState({
            containerWidth: (jQuery(this.imageContainer.current).width() - 40)
        });
    }

    handleImageLoaded() {
        this.setState({
            aspectRatio: this.imageReference.current.naturalWidth / this.imageReference.current.naturalHeight,
            imageWidth: this.imageReference.current.naturalWidth,
            imageHeight: this.imageReference.current.naturalHeight
        });
    }

    mouseDownListener(e) {
        if (e.button !== 0) {
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        this.captureMouseEvents();
    }

    captureMouseEvents() {
        document.addEventListener('mouseup', this.mouseUpListener, true);
        document.addEventListener('mousemove', this.mouseMoveListener, true);
    }

    mouseMoveListener(e) {
        e.preventDefault();
        e.stopPropagation();

        const moveSpeed = 100 / this.getCurrentScale();
        this.updateState(this.state.x - e.movementX * moveSpeed, this.state.y - e.movementY * moveSpeed, this.state.w, this.state.h, this.state.r);
    }

    mouseUpListener(e) {
        e.preventDefault();
        e.stopPropagation();

        document.removeEventListener('mouseup', this.mouseUpListener, true);
        document.removeEventListener('mousemove', this.mouseMoveListener, true);
    }

    applyRotation(r) {
        this.setNewZoom(this.getCurrentScale(), r);
    }

    getCurrentScale() {
        let aspectScale = (this.state.r === 90 || this.state.r === 270) ? this.state.aspectRatio : 1;
        return Math.min(Math.max(1, 1 / (this.state.w / aspectScale / aspectScale / 100)), 1 / (this.state.h / 100)) * 100;
    }

    updateState(nX, nY, nW, nH, nR) {
        const {onChange} = this.props;

        if (nW > 100) {
            nW = 100;
        }

        if (nH > 100) {
            nH = 100;
        }

        if (nX + nW > 100) {
            nX = 100 - nW;
        }

        if (nX < 0) {
            nX = 0;
        }

        if (nY + nH > 100) {
            nY = 100 - nH;
        }

        if (nY < 0) {
            nY = 0;
        }

        if (onChange) {
            onChange({
                x: nX,
                y: nY,
                w: nW,
                h: nH,
                r: nR
            });
        }

        this.setState({
            x: nX,
            y: nY,
            w: nW,
            h: nH,
            r: nR,
            midX: nX + nW / 2,
            midY: nY + nH / 2
        });
    }

    setNewZoom(zoom, newRotation) {
        zoom /= 100;

        let aspectScale = (newRotation === 90 || newRotation === 270) ? this.state.aspectRatio : 1;

        let nW = 100 * aspectScale * aspectScale / zoom;
        let nH = 100 / zoom;

        let nX = this.state.midX - nW / 2;
        let nY = this.state.midY - nH / 2;

        this.updateState(nX, nY, nW, nH, newRotation);
    }

    render() {
        const self = this;
        const {imageUrl} = self.props;

        const mainClass = classnames(
            'components-base-control',
            'components-coblocks-image-control'
        );

        let scaleX, scaleY, translateX, translateY;
        const coefficient = (self.state.r === 90 || self.state.r === 270) ? this.state.aspectRatio : 1;
        const currentImageWidth = Math.round((self.state.imageWidth * (this.state.w / 100)) / coefficient);
        const currentImageHeight = Math.round((self.state.imageHeight * (this.state.h / 100)) * coefficient);
        const currentAspect = currentImageWidth / currentImageHeight;

        if (self.state.r === 90 || self.state.r === 270) {
            scaleX = 1 / (self.state.h / 100) / currentAspect;
            scaleY = 1 / (self.state.w / 100) * currentAspect;
        } else {
            scaleX = 1 / (self.state.w / 100);
            scaleY = 1 / (self.state.h / 100);
        }

        if (self.state.r === 90) {
            translateX = (50 - (self.state.y + self.state.h / 2));
            translateY = -(50 - (self.state.x + self.state.w / 2));
        } else if (self.state.r === 180) {
            translateX = -(50 - (self.state.x + self.state.w / 2));
            translateY = -(50 - (self.state.y + self.state.h / 2));
        } else if (self.state.r === 270) {
            translateX = -(50 - (self.state.y + self.state.h / 2));
            translateY = (50 - (self.state.x + self.state.w / 2));
        } else {
            translateX = 50 - (self.state.x + self.state.w / 2);
            translateY = 50 - (self.state.y + self.state.h / 2);
        }

        const imageHeight = Math.round(this.state.containerWidth / currentAspect);
        const containerStyle = {
            'height': (imageHeight + 40) + 'px'
        };
        const style = {
            'transform': 'rotate(' + this.state.r + 'deg) scale(' + scaleX + ', ' + scaleY + ') translate(' + translateX + '%, ' + translateY + '%)',
            'height': imageHeight + 'px'
        };

        return (
            <div>
                <div ref={this.imageContainer} className={mainClass} onMouseDown={this.mouseDownListener}
                     style={containerStyle}>
                    <div>
                        <img ref={this.imageReference} src={imageUrl} style={style} alt={""}
                             onLoad={this.handleImageLoaded}/>
                    </div>
                    <div>
                        <img src={imageUrl} style={style} alt={""}/>
                    </div>
                </div>
                <RangeControl
                    label={"Zoom (%)"}
                    value={this.getCurrentScale()}
                    onChange={(val) => this.setNewZoom(val, self.state.r)}
                    min={100}
                    max={1000}
                />
                <ButtonGroup>
                    <Button
                        isDefault
                        isPrimary={self.state.r === 0}
                        onClick={() => this.applyRotation(0)}
                    >
                        0°
                    </Button>
                    <Button
                        isDefault
                        isPrimary={self.state.r === 90}
                        onClick={() => this.applyRotation(90)}
                    >
                        90°
                    </Button>
                    <Button
                        isDefault
                        isPrimary={self.state.r === 180}
                        onClick={() => this.applyRotation(180)}
                    >
                        180°
                    </Button>
                    <Button
                        isDefault
                        isPrimary={self.state.r === 270}
                        onClick={() => this.applyRotation(270)}
                    >
                        270°
                    </Button>
                </ButtonGroup>
            </div>
        );
    }
}

export default ImageCropControl;
