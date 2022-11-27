
import viewAPI from "./viewAPI.js"
import notesAPI from "./notesAPI.js";



export default class App{
    constructor(root){
        this.notes=[];
        this.activeNote=null;
        this.view=new viewAPI(root,this._handlers())
        this._refreshNotes()
        
       

    }
    
   
  

    _refreshNotes(){
        const notes=notesAPI.getAllNotes()

        this._setNotes(notes);
        if(notes.length>0){
            this._setActiveNotes(notes[0])
        }
    }
    _setNotes(notes){
        this.view.updateNotesList(notes)

    }

    _setActiveNotes(note){
        this.activeNote=note;
        this.view.updateActiveNote(note)

    }



    _handlers(){

        return{
            onPreviewNote:(id)=>{
                const notes=notesAPI.getAllNotes()
                const selectedNote=notes.find(note=>note.id==id);
                this._setActiveNotes(selectedNote)
                
        
        
            },
            onNoteAdd:(inpTitle,inpBody)=>{
                notesAPI.saveNote({
                    title:inpTitle,
                    body:inpBody
                })
                this._refreshNotes()

            },
            onNoteEdit:(inpTitle,inpBody)=>{
                notesAPI.saveNote({
                    id:this.activeNote.id,
                    title:inpTitle,
                    body:inpBody
                })
                this._refreshNotes()

               
               
            },
            onNoteDelete:(id)=>{
                notesAPI.deleteNote(id);
                this._refreshNotes()
            }
           

        }
    }
    
}