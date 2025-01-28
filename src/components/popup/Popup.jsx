import React, { useState, useEffect } from 'react';
import { ImCross } from "react-icons/im";
import { IoColorPaletteOutline } from "react-icons/io5";
import { CgColorPicker } from "react-icons/cg";
import { push, ref, update, getDatabase } from 'firebase/database';
import { useSelector } from 'react-redux';

const Popup = ({ cardvalue, popcross, editNoteData }) => {
  const [showcolor, setshowcolor] = useState(false);
  const [bgcolor, setbgcolor] = useState('#ffff');
  const [formData, setFormData] = useState({
    noteTitle: '',
    noteDes: '',
    noteTitleError: '',
    noteDesError: ''
  });

  const db = getDatabase();
  const userData = useSelector((state) => state.userData.value);

  if (!userData || !userData.uid) {
    console.error('UID not found in Redux state!');
    return <div>Error: UID not found. Please log in.</div>;
  }

  const { uid } = userData;

  // Load editNoteData into form when it changes
  useEffect(() => {
    if (editNoteData) {
      setFormData({
        noteTitle: editNoteData.noteTitle || '',
        noteDes: editNoteData.noteDes || '',
        noteTitleError: '',
        noteDesError: ''
      });
      setbgcolor(editNoteData.bgColor || '#ffff');
    }
  }, [editNoteData]);

  const handleSubmit = () => {
    let hasError = false;

    if (!formData.noteTitle) {
      setFormData((prev) => ({
        ...prev,
        noteTitleError: 'Enter your note title'
      }));
      hasError = true;
    }

    if (!formData.noteDes) {
      setFormData((prev) => ({
        ...prev,
        noteDesError: 'Enter your note description'
      }));
      hasError = true;
    }

    if (!hasError) {
      push(ref(db, 'allNotes/'), {
        noteTitle: formData.noteTitle,
        noteDes: formData.noteDes,
        bgColor: bgcolor,
        creatorId: uid,
        pin: false
      });

      popcross(); // Close the popup
      setFormData({
        noteTitle: '',
        noteDes: '',
        noteTitleError: '',
        noteDesError: ''
      }); // Reset the input fields
      setbgcolor('#ffff'); // Reset the background color
    }
  };

  const handleUpdate = () => {
    if (!editNoteData || !editNoteData.key) {
      console.error('Error: Missing key in editNoteData');
      return;
    }

    update(ref(db, 'allNotes/' + editNoteData.key), {
      noteTitle: formData.noteTitle,
      noteDes: formData.noteDes,
      bgColor: bgcolor,
      pin: editNoteData.pin || false
    })
      .then(() => {
        console.log('Updated data:', {
          noteTitle: formData.noteTitle,
          noteDes: formData.noteDes,
          bgColor: bgcolor,
          pin: editNoteData.pin || false
        });
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });

    popcross(); // Close the popup
    setFormData({
      noteTitle: '',
      noteDes: '',
      noteTitleError: '',
      noteDesError: ''
    }); // Reset the input fields
    setbgcolor('#ffff'); // Reset the background color
  };

  return (
    <div className={`${cardvalue ? 'w-full' : 'w-0'} z-10 transition-all duration-[1s] fixed min-h-full right-0 top-0 bg-[#42414144] dark:bg-[#ececec1c] flex-col flex justify-center items-center`}>
      <div onClick={popcross} className={`${cardvalue ? 'block' : 'hidden'} text-[#0000007e] hover:text-red-500 dark:text-white dark:hover:text-red-500 absolute top-5 right-5 text-2xl`}>
        <ImCross />
      </div>

      <div style={{ background: bgcolor,}} className={`${cardvalue ? 'block' : 'hidden'} flex-grow fixed w-[600px] min-h-fit p-9 my-2 rounded-lg`}>
        <h2 className='font-bold font-sans text-2xl text-[#5a5a59]'>Title</h2>
        <input
          value={formData.noteTitle}
          onChange={(e) => setFormData({ ...formData, noteTitle: e.target.value, noteTitleError: '' })}
          className='w-full pl-5 my-[25px] h-[50px] outline-none shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] rounded-lg font-medium font-sans text-xl text-[#5a5a59]'
          placeholder='Enter your note title.....'
          type="text"
        />
        {formData.noteTitleError && <p className="text-red-500">{formData.noteTitleError}</p>}

        <h2 className='font-bold font-sans text-2xl text-[#5a5a59]'>Description</h2>
        <textarea
          value={formData.noteDes}
          onChange={(e) => setFormData({ ...formData, noteDes: e.target.value, noteDesError: '' })}
          className='w-full p-5 my-[25px] h-[300px] outline-none shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] rounded-lg font-medium font-sans text-xl text-[#5a5a59]'
          placeholder='Enter your note description.....'
          type="text"
        />
        {formData.noteDesError && <p className="text-red-500">{formData.noteDesError}</p>}

        <div className='flex justify-between'>
          <div className='color'>
            <div className='colors w-[400px] flex gap-3 items-center relative overflow-hidden transition-all duration-[.4s]'>
              <IoColorPaletteOutline
                onClick={() => setshowcolor(!showcolor)}
                className='text-4xl text-slate-500 hover:rotate-180 cursor-pointer transition-all duration-[.4s]'
              />
              <div className={`${showcolor ? 'left-10' : 'left-[-180px]'} allcolors overflow-hidden flex gap-3 absolute transition-all duration-[.8s]`}>
                <button onClick={() => setbgcolor('#bcceff')} className='w-[20px] h-[20px] rounded-full border-[1px] border-[#444444] bg-[#bcceff]'></button>
                <button onClick={() => setbgcolor('#BEFDBA')} className='w-[20px] h-[20px] rounded-full border-[1px] border-[#444444] bg-[#BEFDBA]'></button>
                <button onClick={() => setbgcolor('#FFFB8F')} className='w-[20px] h-[20px] rounded-full border-[1px] border-[#444444] bg-[#FFFB8F]'></button>
                <button onClick={() => setbgcolor('#FFCFCF')} className='w-[20px] h-[20px] rounded-full border-[1px] border-[#444444] bg-[#FFCFCF]'></button>
                <button className='rounded-full border-[2px] border-[#444444] hover:border-transparent transition-all duration-[.3s] hover:bg-gradient-to-r from-red-500 to-orange-500'>
                  <label htmlFor="color">
                    <CgColorPicker className='text-[19px] p-[1.5px] cursor-pointer text-[#585555] rounded-full hover:text-slate-50 hover:bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-[.3s]' />
                  </label>
                  <input onChange={(e) => setbgcolor(e.target.value)} id='color' className='hidden' type="color" />
                </button>
              </div>
            </div>
          </div>
          <div className='add'>
            <button
              onClick={editNoteData ? handleUpdate : handleSubmit}
              className="flex justify-center items-center gap-2 w-16 h-9 cursor-pointer rounded-2xl shadow-2xl text-white font-semibold bg-gradient-to-r from-[#14b8a6] via-[#059669] to-[#047857] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#047857] hover:to-[#14b8a6]"
            >
              {editNoteData ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;

