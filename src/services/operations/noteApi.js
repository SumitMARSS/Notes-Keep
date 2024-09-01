import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { notesEndpoints } from "../apis";

const {
  GET_ALL_NOTES_API,
  ADD_NOTE_API,
  UPDATE_NOTE_API,
  DELETE_NOTE_API,
  GET_NOTE_INFO_API,
} = notesEndpoints;

export function getAllNotes(userId) {
  return async (dispatch) => {
    const toastId = toast.loading("Fetching notes...");
    try {
      const response = await apiConnector(
        "GET",
        GET_ALL_NOTES_API.replace(":userId", userId)
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      //console.log("response.data", response.data.notes);
      return response.data.notes;  
    } catch (error) {
      console.log("GET_ALL_NOTES_API API ERROR............", error);
      toast.error("Could not fetch notes");
      return [];
    } finally {
      toast.dismiss(toastId);
    } 
  };
}

export function addNote(noteData, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Adding note...");
    try {
      const response = await apiConnector(
        "POST",
        ADD_NOTE_API,
        noteData,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response) {
        throw new Error(response.data.message);
      }

      toast.success("Note added successfully");
      console.log(response);
      return response.data;  // Assuming response.data.data contains the new note
    } catch (error) {
      console.log("ADD_NOTE_API API ERROR............", error);
      toast.error("Could not add note");
      return null;
    } finally {
      toast.dismiss(toastId);
    }
  };
}

export function updateNote(noteId, noteData, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating note...");
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_NOTE_API.replace(":id", noteId),
        noteData,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      console.log("Responce in update: ", response);
      return response.data.note;  // Assuming response.data.data contains the updated note
    } catch (error) {
      console.log("UPDATE_NOTE_API API ERROR............", error);
      toast.error("Could not update note");
      return null;
    } finally {
      toast.dismiss(toastId);
    }
  };
}

export function deleteNote(noteId, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Deleting note...");
    try {
      const response = await apiConnector(
        "DELETE",
        DELETE_NOTE_API.replace(":id", noteId),
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      return true;
    } catch (error) {
      console.log("DELETE_NOTE_API API ERROR............", error);
      toast.error("Could not delete note");
      return false;
    } finally {
      toast.dismiss(toastId);
    }
  };
}


export function getNoteById(id) {
  return async (dispatch) => {
    const toastId = toast.loading("Fetching note..."); // Display loading toast
    try {
      const response = await apiConnector(
        "GET",
        notesEndpoints.GET_NOTE_INFO_API.replace(":id", id) // Replace the ID in the endpoint
      );

      if (!response.data.success) {
        throw new Error(response.data.message); // Throw an error if the response is not successful
      }

      console.log("notes ", response);
      return response.data.note; // Return the fetched note
    } catch (error) {
      console.log("GET_NOTE_INFO_API API ERROR............", error); // Log error
      toast.error("Could not fetch note"); // Display error toast
      return null; // Return null if there is an error
    } finally {
      toast.dismiss(toastId); // Dismiss the loading toast
    }
  };
}