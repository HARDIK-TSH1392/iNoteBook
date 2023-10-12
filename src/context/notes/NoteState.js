import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5001"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    // Get all Note
    const getNotes = async () => {
        // API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            methods: 'GET',
            header: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyNmUwODVkZmRkMDE2MzBlMTgxMjgyIn0sImlhdCI6MTY5NzA0Njc5Nn0.nvQBIm832prI959pUfKaVRUExmot1fLmyKNql_F7cDg"
            }
        });
        const json = await response.json();
        console.log(json);
    }

    // Add a Note
    const addNote = async (title, description, tag) => {
        // TODO: API Call
        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/api/notes/addnote`, {
            methods: 'POST',
            header: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxY2ExNjQ5YmJlMzNmOTgwZDUyNWEzIn0sImlhdCI6MTY5Njg1NjE4MH0.vbdkBSnEwNUFgcAJqXSr3qn2wvJH6dC_gz__XjPNlcs"
            },
            body: JSON.stringify({title, description, tag})
        });

            let note = {
                "_id": "6526449ee2cb7145y298baoa",
                "user": "651ca1649bbe33f980d525a3",
                "title": title,
                "description": description,
                "tag": tag,
                "date": "2023-10-11T06:45:50.121Z",
                "__v": 0
            }
        setNotes(notes.concat(note))
    }

    // Delete a Note
    const deleteNote = (id) => {
        console.log("Deleting the note with id" + id);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            methods: 'POST',
            header: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxY2ExNjQ5YmJlMzNmOTgwZDUyNWEzIn0sImlhdCI6MTY5Njg1NjE4MH0.vbdkBSnEwNUFgcAJqXSr3qn2wvJH6dC_gz__XjPNlcs"
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = response.json();
        // Login to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = id;
                element.description = description;
                element.tag = tag;
            }

        }
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;