import React, { useState, useEffect } from "react";
import "./style.css"

//get local storage data back

const getLocalData = ()=>{
    const lists = localStorage.getItem("myTodoList")
    if(lists){
        return JSON.parse(lists)
    }else{return []}
}


const Todo = () => {

    const[inputdata, setInputData] = useState("");
    const[items, setItems] = useState(getLocalData());
    const[isEditItem, setIsEditItem] = useState("");
    const[toggleButton, setToggleButton] = useState(false);

// add items function
    const addItem =()=>{
        if(!inputdata){
            alert('Please Fill The Data')
        }else if(inputdata && toggleButton){
            setItems(
                items.map((curElem)=>{
                    if(curElem.id === isEditItem){
                        return {...curElem, name:inputdata}
                    }return curElem;
                })
            )

            setInputData("")
            setIsEditItem(null)
            setToggleButton(false)
        }
        
        else{
            const myNewInputData ={
                id:new Date().getTime().toString(),
                name: inputdata,
            }
            setItems([...items, myNewInputData])
            setInputData("");
        }
    }

    //edit items

    const editItem = (index)=>{
        const items_todo_edited = items.find((curElem)=>{
            return curElem.id === index;
        })
        setInputData(items_todo_edited.name)
        setIsEditItem(index)
        setToggleButton(true)
    }


    // delete items

  const deleteItem = (index) =>{
    const updatedItem = items.filter((curElem)=>{
        return curElem.id !== index;
    })
    setItems(updatedItem)
  }

  //remove items

  const removeAll = ()=>{
    setItems([])
  }

  //local storage

  useEffect(()=>{
    localStorage.setItem("myTodoList" ,JSON.stringify(items))
  })


  return (
    <>
    <div className='main-div'>
        <div className="child-div">
            <figure>
                <img src="./images/todo.svg" alt="image" />
                <figcaption>Add Your List Here!</figcaption>
            </figure>

            <div className="addItems">
                <input 
                type="text" 
                placeholder="✍ Add Items"
                className="form-control"
                value={ inputdata}
                onChange={(e)=>{
                    setInputData(e.target.value)
                } }
                />

               {toggleButton ? (
                <i className="far fa-edit add-btn" onClick={addItem}></i>  //if toggle button is true then change it with edit button
                ) : (
                <i className="fa fa-plus add-btn" onClick={addItem}></i>)
                }
            </div>

                    {/* show our items */}
                    

                    <div className="showItems">
                        {items.map((curElem, index)=>{
                            return (
                                <div className="eachItem" key={index}>
                            <h3>{curElem.name}</h3>
                            <div className="todo-btn">
                            <i className="far fa-edit add-btn" onClick={()=>{editItem(curElem.id)}}></i>
                            <i className="far fa-trash-alt add-btn" onClick={()=>{
                                deleteItem(curElem.id)
                            }}></i>
                            </div>
                        </div>
                            );
                        })}
                    </div>
                            
                    {/* remove all button */}
            <div className="showItems">
                <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
                    <span>CHECK LIST</span>
                    </button>
                
            </div>

        </div>
        </div>
    </>
    
  )
}

export default Todo