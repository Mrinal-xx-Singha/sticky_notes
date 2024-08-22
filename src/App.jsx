import React from "react";
import NotesPage from "./page/NotesPage";
import NoteProvider from "./context/NoteContext";

const App = () => {
  return (
    <div id="app">
      <NoteProvider>
        <NotesPage />
      </NoteProvider>
    </div>
  );
};

export default App;
