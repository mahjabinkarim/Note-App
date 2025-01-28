import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, update, remove, push } from 'firebase/database';
import { useSelector } from 'react-redux';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoPinSharp } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import Popup from '../popup/Popup';
const SingleNote = () => {
  // Redux user slice 
  const sliceUser = useSelector((state) => state.userData.value);

  // Custom state variables
  const [allNotes, setAllNotes] = useState([]);
  const [showoptionmenu, setshowoptionmenu] = useState(false)
  const [clickoption,setclickoption] = useState('')
  const [showpopup, setshowpopup ]= useState(false)
  const [editData, seteditData ]= useState(null)
    // Firebase database
  const db = getDatabase();

  // Realtime database 
  useEffect(() => {
    const notesRef = ref(db, 'allNotes/');
    onValue(notesRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().creatorId === sliceUser.uid) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setAllNotes(arr);
    });
  }, [db, sliceUser]);

    //  Remove function and create Remove db
    const handleRemove = (removeData) => {
      if (!removeData.key) {
        console.error("Key not found in removeData:", removeData);
        return;
      }
    
      // Remove note from `allNotes` and add it to `removeNote`
      const removeNoteRef = ref(db, 'removeNote/');
      const noteRef = ref(db, `allNotes/${removeData.key}`);
    
      // Push to `removeNote`
      push(removeNoteRef, {
        noteTitle: removeData.noteTitle,
        noteDes: removeData.noteDes,
        bgColor: removeData.bgColor,
        creatorId: sliceUser.uid,
        pin: removeData.pin,
      })
        .then(() => {
          // Remove from `allNotes`
          return remove(noteRef);
        })
        .then(() => {
          console.log("Note successfully removed and moved to bin.");
        })
        .catch((error) => {
          console.error("Error removing the note:", error);
        });
    };
    




  // Text trim helper function
  const trimText = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };
  //  ===============handelars
  const handelshowmenu = (item)=>{
      setclickoption(item)
      setshowoptionmenu(!showoptionmenu)
  }
  const handelupdate =(pinnoteid)=>{
     update(ref(db,'allNotes/'+pinnoteid),{
      pin:true
     })

  }

  return (
    <div className="flex flex-wrap gap-4 p-4 ml-10 mt-8">
      {allNotes.map((note) => (
        <div
          key={note.key}
          style={{ backgroundColor: note.bgColor }}
          className="w-[200px] h-[200px] rounded-md border-[2px] overflow-hidden shadow-md transition-all duration-[.4s]"
        >
          <div className='relative'>
          <BiDotsVerticalRounded onClick={()=>handelshowmenu(note)} className='text-xl text-gray-700 mt-2 ml-[90%] cursor-pointer ' />
            {
              clickoption.key==note.key  && showoptionmenu &&

              <div className=' absolute transition-all duration-[1s] px-2 py-2  top-full right-3 flex flex-col items-center bg-slate-200 rounded-sm '>
              <button onClick={()=>handelupdate(note.key)} className='flex gap-2  justify-center hover:text-[#8fb0e0] items-center transition-all duration-[.4s]'><IoPinSharp className=' rotate-45 text-[red] ' />Pin</button>
              <button onClick={()=>{setshowpopup(!showpopup),seteditData(note)}}  className='flex gap-2 justify-center items-center transition-all duration-[.4s]'><MdOutlineEdit className='text-[#131346]' />Edit</button>
              <button onClick={()=>handleRemove(note)} className='flex gap-2 justify-center items-center transition-all duration-[.4s]'><IoMdTrash className='text-[red]' />Bin</button>
            </div>
            }
          </div>

           
          <h2 className="font-bold font-sans p-3 text-xl text-[#3d3d3c]">
            {trimText(note.noteTitle, 20)}
          </h2>
          <p className="font-normal font-sans text-ellipsis p-3 text-[16px] text-[#1a1a19]">
            {trimText(note.noteDes, 50)}
          </p>
          <Popup cardvalue={showpopup} editNoteData={editData} popcross={()=>setshowpopup(false)}/>
        </div>
      ))}
    </div>
  );
};

export default SingleNote;

