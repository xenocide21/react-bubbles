import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

class ColorPicker extends React.Component {
    state = {
        displayColorPicker: false,
        color: {
            r: '241',
            g: '112',
            b: '19',
            a: '1',
        },
    };

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChange = (color) => {
        this.setState({ color: color.rgb })
    };

    render() {

        const styles = reactCSS({
            'default': {
                color: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
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

            </div>
        )
    }
}

export default ColorPicker
// import React, {useState} from 'react'
// import reactCSS from 'reactcss'
// import { SketchPicker } from 'react-color'
// import {axiosWithAuth} from "../helpers/AxiosWithAuth";
//
// const initialColor = {
//         displayColorPicker: false,
//         color: "",
//         code: {hex: 'd11141'}
//     };
//
// const ColorPicker = ({colors, updateColors }) => {
//     console.log(colors);
//     const [addNewColor, setAddNewColor] = useState(initialColor)
//
//     const handleClick = () => {
//         this.setState({ displayColorPicker: !this.state.displayColorPicker })
//     };
//
//     const handleClose = () => {
//         this.setState({ displayColorPicker: false })
//     };
//
//     const handleChange = (e, color) => {
//         this.setState({ color: color.hex, code: {hex: color.hex}  })
//         console.log('state', { color } )
//         setAddNewColor({
//             ...addNewColor,
//             color: e.target.value})
//     };
//
//     const addColor = e => {
//         e.preventDefault();
//         axiosWithAuth().post(`api/colors`, this.state.color)
//             .then(res => {
//                 console.log(res)
//                 updateColors(res.data)
//                 setAddNewColor(initialColor)
//             })
//             .catch(error => console.log(error, "Error Adding Color"))
//     }
//
//     // const styles = reactCSS({
//     //     'default': {
//     //         color: {
//     //             width: '36px',
//     //             height: '14px',
//     //             borderRadius: '2px',
//     //             background: ''
//     //             // background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
//     //         },
//     //         swatch: {
//     //             padding: '5px',
//     //             background: '#fff',
//     //             borderRadius: '1px',
//     //             boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
//     //             display: 'inline-block',
//     //             cursor: 'pointer',
//     //         },
//     //         popover: {
//     //             position: 'absolute',
//     //             zIndex: '2',
//     //         },
//     //         cover: {
//     //             position: 'fixed',
//     //             top: '0px',
//     //             right: '0px',
//     //             bottom: '0px',
//     //             left: '0px',
//     //         },
//     //     },
//     // });
//
//         return (
//             <div onSubmit={addColor}>
//                 <div /*style={ styles.swatch }*/ onClick={ handleClick }>
//                     <div /*style={ styles.color }*/ />
//                 </div>
//                 { this.state.displayColorPicker ? <div /*style={ styles.popover }*/>
//                     <div /*style={ styles.cover }*/ onClick={ handleClose }/>
//                     <SketchPicker color={ this.state.color } onChange={ handleChange } />
//                 </div> : null }
//                 <button type="submit">Save</button>
//             </div>
//         )
//     }
//
// export default ColorPicker

// import React, { useState } from 'react'
// import reactCSS from 'reactcss'
// import { SketchPicker } from 'react-color'
// import {axiosWithAuth} from "../helpers/AxiosWithAuth";
// //experimenting with a color picker, non functional at the moment
// class ColorPicker extends React.Component {
//     state = {
//         displayColorPicker: false,
//         color: '',
//         code: {hex: '#D11141'}
//     };
//
//     handleClick = () => {
//         this.setState({ displayColorPicker: !this.state.displayColorPicker })
//     };
//
//     handleClose = () => {
//         this.setState({ displayColorPicker: false })
//     };
//
//     handleChange = (color) => {
//         this.setState({ color: {hex: color.hex} })
//         console.log(`'This is the response from hex' ${this.state.color.hex}`, `'this is the response from state:' ${this.state.color}`)
//     };
//
//     handleSubmit = e => {
//         const [addNewColor, setAddNewColor] = useState(this.state.color.hex)
//         e.preventDefault();
//         axiosWithAuth().post(`api/colors`, addNewColor)
//             .then(res => {
//                 console.log(res)
//                 this.setState(res.data)
//                 setAddNewColor(this.state.color.hex)
//                 console.log(this.state.color.hex, 'res from submit')
//             })
//             .catch(error => console.log(error, "Error Adding Color"))
//     }
//
//     render() {
//
//         const styles = reactCSS({
//             'default': {
//                 color: {
//                     width: '36px',
//                     height: '14px',
//                     borderRadius: '2px',
//                     background: `hex(${this.state.color})`
//                     // background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
//                 },
//                 swatch: {
//                     padding: '5px',
//                     background: '#fff',
//                     borderRadius: '1px',
//                     boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
//                     display: 'inline-block',
//                     cursor: 'pointer',
//                 },
//                 popover: {
//                     position: 'absolute',
//                     zIndex: '2',
//                 },
//                 cover: {
//                     position: 'fixed',
//                     top: '0px',
//                     right: '0px',
//                     bottom: '0px',
//                     left: '0px',
//                 },
//             },
//         });
//
//         return (
//             <div>
//                 <div style={ styles.swatch } onClick={ this.handleClick }>
//                     <div style={ styles.color } />
//                 </div>
//                 { this.state.displayColorPicker ? <div style={ styles.popover }>
//                     <div style={ styles.cover } onClick={ this.handleClose }/>
//                     <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
//                 </div> : null }
//                 <button onSubmit={this.handleSubmit} type="submit">Save</button>
//             </div>
//         )
//     }
// }
//
// export default ColorPicker