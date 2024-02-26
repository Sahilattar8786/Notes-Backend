// noteController.js
const Note =require('../Model/noteModel');
const getNotes = async (req, res) => {
   const notes= await Note.find({ user: req.user._id });
   res.json(notes)
};

const getNoteById=async (req, res) => {
   
    const note =await Note.findById(req.params.id)
    if(note){
      res.json(note)
    }
    else{
      res.status(404).json({message:"Note Not Found"});
    }
}

const createNote = async (req, res) => {
    const { title, Content, Category } = req.body;

    if (!title || !Content || !Category) {
      res.status(400);
      throw new Error("Please Fill all the feilds");
      return;
    } else {
      const note = new Note({ user: req.user._id, title, Content, Category });
  
      const createdNote = await note.save();
  
      res.status(201).json(createdNote);
};
}

const deleteNote = async (req, res) => {
  
  const note =await Note.findById(req.params.id);
  if(note.user.toString()!== req.user._id.toString()){
    res.status(401);
    throw new Error("You Cant Perform This Action");
  }
  if(note){
    const note = await Note.findById(req.params.id);

    if (note.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("You can't perform this action");
    }
  
    if (note) {
      await note.deleteOne();
      res.json({ message: "Note Removed" });
    } else {
      res.status(404);
      throw new Error("Note not Found");
    }

  }
  else{
    res.status(404);
    throw new Error('Not Found');
  }
 

};

const updateNote = async (req, res) => {
  const { title, Content, Category } = req.body;

  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (note) {
    note.title = title;
    note.Content = Content;
    note.Category = Category;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
};

module.exports = { getNotes, createNote, deleteNote, updateNote ,getNoteById };
