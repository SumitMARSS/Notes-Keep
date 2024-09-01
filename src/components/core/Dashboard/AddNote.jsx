
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { addNote, updateNote, getNoteById } from '../../../services/operations/noteApi'; // Import your updateNote and getNoteById functions
import IconBtn from '../../Common/IconBtn';
import { useParams, useNavigate } from 'react-router-dom';

const AddNotePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const token = useSelector((state) => state.auth.token);
  const { id } = useParams(); // Get the id from URL params if present
  const navigate = useNavigate();

  // Fetch note data if id is present (for update)
  useEffect(() => {
    if (id) {
      const fetchNote = async () => {
        try {
          const note = await dispatch(getNoteById(id, token)); // Assuming this function fetches a note by id
          console.log("note from getNote: ", note);
          if (note) {
            setTitle(note.title);
            setContent(note.content);
          }
        } catch (error) {
          console.error('Error fetching note:', error);
        }
      };
      fetchNote();
    }
  }, [id, dispatch, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      if (id) {
        // Update existing note
        const updatedNote = await dispatch(updateNote(id, { title, content }, token));
        if (updatedNote) {
          toast.success("Note updated successfully");
          navigate('/dashboard/notes'); // Redirect after successful update
        }
      } else {
        // Add new note
        const newNote = await dispatch(addNote({ title, content, userId: user._id }, token));
        if (newNote) {
          setTitle('');
          setContent('');
        }
      }
    } catch (error) {
      console.error('Error processing note:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-center mb-6 text-white">{id ? 'Update Note' : 'Add a New Note'}</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md flex justify-center flex-col">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows="4"
          ></textarea>
        </div>
        <IconBtn type="submit">
          <span className=' text-center w-[100%]'>{id ? 'Update Note' : 'Add Note'}</span>
        </IconBtn>
      </form>
      
    </div>
  );
};

export default AddNotePage;
