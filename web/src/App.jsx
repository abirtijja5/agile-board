import { useState, useEffect } from 'react'

const API = 'http://localhost:8080/tasks'
const COLS = [
  { id: 'todo',        label: 'À faire' },
  { id: 'in_progress', label: 'En cours' },
  { id: 'done',        label: 'Terminées' },
]

export default function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [desc,  setDesc]  = useState('')

  useEffect(() => { load() }, [])

  async function load() {
    const res = await fetch(API).catch(() => null)
    if (res) setTasks(await res.json())
  }

  async function add(e) {
    e.preventDefault()
    if (!title.trim()) return
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title.trim(), description: desc.trim() }),
    })
    setTitle(''); setDesc('')
    load()
  }

  async function del(id) {
    await fetch(`${API}/${id}`, { method: 'DELETE' })
    load()
  }

  async function move(id, status) {
    await fetch(`${API}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    load()
  }

  function colIndex(status) { return COLS.findIndex(c => c.id === status) }

  return (
    <div className="app">
      <header>
        <h1>Agile Board</h1>
        <form onSubmit={add}>
          <input placeholder="Titre..." value={title} onChange={e => setTitle(e.target.value)} required />
          <input placeholder="Description (optionnel)" value={desc} onChange={e => setDesc(e.target.value)} />
          <button type="submit">+ Ajouter</button>
        </form>
      </header>
      <main>
        {COLS.map(col => (
          <section key={col.id}>
            <h2>{col.label} <span>{tasks.filter(t => t.status === col.id).length}</span></h2>
            {tasks.filter(t => t.status === col.id).map(t => (
              <div key={t.id} className="card">
                <div className="card-text">
                  <p>{t.title}</p>
                  {t.description && <small>{t.description}</small>}
                </div>
                <div className="card-actions">
                  {colIndex(t.status) > 0 && (
                    <button onClick={() => move(t.id, COLS[colIndex(t.status) - 1].id)}>←</button>
                  )}
                  {colIndex(t.status) < COLS.length - 1 && (
                    <button onClick={() => move(t.id, COLS[colIndex(t.status) + 1].id)}>→</button>
                  )}
                  <button className="del" onClick={() => del(t.id)}>×</button>
                </div>
              </div>
            ))}
          </section>
        ))}
      </main>
    </div>
  )
}
