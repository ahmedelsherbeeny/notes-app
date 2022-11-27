export default class viewAPI {
  constructor(root, { onNoteAdd, onNoteEdit,onNoteDelete,onPreviewNote } ) {
    this.root = root;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteDelete=onNoteDelete;
    this.onPreviewNote=onPreviewNote;
    this.root.innerHTML = `

        <div class="animation-part " data-text="NOTES...">NOTES...</div>
        <!-- Button trigger modal -->
<button type="button" class="btn btn-success rounded-pill " data-toggle="modal" data-target="#exampleModalCenter">
  Add your note
</button>

 <!-- Modal -->
 <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header text-center d-flex justify-content-center">
      <input class="notes__title-add" type="text" placeholder="Enter a title...">

       
      </div>
      <div class="modal-body">
          <div class="notes__preview-add">
              <textarea class="notes__body-add">I am an empty note...</textarea>
          </div> 
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary close-note-add" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary save-note-add" data-dismiss="modal">Add</button>
      </div>
    </div>
  </div>
</div>

<div class="notes  text-center mt-5  "><div class="notes__list ">
  
</div>
</div>
        
        
        
        
        `;


    const btnAdd = document.querySelector(".save-note-add")
    const btnClose= document.querySelector(".close-note-add")

    const inpTitle = document.querySelector(".notes__title-add")
    const inpBody = document.querySelector(".notes__body-add")
   
   
   

    btnAdd.addEventListener("click", () => {
      const addedTitle = inpTitle.value.trim();
      const addedBody = inpBody.value.trim();
      this.onNoteAdd(addedTitle,addedBody)
      inpTitle.value=""
      inpBody.value="Iam an empty note..."
     
    });
    btnClose.addEventListener("click", () => {
     
      inpTitle.value=""
      inpBody.value="Iam an empty note..."
     
    });

    
 
  }




  _createNotesList(id, title, body, updated,count) {
    const MAX_LENTH_BODY = 62;

    return `

      <div class=" notes__list-item   " style="margin-bottom:10px;" data-note-id="${id}">
      <div class="notes__small-title">${title}</div>
      <div class="notes__small-body">${body.substring(0, MAX_LENTH_BODY)}
      ${body.length > MAX_LENTH_BODY ? "..." : ""}
      
      </div>
      <div class="notes__small-updated">${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}</div>
      <div class="icons d-flex">

      <button type="button" class="btn btn-primary btn-sm btnPreview"  data-toggle="modal" data-target="#preview">Preview Note</button>

      <!-- Modal -->
 <div class="modal fade" id="preview" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Editing note</h5>
       
      </div>
      <div class="modal-body">
          <div class="notes__preview-prev">
              <input class="notes__title-prev" type="text" placeholder="Enter a title...">
              <textarea class="notes__body-prev">I am the notes body...</textarea>
          </div> 
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary cancel-note-prev" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary save-note-prev" data-note-id="${id}"   data-dismiss="modal">Update</button>
      </div>
    </div>
  </div>
</div>








      <button type="button" class="btn btn-danger btn-sm  btnDelete"data-toggle="modal" data-target="#${id}" >
      Delete Note</button>

      <!-- Modal -->
      <div class="modal fade" id="${id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
       <div class="modal-dialog modal-dialog-centered" role="document">
         <div class="modal-content">
          
           <div class="modal-body">
           Are you sure you want to delete this note?
             
             
           </div>
           <div class="modal-footer">
             <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
             <button type="button" class="btn btn-primary delete-d" data-note-id="${id}"   data-dismiss="modal">Yes</button>
           </div>
         </div>
       </div>
     </div>
   
       
      
      </div>
          
      
      </div>
      
      
      
      
      `


  }

  



  updateNotesList(notes) {
    let count=1;
   
    const notesList = this.root.querySelector(".notes__list");
    notesList.innerHTML = "";
    for (const note of notes) {
      const html = this._createNotesList(note.id, note.title, note.body, new Date(note.updated),count);
      notesList.insertAdjacentHTML("beforeend", html)
      count ++;

    }

   

    document.querySelectorAll(".delete-d").forEach(d=>{
      d.addEventListener("click",()=>{
        this.onNoteDelete(d.dataset.noteId)
      })

    })



    notesList.querySelectorAll(".notes__list-item").forEach(noteListItem=>{
      noteListItem.querySelectorAll(".btnPreview").forEach(d=>{
        d.addEventListener("click",()=>{
          this.onPreviewNote(noteListItem.dataset.noteId)
        })
      })
    })
    const btnupdate = document.querySelector(".save-note-prev")
    const inpTitlePrev = document.querySelector(".notes__title-prev")
    const inpBodyPrev = document.querySelector(".notes__body-prev")
    btnupdate.addEventListener("click",()=>{
      const updatedTitle = inpTitlePrev.value.trim();
      const updatedBody = inpBodyPrev.value.trim();
      this.onNoteEdit(updatedTitle,updatedBody);
     
    
    })
    document.querySelector(".cancel-note-prev").addEventListener("click",()=>{
      this.updateActiveNote(notes[0])
    })






  
   
  }


 
 


  updateActiveNote(note){
    document.querySelector(".notes__title-prev").value=note.title;
    document.querySelector(".notes__body-prev").value=note.body;
    
    document.querySelectorAll(".notes__list-item").forEach(noteListItem=>{
      noteListItem.classList.remove("notes__list-item--selected")
    })
    document.querySelector(`.notes__list-item[data-note-id="${note.id}"]`).classList.add("notes__list-item--selected")



    
  }
 
  
 

  
}