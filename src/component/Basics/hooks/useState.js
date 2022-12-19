import React from "react";
import "./style.css";

const UseState = () => {
  
  const [myNum, setMyNum] = React.useState(0);

  return (
    <>
      <div className="center_div">
        <p>{myNum}</p>
        <div
          class="button2" onClick={()=> setMyNum(myNum+1)}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          INCR
        </div>
        <div
          class="button2" onClick={()=> {
            if(myNum>0){
                setMyNum(myNum-1)
            }
          }}>
          
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          DECR
        </div>
      </div>
    </>
  );
};

export default UseState;