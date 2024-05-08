import { useState } from 'react';

export default function NewNoteForm({ addNote }) {
    const [content, setContent] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    addNote(content);
  }


  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea 
        value={content} 
        onChange={evt => setContent(evt.target.value)} />
        <button type="submit">Add Note</button>
      </form>
    </>
  );
}
