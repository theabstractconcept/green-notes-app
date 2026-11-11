import { useEffect, useState } from "react";
import api from "./api";

function Auth({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
      const { data } = await api.post(endpoint, form);
      localStorage.setItem("green-notes-token", data.token);
      onAuth(data.user);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Is the API running?");
    } finally { setBusy(false); }
  }

  return <main className="auth-wrap">
    <section className="auth-card">
      <div className="brand-mark">g.</div>
      <p className="eyebrow">A QUIET SPACE FOR YOUR THOUGHTS</p>
      <h1>{mode === "login" ? "Welcome back." : "Make space."}</h1>
      <p className="muted">{mode === "login" ? "Sign in to your notes." : "Create an account to get started."}</p>
      <form onSubmit={submit}>
        {mode === "register" && <label>Name<input required value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Your name" /></label>}
        <label>Email<input required type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} placeholder="you@example.com" /></label>
        <label>Password<input required minLength="6" type="password" value={form.password} onChange={e => setForm({...form, password:e.target.value})} placeholder="At least 6 characters" /></label>
        {error && <p className="error">{error}</p>}
        <button className="primary full" disabled={busy}>{busy ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}</button>
      </form>
      <p className="switch-auth">{mode === "login" ? "New here?" : "Already have an account?"} <button onClick={() => {setMode(mode === "login" ? "register" : "login");setError("");}}>{mode === "login" ? "Create an account" : "Sign in"}</button></p>
    </section>
  </main>;
}

function NoteForm({ initial, onSave, onCancel }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [body, setBody] = useState(initial?.body || "");
  const [isPublic, setIsPublic] = useState(initial?.isPublic || false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    try { await onSave({ title, body, isPublic }); }
    catch (err) { setError(err.response?.data?.message || "Could not save note"); }
  }

  return <form className="note-form" onSubmit={submit}>
    <input autoFocus value={title} onChange={e => setTitle(e.target.value)} placeholder="Give your note a title…" required />
    <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Start writing…" rows="6" required />
    <div className="form-bottom">
      <label className="checkbox"><input type="checkbox" checked={isPublic} onChange={e => setIsPublic(e.target.checked)} /> Make public</label>
      <div className="form-actions"><button type="button" className="ghost" onClick={onCancel}>Cancel</button><button className="primary">{initial ? "Save changes" : "Add note"}</button></div>
    </div>
    {error && <p className="error">{error}</p>}
  </form>;
}

function NoteCard({ note, own, onEdit, onDelete }) {
  return <article className="note-card">
    <div className="note-meta"><span className={`visibility ${note.isPublic ? "public" : ""}`}>{note.isPublic ? "PUBLIC" : "PRIVATE"}</span><span>{own ? "You" : note.owner?.name || "Someone"}</span></div>
    <h3>{note.title}</h3>
    <p className="note-body">{note.body}</p>
    <div className="note-footer"><span>{new Date(note.updatedAt).toLocaleDateString()}</span>
      {own && <div className="note-actions"><button className="text-button" onClick={() => onEdit(note)}>Edit</button><button className="text-button danger-text" onClick={() => onDelete(note._id)}>Delete</button></div>}
    </div>
  </article>;
}

function Dashboard({ user, onLogout }) {
  const [tab, setTab] = useState("mine");
  const [mine, setMine] = useState([]);
  const [publicNotes, setPublicNotes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadNotes() {
    setError("");
    try {
      const [a, b] = await Promise.all([api.get("/notes/mine"), api.get("/notes/public")]);
      setMine(a.data); setPublicNotes(b.data);
    } catch (err) { setError(err.response?.data?.message || "Could not load notes"); }
    finally { setLoading(false); }
  }

  useEffect(() => { loadNotes(); }, []);

  async function saveNote(values) {
    if (editing) await api.put(`/notes/${editing._id}`, values);
    else await api.post("/notes", values);
    setEditing(null); setCreating(false); await loadNotes();
  }

  async function deleteNote(id) {
    if (!window.confirm("Delete this note?")) return;
    try { await api.delete(`/notes/${id}`); await loadNotes(); }
    catch (err) { setError(err.response?.data?.message || "Could not delete note"); }
  }

  const notes = tab === "mine" ? mine : publicNotes;

  return <main className="dashboard">
    <header className="topbar"><a className="wordmark" href="#">green<span>notes</span></a><div className="user-menu"><span>Hi, {user.name}</span><button className="ghost" onClick={onLogout}>Log out</button></div></header>
    <section className="intro"><p className="eyebrow">YOUR PERSONAL CORNER</p><h1>Good thoughts<br/><em>grow here.</em></h1><p className="muted">Write privately, or share something with the world.</p></section>
    <section className="workspace">
      <div className="tabs"><button className={tab === "mine" ? "active" : ""} onClick={() => {setTab("mine");setCreating(false);setEditing(null);}}>My Notes <span>{mine.length}</span></button><button className={tab === "public" ? "active" : ""} onClick={() => {setTab("public");setCreating(false);setEditing(null);}}>Public Notes <span>{publicNotes.length}</span></button></div>
      {tab === "mine" && !creating && !editing && <button className="new-note" onClick={() => setCreating(true)}>＋ <span>Write a note</span></button>}
      {(creating || editing) && tab === "mine" && <NoteForm key={editing?._id || "new"} initial={editing} onSave={saveNote} onCancel={() => {setCreating(false);setEditing(null);}} />}
      {error && <p className="error">{error}</p>}
      {loading ? <p className="muted empty">Loading your notes…</p> : notes.length === 0 && !creating && !editing ? <div className="empty"><div className="empty-icon">✳</div><h3>{tab === "mine" ? "A blank page." : "Nothing shared yet."}</h3><p className="muted">{tab === "mine" ? "Your next idea starts with a note." : "Public notes from everyone will appear here."}</p></div> :
        <div className="notes-grid">{notes.map(note => <NoteCard key={note._id} note={note} own={tab === "mine"} onEdit={setEditing} onDelete={deleteNote} />)}</div>}
    </section>
    <footer>Made for thoughts that matter.</footer>
  </main>;
}

export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("green-notes-token");
    if (!token) { setChecking(false); return; }
    api.get("/auth/me").then(({data}) => setUser(data.user))
      .catch(() => localStorage.removeItem("green-notes-token"))
      .finally(() => setChecking(false));
  }, []);

  function logout() {
    localStorage.removeItem("green-notes-token");
    setUser(null);
  }

  if (checking) return <div className="loading-screen">green notes</div>;
  return user ? <Dashboard user={user} onLogout={logout} /> : <Auth onAuth={setUser} />;
}
