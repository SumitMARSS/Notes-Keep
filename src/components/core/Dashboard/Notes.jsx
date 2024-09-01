
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteNote, updateNote, getAllNotes } from '../../../services/operations/noteApi';
import IconBtn from '../../Common/IconBtn';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const { user } = useSelector((state) => state.profile);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = user?._id;

  useEffect(() => {
    if (!userId) {
      navigate('/login'); // Redirect if user is not logged in
    } else {
      fetchNotes();
    }
  }, [userId, navigate]);

  const fetchNotes = async () => {
    try {
      const notes = await dispatch(getAllNotes(userId)); // Dispatch the Redux action
      //console.log(notes);
      setNotes(notes);
      
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const success = await dispatch(deleteNote(id, token)); // Dispatch the Redux action
      if (success) {
        setNotes(notes.filter(note => note._id !== id));
        toast.success("Note deleted successfully");
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/add-notes/${id}`); // Navigate to AddNotePage with ID for editing
  };

  const handlePin = async (id, isPinned) => {
    try {
      const updatedNote = await dispatch(updateNote(id, { pinned: !isPinned }, token)); // Dispatch the Redux action
      setNotes(notes.map(note => note._id === id ? updatedNote : note));
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Your Notes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          notes.length > 0 ? (
            notes.map(note => (
              <div key={note._id} className="p-4 bg-white shadow-md rounded-md relative">
                <h3 className="text-lg font-bold mb-2">{note.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{note.content}</p>
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button className="text-blue-500" onClick={() => handleEdit(note._id)}><CiEdit /></button>
                  <button className=" text-pink-300" onClick={() => handleDelete(note._id)}><MdDelete /></button>
                  
                  {/* <button className={`text-${note.pinned ? 'yellow' : 'gray'}-500`} onClick={() => handlePin(note._id, note.pinned)}>
                    {note.pinned ? 'Unpin' : 'Pin'}
                  </button> */}
                </div>
              </div>
            ))
          ) : (
            <>
              <IconBtn className=" flex justify-center items-center" onclick={() => navigate("/dashboard/add-notes")}>
                Add Note
              </IconBtn>
            </>
          )
        }
      </div>
    </div>
  );
};

export default Notes;
