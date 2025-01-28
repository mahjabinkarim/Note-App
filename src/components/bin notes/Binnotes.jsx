import {getDatabase , onValue, ref, remove, update } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Rcvbutton from '../recover button/Rcvbutton';
import Deletebtn from '../deleteall BTN/Deletebtn';



const Binnotes = () => {

    const [binNotes, setbinNotes] = useState([]);

    // Redux user slice 
      const sliceUser = useSelector((state) => state.userData.value);
    

       // Firebase database
       const db = getDatabase();


useEffect(() => {
    const notesRef = ref(db, 'removeNote/');
    onValue(notesRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().creatorId === sliceUser.uid) {
                  arr.push({ ...item.val(), key: item.key });
                }
        });
      setbinNotes(arr);
    });
  }, [db, sliceUser]);

  const handleDeleteAll = () => {
    const deleteAllRef = ref(db, 'removeNote/');
    remove(deleteAllRef)
      .then(() => {
        console.log('All notes deleted permanently');
      })
      .catch((error) => {
        console.error('Error deleting all notes:', error);
      });
  };

    // Permanently delete note
  const handleDelete = (key) => {
    const deleteRef = ref(db, `removeNote/${key}`);
    remove(deleteRef)
      .then(() => {
        console.log('Note deleted permanently');
      })
      .catch((error) => {
        console.error('Error deleting note:', error);
      });
  };

  // Recover note to allNotes
  const handleRecover = (note) => {
    const recoverRef = ref(db, `allNotes/${note.key}`);
    update(recoverRef, {
      noteTitle: note.noteTitle,
      noteDes: note.noteDes,
      bgColor: note.bgColor,
      creatorId: note.creatorId,
      pin: note.pin || false,
    })
      .then(() => {
        console.log('Note recovered successfully');
        // Remove from bin after recovery
        handleDelete(note.key);
      })
      .catch((error) => {
        console.error('Error recovering note:', error);
      });
  };




  return (
    <>
        <button onClick={handleDeleteAll} className='m-auto items-center text-center mx-[500px] mt-10'>
            <Deletebtn/>
        </button>
      
    {
        binNotes.map((item)=>(

          
      <div key={item.key} className='flex w-[500px] p-[10px] items-center text-center rounded-md bg-[#160f0f48] mt-12 mx-[300px] justify-between gap-5'>
        
        <h2 className='text-2xl'>{item.noteTitle}</h2>


        <div className='flex justify-between gap-10'>



        <button onClick={()=>handleDelete(item.key)} className="deletebtn group relative flex h-10 w-10 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-red-800 bg-red-400 hover:bg-red-600">
              <svg viewBox="0 0 1.625 1.625" className="absolute -top-7 fill-white delay-100 group-hover:top-6 group-hover:animate-[spin_1.4s] group-hover:duration-1000" height={15} width={15}>
                  <path d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195" />
                  <path d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033" />
                  <path d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016" />
             </svg>

             <svg width={16} fill="none" viewBox="0 0 39 7" className="origin-right duration-500 group-hover:rotate-90">
                <line strokeWidth={4} stroke="white" y2={5} x2={39} y1={5} />
                <line strokeWidth={3} stroke="white" y2="1.5" x2="26.0357" y1="1.5" x1={12} />
             </svg>

               <svg width={16} fill="none" viewBox="0 0 33 39" className>
                      <mask fill="white" id="path-1-inside-1_8_19">
                        <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z" />
                      </mask>
                      <path mask="url(#path-1-inside-1_8_19)" fill="white" d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z" />
                      <path strokeWidth={4} stroke="white" d="M12 6L12 29" />
                      <path strokeWidth={4} stroke="white" d="M21 6V29" />
              </svg>
    </button>


       <button onClick={()=>handleRecover(item)} className='Recoverbtn'>
           <Rcvbutton/>
       </button>
        
        </div> 
     </div>

        ))
    }
     
      
      
    </>
  )
}

export default Binnotes
