import React, { useState } from "react";
import {axiosWithAuth} from "../helpers/AxiosWithAuth";
import ColorPicker from "./ColorPicker";


const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addNewColor, setAddNewColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };
//PUT Request---
  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
        .put(`api/colors/${colorToEdit.id}`, colorToEdit)
        .then(res => {
          console.log(res)
          updateColors(colors.map(color => color.id === res.data.id ? res.data : color))
          setEditing(false)
        })
        .catch(error => console.log(error, "Error Saving Color"))
  };
//DELETE Request---
  const deleteColor = (e, color) => {
    e.stopPropagation();
    axiosWithAuth()
        .delete(`api/colors/${color.id}`)
        .then (res => {
          updateColors(colors.filter(color => color.id !== res.data))
        })
        .catch(error => console.log(error, "Error Deleting Color"))
  };
//POST Request---
  const addColor = e => {
    e.preventDefault();
    axiosWithAuth()
        .post(`api/colors`, addNewColor)
        .then(res => {
          console.log(res)
          updateColors(res.data)
          setAddNewColor(initialColor)
        })
        .catch(error => console.log(error, "Error Adding Color"))
  }

  return (
      <div className="colors-wrap">
        <p>colors</p>
        <ul>
          {colors.map(color => (
              <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={(e) => {
                deleteColor(e, color)}}>
                  x
              </span>{" "}
              {color.color}
            </span>
                <div
                    className="color-box"
                    style={{ backgroundColor: color.code.hex }}
                />
              </li>
          ))}
        </ul>
        {editing && (
            <form onSubmit={saveEdit}>
              <legend>edit color</legend>
              <label>
                color name:
                <input
                    onChange={e =>
                        setColorToEdit({ ...colorToEdit, color: e.target.value })
                    }
                    value={colorToEdit.color}
                />
              </label>
              <label>
                hex code:
                <input
                    onChange={e =>
                        setColorToEdit({
                          ...colorToEdit,
                          code: { hex: e.target.value }
                        })
                    }
                    value={colorToEdit.code.hex}
                />
              </label>
              <div className="button-row">
                <button type="submit">save</button>
                <button onClick={() => setEditing(false)}>cancel</button>
              </div>
            </form>
        )}
        <form onSubmit={addColor}>
          <h3>Add Color</h3>
          <label>
            color name:
            <input
                onChange={e => setAddNewColor({
                  ...addNewColor,
                  color: e.target.value})
                }
                value={addNewColor.color}
            />
          </label>
          <label>
            hex code:
            <input
                onChange = {e => setAddNewColor ({
                  ...addNewColor,
                  code: { hex: e.target.value}
                })}
                value={addNewColor.code.hex}
            />
          </label>
            <ColorPicker/>
          <button type="submit">Save</button>
        </form>
      </div>
  );
};

export default ColorList;