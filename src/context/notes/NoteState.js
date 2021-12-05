// import noteContext from "./noteContext";
// import { useState } from "react";

// const NoteState=(props)=>{
    // const s1 ={
    //     "name": "Khushi",
    //     "class": "csb"
    // }
    // const [state, setstate] = useState(s1);
    // const update=()=>{
    //     setTimeout(() => {
    //         setstate({"name": "Khush",
    //         "class": "csb1"})
    //     }, 1000);
    // }
    // return (
    //     <noteContext.Provider value ={{state, update}}>
    //         {props.children}
    //     </noteContext.Provider>
    // )
//     return (
//         <noteContext.Provider value ={{}}>
//             {props.children}
//         </noteContext.Provider>
//     )
// }
// export default NoteState;

import noteContext from "./noteContext";
import { useState } from "react";
const NoteState=(props)=>{
    const notesInitial = [
        {
          "_id": "61968b1edce5516259e27ed3",
          "user": "618ffdce23da5b985294491c",
          "title": "My book",
          "description": "Be confidence",
          "tag": "personal",
          "date": "2021-11-18T17:19:26.632Z",
          "__v": 0
        },
        {
          "_id": "61968b77dce5516259e27ed9",
          "user": "618ffdce23da5b985294491c",
          "title": "Myself",
          "description": "Be happy",
          "tag": "smile",
          "date": "2021-11-18T17:20:55.882Z",
          "__v": 0
        },
        {
          "_id": "619e8403dce5516259e27edf",
          "user": "618ffdce23da5b985294491c",
          "title": "New note",
          "description": "my personal notes",
          "tag": "notes",
          "date": "2021-11-24T18:27:15.763Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial)
    return (
        <noteContext.Provider value ={{notes, setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;