import './index.css'

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-blue-400 mb-4">
        Habit Tracker
      </h1>
      <p className="text-lg text-slate-300">
        Start tracking your habits and build a better you!
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-colors cursor-pointer group">
          <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-400">Track</h2>
          <p className="text-slate-400">Log your daily progress easily with simple clicks.</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-green-500 transition-colors cursor-pointer group">
          <h2 className="text-xl font-semibold mb-2 group-hover:text-green-400">Streaks</h2>
          <p className="text-slate-400">Maintain momentum and see your habits grow.</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-purple-500 transition-colors cursor-pointer group">
          <h2 className="text-xl font-semibold mb-2 group-hover:text-purple-400">Analyze</h2>
          <p className="text-slate-400">Beautiful statistics and insights for every habit.</p>
        </div>
      </div>
    </div>
  )
}

export default App
