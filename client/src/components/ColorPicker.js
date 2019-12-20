import React, { useState } from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import {axiosWithAuth} from "../helpers/AxiosWithAuth";
//experimenting with a color picker, non functional at the moment
class ColorPicker extends React.Component {
    state = {
        displayColorPicker: false,
        color: {
            // r: '112',
            // g: '131',
            // b: '3',
            // a: '1',
            hex: '#D11141'
        },
    };

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChange = (color) => {
        this.setState({ color: color.hex })
        console.log(`'This is the response from hex' ${this.state.color.background}`, `'this is the response from state:' ${this.state.color}`)
    };

    handleSubmit = e => {
        const [addNewColor, setAddNewColor] = useState(this.state.color)
        e.preventDefault();
        axiosWithAuth().post(`api/colors`, addNewColor)
            .then(res => {
                console.log(res)
                this.setState(res.data)
                setAddNewColor(this.state.color)
                console.log(this.state.color, 'res from submit')
            })
            .catch(error => console.log(error, "Error Adding Color"))
    }

    render() {

        const styles = reactCSS({
            'default': {
                color: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `hex(${this.state.color})`
                    // background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
                },
                swatch: {
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });

        return (
            <div>
                <div style={ styles.swatch } onClick={ this.handleClick }>
                    <div style={ styles.color } />
                </div>
                { this.state.displayColorPicker ? <div style={ styles.popover }>
                    <div style={ styles.cover } onClick={ this.handleClose }/>
                    <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
                </div> : null }
                <button onSubmit={this.handleSubmit} type="submit">Save</button>
            </div>
        )
    }
}

export default ColorPicker