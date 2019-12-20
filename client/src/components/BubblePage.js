import React, { useState, useEffect } from "react";
import { api } from "../helpers/AxiosWithAuth";


import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
    useEffect(() => {
        api().get('api/colors')
            .then(res => {
                setColorList(res.data)
            })
            .catch(error => console.log(error))
    }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
