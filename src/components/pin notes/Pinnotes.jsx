import { getDatabase, onValue, push, ref, remove, update } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { IoMdTrash } from 'react-icons/io';
import { IoPinSharp } from 'react-icons/io5';
import { MdOutlineEdit } from 'react-icons/md';
import { useSelector } from 'react-redux';

const Pinnotes = () => {
  const sliceUser = useSelector((state) => state.userData.value);
  const [pinNotes, setpinNotes] = useState([]);
  const [showoptionmenu, setshowoptionmenu] = useState(false);
  const [clickoption, setclickoption] = useState({});
  const db = getDatabase();

  useEffect(() => {
    const notesRef = ref(db, 'allNotes/');
    onValue(notesRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().pin === true && item.val().creatorId === sliceUser?.uid) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setpinNotes(arr);
    });
  }, [db, sliceUser]);

  const trimText = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };

  const handelshowmenu = (item) => {
    if (clickoption.key === item.key && showoptionmenu) {
      setshowoptionmenu(false);
      setclickoption({});
    } else {
      setclickoption(item);
      setshowoptionmenu(true);
    }
  };
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
  const handelupdate = (pinnoteid) => {
    update(ref(db, 'allNotes/' + pinnoteid), {
      pin: false,
    });
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 ml-10 mt-8 ">
      {pinNotes.map((note) => (
        <div
          key={note.key}
          style={{ backgroundColor: note.bgColor }}
          className="w-[200px] h-[200px] rounded-md border-[2px] relative overflow-hidden shadow-md transition-all duration-[.4s]"
        ><div className='relative'>
                  <BiDotsVerticalRounded onClick={()=>handelshowmenu(note)} className='text-xl text-gray-700 mt-2 ml-[90%] cursor-pointer ' />
                    {
                      clickoption.key==note.key  && showoptionmenu &&
        
                      <div className=' absolute transition-all duration-[1s] px-2 py-2  top-full right-3 flex flex-col items-center bg-slate-200 rounded-sm '>
                      <button onClick={()=>handelupdate(note.key)} className='flex gap-2  justify-between  items-center transition-all duration-[.4s]'><IoPinSharp className=' rotate-45 text-[red] ' />Unpin</button>
                      <button className='flex gap-2 justify-center items-center transition-all duration-[.4s]'><MdOutlineEdit className='text-[#131346]' />Edit</button>
                      <button onClick={()=>handleRemove(note)} className='flex gap-2 justify-center items-center transition-all duration-[.4s]'><IoMdTrash className='text-[red]' />Bin</button>
                    </div>
                    }
                  </div>
                  <IoPinSharp className='rotate-[-45deg] text-[#e40404] absolute top-[10px] left-[10px]' />
          <h2 className="font-bold font-sans p-3 text-xl text-[#3d3d3c]">
            {trimText(note.noteTitle, 20)}
          </h2>
          <p className="font-normal font-sans p-3 text-[16px] text-[#1a1a19]">
            {trimText(note.noteDes, 50)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Pinnotes;
