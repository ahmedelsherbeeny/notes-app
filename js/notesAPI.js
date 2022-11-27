export default class notesAPI{
    static getAllNotes(){
        const notes=JSON.parse(localStorage.getItem("allNotes")|| "[]")
        return notes.sort((a,b)=>{
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1 ;
        })
    }

    static saveNote(noteToSave){
       
        const notes=this.getAllNotes()
        const existing=notes.find(note=>note.id==noteToSave.id)
        if(existing){
            existing.title=noteToSave.title;
            existing.body=noteToSave.body;
            existing.updated=new Date().toISOString()
           

        }else{
            noteToSave.id=Math.floor(Math.random() * 1000000)
            noteToSave.updated=new Date().toISOString();
            notes.push(noteToSave)


        }

        localStorage.setItem("allNotes",JSON.stringify(notes))
        


    }
    
    static deleteNote(id){
        const notes=this.getAllNotes()
        const newNotes=notes.filter(note=> note.id != id)
        localStorage.setItem("allNotes",JSON.stringify(newNotes))
    }

}