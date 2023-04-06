import React, { useState } from 'react'
import Note from './Note';

const Form = () => {
    const [input, setinput] = useState({
        title: "",
        description: ""
    });

    // ************************get input value************************
    const change = (e) => {
        const { name, value } = e.target;
        setinput((data) => {
            return {
                ...data,
                [name]: value
            }
        })
    }

    // *********************addnote by backend api*********************
    const addnote = async (req, res) => {
        try {
            const { title, description } = input;
            const adding = await fetch('http://localhost:4000/addnote', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title, description
                })
            })

            if (res.status === 401) {
                alert("Please fill all data")
            }
            await adding.json();

        } catch (e) {
            console.log(e.message);
        }
    }

    // *************************submit note************************* 
    // eslint-disable-next-line 
    const [add, setadd] = useState([])

    const submit = () => {
        setadd((data) => {
            return [data, input]
        })
        addnote();
    }

    // *********************get note*********************
    const [data, setdata] = useState();

    const getnote = async () => {
        try {
            const get = await fetch('http://localhost:4000/getnote', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const result = await get.json();
            setdata(result.allnote)
        } catch (e) {
            console.log(e.message);
        }
    }

    getnote();

    // delete note
    const deletenow = async (id) => {
        try {
            const res = await fetch(`http://localhost:4000/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            console.log(data);
        } catch (e) {
            console.log(e.message);
        }
    }

    // edit note
    const editnow = async (id) => {
        try {
            const { title, description } = input;
            const res = await fetch(`http://localhost:4000/editnote/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title, description
                })
            });
            await res.json();
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <>
            <div className="mainform">
                <div className="title-div">
                    <label htmlFor="title" className='label'>Title</label> <br />
                    <input type="text" onChange={change} value={input.title} name="title" id="title" />
                </div>
                <div className="title-div">
                    <label htmlFor="description" className='label'>Description</label> <br />
                    <input type="text" onChange={change} value={input.description} name="description" id="description" />
                </div>
                <button className="btn" onClick={submit}>Add Note</button>
            </div>
            <div className="maincard">
                {data?.map((val) => {
                    return <Note key={val._id} {...val} id={val._id} editnote={editnow} deletenote={deletenow} />
                })}
            </div>
        </>
    )
}

export default Form
