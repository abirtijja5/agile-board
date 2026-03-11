import { useState, useEffect } from 'react'

const API = 'http://localhost:8080/tasks'
const COLS = [
  { id: 'todo',        label: 'À faire' },
  { id: 'in_progress', label: 'En cours' },
  { id: 'done',        label: 'Terminées' },
]

export default function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => { load() }, [])

  async function load() {
    const res = await fetch(API).catch(() => null)
    if (res) setTasks(await res.json())
  }

  return (
    <div className="app">
      <header><h1>Agile Board</h1></header>
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
              </div>
            ))}
          </section>
        ))}
      </main>
    </div>
  )
}
