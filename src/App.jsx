import { useEffect, useState } from "react";

import Delete from "./assets/delete.svg";
import Note from "./assets/newnote.svg";
export default function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );

  useEffect(() => {
    updateStorage();
  }, [notes]);

  function handleCreateNote() {
    setNotes([...notes, ""]);
  }

  function handleDeleteNote(index) {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  }

  const handleNoteChange = (index, value) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = value;
    setNotes(updatedNotes);
  };

  const updateStorage = () => {
    localStorage.setItem("notes", JSON.stringify(notes));
  };
  return (
    <>
      <div className="bg-gradient-to-b from-indigo-500 via-indigo-300 to-pink-100 w-screen min-h-screen text-white  pt-4 pl-10">
        <h1 className=" font-mono flex items-center justify-center text-3xl font-bold mt-10 ml-2 ">
          Keeper
        </h1>
        <div className="flex justify-center items-center h-40">
          <button
            className="flex items-center bg-indigo-900 font-bold cursor-pointer outline-none border-none rounded-full py-4 px-8"
            onClick={handleCreateNote}
          >
            <span className="mr-2">Create Note</span>
            <img className="h-5" src={Note} alt="" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-flow-cols-2 sm:gap-4 md:grid-cols-3 md:gap-0">
          {notes.map((note, index) => (
            <div key={index}>
              <textarea
                value={note}
                onChange={(e) => handleNoteChange(index, e.target.value)}
                className="w-2/3 max-w-md min-h-48 bg-white text-gray-950 outline-none rounded-md p-5 m-5"
              />
              <button
                onClick={() => handleDeleteNote(index)}
                className="bg-indigo-950 font-bold cursor-pointer outline-none border-none rounded-full py-4 px-6 my-5"
              >
                <img className="h-5" src={Delete} alt="" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
