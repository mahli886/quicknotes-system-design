// API URL
const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Get HTML elements
const loadBtn = document.getElementById("load-btn");
const submitBtn = document.getElementById("submit-btn");
const noteForm = document.getElementById("note-form");
const titleInput = document.getElementById("title-input");
const bodyInput = document.getElementById("body-input");
const notesList = document.getElementById("notes-list");
const statusMessage = document.getElementById("status");

// Store notes in an array
let notes = [];

// Reusable API request function
async function request(url, options = {}) {
    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

// Display status messages
function showStatus(message, type = "") {
    statusMessage.textContent = message;
    statusMessage.className = type;
}

// Display notes on the page
function renderNotes() {
    notesList.replaceChildren();

    // Show a message if there are no notes
    if (notes.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.textContent = "No notes available. Create your first note!";
        emptyMessage.className = "empty-state";
        notesList.appendChild(emptyMessage);
        return;
    }

    // Display each note
    notes.forEach((note) => {
        const li = document.createElement("li");
        li.className = "note-item";

        const heading = document.createElement("h3");
        heading.textContent = note.title;

        const paragraph = document.createElement("p");
        paragraph.textContent = note.body || "No content provided.";

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.type = "button";

        deleteBtn.addEventListener("click", () => {
            deleteNote(note.id, deleteBtn);
        });

        li.append(heading, paragraph, deleteBtn);
        notesList.appendChild(li);
    });
}

// GET: Load notes from the server
async function loadNotes() {
    loadBtn.disabled = true;
    showStatus("Loading notes...");

    try {
        const data = await request(`${API_URL}?_limit=10`);

        notes = data;
        renderNotes();

        if (notes.length === 0) {
            showStatus("No notes found.", "success");
        } else {
            showStatus(
                `Loaded ${notes.length} notes from the server.`,
                "success"
            );
        }

    } catch (error) {
        showStatus(
            "Sorry, we couldn't load your notes. Please try again.",
            "error"
        );

        console.error(error);

    } finally {
        loadBtn.disabled = false;
    }
}

// POST: Create a new note
async function createNote(event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    // Validate the title
    if (!title) {
        showStatus("Please enter a note title.", "error");
        titleInput.focus();
        return;
    }

    if (title.length > 100) {
        showStatus("Title must not exceed 100 characters.", "error");
        titleInput.focus();
        return;
    }

    submitBtn.disabled = true;
    showStatus("Creating note...");

    try {
        const newNote = await request(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                body: body,
                userId: 1
            })
        });

        // JSONPlaceholder simulates POST requests.
        // Store the returned note locally so it appears on the page.
        notes.unshift(newNote);

        renderNotes();

        showStatus(
            `Note created (status 201, id ${newNote.id}).`,
            "success"
        );

        noteForm.reset();

    } catch (error) {
        showStatus(
            "Sorry, we couldn't create your note. Please try again.",
            "error"
        );

        console.error(error);

    } finally {
        submitBtn.disabled = false;
    }
}

// DELETE: Remove a note
async function deleteNote(id, button) {
    button.disabled = true;
    showStatus("Deleting note...");

    try {
        await request(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        // JSONPlaceholder simulates deletion.
        // Remove the note from the local UI.
        notes = notes.filter((note) => note.id !== id);

        renderNotes();

        showStatus("Note deleted successfully.", "success");

    } catch (error) {
        showStatus(
            "Sorry, we couldn't delete this note. Please try again.",
            "error"
        );

        console.error(error);

        button.disabled = false;
    }
}

// Event listeners
loadBtn.addEventListener("click", loadNotes);

noteForm.addEventListener("submit", createNote);

// Display the initial empty state
renderNotes();
