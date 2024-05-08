import * as notesAPI from '../utilities/notes-api';

export async function getALL(notes) {
    const notes = await usersAPI.getAll(notes);
    localStorage.setItem('note', note);
}