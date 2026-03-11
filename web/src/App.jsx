const COLS = [
  { id: 'todo',        label: 'À faire' },
  { id: 'in_progress', label: 'En cours' },
  { id: 'done',        label: 'Terminées' },
]

export default function App() {
  return (
    <div className="app">
      <header><h1>Agile Board</h1></header>
      <main>
        {COLS.map(col => (
          <section key={col.id}>
            <h2>{col.label} <span>0</span></h2>
          </section>
        ))}
      </main>
    </div>
  )
}
