import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as notesAPI from '../../utilities/notes-api';
import NewNoteForm from '../../components/NewNoteForm/NewNoteForm';

export default function NewNotePage() {
    const [notes, setNotes] = useState([]);
    const { noteId } = useParams();

    useEffect(function () {
        async function getNotes() {
            const notes = await notesAPI.getAll();
            setNotes(notes);
        }
        getNotes();
    }, [noteId]);
    // if (!notes) return 'No Notes Yet';


    async function addNote(note) {
        const newNote = await notesAPI.add({ text: note });
        setNotes([...notes, newNote]);
    }

    return (
        <main>
            <h1>New Note Page</h1>
            
            {notes ? 
            <>
            { notes.map((n, idx) => <p>{n.text} {n.createdAt.toLocaleString()}</p>)} 
            </>
                :
                <p>No Notes Yet!</p>
            }
            <NewNoteForm addNote={addNote} />
        </main>

    );
}