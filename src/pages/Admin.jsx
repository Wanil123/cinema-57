import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { films as initialFilms, news as initialNews } from '../data/genres'
import { useTranslation } from '../contexts/LanguageContext'

// ============ ADMIN LAYOUT ============
function AdminLayout({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Close sidebar on route change (mobile)
  useEffect(() => { setSidebarOpen(false) }, [location.pathname])

  const navItems = [
    { path: '/admin', label: t('admin.dashboard'), icon: 'dashboard' },
    { path: '/admin/films', label: t('admin.films'), icon: 'movie' },
    { path: '/admin/news', label: t('admin.actualites'), icon: 'newspaper' },
    { path: '/admin/members', label: t('admin.membres'), icon: 'group' },
    { path: '/admin/reservations', label: t('admin.reservations'), icon: 'confirmation_number' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-charcoal text-white flex flex-col fixed h-full z-50 transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link to="/" className="flex items-baseline gap-0.5">
            <span className="font-display text-2xl font-bold">5</span>
            <span className="font-display text-2xl font-bold text-crimson">:</span>
            <span className="font-display text-2xl font-bold">7</span>
            <span className="text-xs text-white/40 ml-2 uppercase tracking-wider">Admin</span>
          </Link>
          <button className="lg:hidden text-white/60 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>

        <nav className="flex-1 py-4">
          {navItems.map(item => (
            <Link key={item.path} to={item.path}
              className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                (item.path === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(item.path))
                  ? 'bg-crimson/20 text-crimson border-r-2 border-crimson'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}>
              <span className="material-symbols-rounded text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-crimson flex items-center justify-center text-sm font-bold">
              {(user.name || 'A')[0].toUpperCase()}
            </div>
            <div>
              <div className="text-sm font-semibold">{user.name || 'Admin'}</div>
              <div className="text-xs text-white/40">{user.email || 'admin@fdf.ca'}</div>
            </div>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-2 text-white/40 hover:text-crimson text-xs transition-colors">
            <span className="material-symbols-rounded text-sm">logout</span> {t('admin.deconnexion')}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center gap-3 mb-6">
          <button onClick={() => setSidebarOpen(true)}
            className="w-10 h-10 rounded-lg bg-charcoal text-white flex items-center justify-center">
            <span className="material-symbols-rounded">menu</span>
          </button>
          <Link to="/" className="flex items-baseline gap-0.5">
            <span className="font-display text-xl font-bold">5</span>
            <span className="font-display text-xl font-bold text-crimson">:</span>
            <span className="font-display text-xl font-bold">7</span>
            <span className="text-xs text-gray-400 ml-2 uppercase tracking-wider">Admin</span>
          </Link>
        </div>
        {children}
      </main>
    </div>
  )
}

// ============ DASHBOARD ============
function Dashboard() {
  const { t } = useTranslation()
  const stats = [
    { label: t('admin.films'), value: initialFilms.length, icon: 'movie', color: 'bg-crimson' },
    { label: t('admin.actualites'), value: initialNews.length, icon: 'newspaper', color: 'bg-gold' },
    { label: t('admin.membres'), value: 128, icon: 'group', color: 'bg-teal' },
    { label: t('admin.reservations'), value: 342, icon: 'confirmation_number', color: 'bg-burgundy' },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-display font-bold mb-8">{t('admin.dashboard')}</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 ${s.color} rounded-lg flex items-center justify-center`}>
                <span className="material-symbols-rounded text-white text-lg">{s.icon}</span>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-display font-bold">{s.value}</div>
            <div className="text-sm text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <h2 className="font-display text-lg font-bold mb-4">{t('admin.activite')}</h2>
        <div className="space-y-4">
          {[
            { action: t('admin.nouvelle_resa'), detail: 'Jean Tremblay — VIP x2', time: `${t('admin.il_y_a')} 2h`, icon: 'confirmation_number' },
            { action: t('admin.film_ajoute'), detail: 'The Dark Knight — Action', time: `${t('admin.il_y_a')} 5h`, icon: 'movie' },
            { action: t('admin.nouveau_membre'), detail: 'Marie Lapointe', time: t('admin.hier'), icon: 'person_add' },
            { action: t('admin.article_publie'), detail: 'Les festivals de films en 2025', time: t('admin.hier'), icon: 'edit' },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-rounded text-sm text-gray-500">{a.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold">{a.action}</div>
                <div className="text-xs text-gray-400 truncate">{a.detail}</div>
              </div>
              <span className="text-xs text-gray-400 shrink-0">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ============ CRUD TABLE COMPONENT ============
function CrudTable({ title, columns, data, onAdd, onEdit, onDelete }) {
  const { t } = useTranslation()
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold">{title}</h1>
        {onAdd && (
          <button onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-crimson text-white text-sm font-semibold rounded-lg hover:bg-crimson-dark transition-colors">
            <span className="material-symbols-rounded text-lg">add</span>
            <span className="hidden sm:inline">{t('admin.ajouter')}</span>
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {columns.map(col => (
                <th key={col.key} className="text-left text-[11px] uppercase tracking-wider font-semibold text-gray-500 px-4 sm:px-6 py-4">
                  {col.label}
                </th>
              ))}
              <th className="text-right text-[11px] uppercase tracking-wider font-semibold text-gray-500 px-4 sm:px-6 py-4">{t('admin.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row.id || i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                {columns.map(col => (
                  <td key={col.key} className="px-4 sm:px-6 py-4 text-sm">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
                <td className="px-4 sm:px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {onEdit && (
                      <button onClick={() => onEdit(row)}
                        className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors">
                        <span className="material-symbols-rounded text-sm text-gray-500 hover:text-blue-600">edit</span>
                      </button>
                    )}
                    {onDelete && (
                      <button onClick={() => onDelete(row)}
                        className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-colors">
                        <span className="material-symbols-rounded text-sm text-gray-500 hover:text-red-600">delete</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">{t('admin.aucun')}</div>
        )}
      </div>
    </motion.div>
  )
}

// ============ MODAL COMPONENT ============
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-[600px] max-h-[80vh] overflow-y-auto relative z-10">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="font-display text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <span className="material-symbols-rounded text-sm">close</span>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </motion.div>
    </div>
  )
}

// ============ FILMS MANAGEMENT ============
function FilmsAdmin() {
  const { t } = useTranslation()
  const [filmsList, setFilmsList] = useState(initialFilms)
  const [modal, setModal] = useState(null)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', genre: '', year: '', rating: '', director: '', duration: '', synopsis: '', horaire: '', trailer: '' })

  const columns = [
    { key: 'title', label: t('admin.titre'), render: (r) => <span className="font-semibold">{r.title}</span> },
    { key: 'genre', label: t('admin.genre'), render: (r) => (
      <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-crimson/10 text-crimson">{r.genre}</span>
    )},
    { key: 'year', label: t('admin.annee') },
    { key: 'rating', label: t('admin.note') },
    { key: 'director', label: t('admin.realisateur') },
  ]

  const handleAdd = () => {
    setForm({ title: '', genre: 'Action', year: '2025', rating: '', director: '', duration: '', synopsis: '', horaire: '', trailer: '' })
    setEditing(null)
    setModal('add')
  }

  const handleEdit = (film) => {
    setForm({ ...film, year: String(film.year) })
    setEditing(film)
    setModal('edit')
  }

  const handleDelete = (film) => {
    if (confirm(`${t('admin.supprimer_confirm')} "${film.title}" ?`)) {
      setFilmsList(filmsList.filter(f => f.id !== film.id))
    }
  }

  const handleSave = () => {
    if (editing) {
      setFilmsList(filmsList.map(f => f.id === editing.id ? { ...f, ...form, year: Number(form.year) } : f))
    } else {
      const newId = Math.max(...filmsList.map(f => f.id), 0) + 1
      setFilmsList([...filmsList, { ...form, id: newId, year: Number(form.year), image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=560&fit=crop&q=80' }])
    }
    setModal(null)
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  return (
    <>
      <CrudTable title={`${t('admin.films')} (${filmsList.length})`} columns={columns} data={filmsList}
        onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />

      {modal && (
        <Modal title={modal === 'edit' ? t('admin.modifier_film') : t('admin.ajouter_film')} onClose={() => setModal(null)}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-gray-500 block mb-1">{t('admin.titre')}</label>
                <input name="title" value={form.title} onChange={handleChange} required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-crimson transition-colors" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-gray-500 block mb-1">{t('admin.genre')}</label>
                <select name="genre" value={form.genre} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-crimson transition-colors">
                  {['Action', 'Drame', 'Sci-Fi', 'Horreur', 'Comedie'].map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-gray-500 block mb-1">{t('admin.annee')}</label>
                <input name="year" value={form.year} onChange={handleChange} type="number"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-crimson transition-colors" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-gray-500 block mb-1">{t('admin.note')}</label>
                <input name="rating" value={form.rating} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-crimson transition-colors" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-gray-500 block mb-1">{t('admin.duree')}</label>
                <input name="duration" value={form.duration} onChange={handleChange} placeholder="120 min"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-crimson transition-colors" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-gray-500 block mb-1">{t('admin.realisateur')}</label>
                <input name="director" value={form.director} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-crimson transition-colors" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-gray-500 block mb-1">{t('admin.horaire')}</label>
                <input name="horaire" value={form.horaire} onChange={handleChange} placeholder="20:00"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-crimson transition-colors" />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-gray-500 block mb-1">{t('admin.url_ba')}</label>
              <input name="trailer" value={form.trailer} onChange={handleChange} placeholder="https://youtube.com/watch?v=..."
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-crimson transition-colors" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-gray-500 block mb-1">{t('admin.synopsis')}</label>
              <textarea name="synopsis" value={form.synopsis} onChange={handleChange} rows={3}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-crimson transition-colors resize-none" />
            </div>
            <div className="flex gap-3 pt-4">
              <button onClick={() => setModal(null)}
                className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                {t('admin.annuler')}
              </button>
              <button onClick={handleSave}
                className="flex-1 py-2.5 bg-crimson text-white rounded-lg font-semibold text-sm tracking-wider uppercase hover:bg-crimson-dark transition-colors">
                {modal === 'edit' ? t('admin.sauvegarder') : t('admin.ajouter')}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

// ============ NEWS MANAGEMENT ============
function NewsAdmin() {
  const { t } = useTranslation()
  const [newsList, setNewsList] = useState(initialNews)
  const [modal, setModal] = useState(null)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', text: '', content: '', date: '' })

  const columns = [
    { key: 'title', label: t('admin.titre'), render: (r) => <span className="font-semibold">{r.title}</span> },
    { key: 'date', label: t('admin.date') },
    { key: 'text', label: t('admin.resume'), render: (r) => <span className="text-gray-500 text-xs line-clamp-2">{r.text}</span> },
  ]

  const handleAdd = () => {
    setForm({ title: '', text: '', content: '', date: new Date().toLocaleDateString('fr-CA') })
    setEditing(null)
    setModal('add')
  }

  const handleEdit = (item) => {
    setForm({ ...item })
    setEditing(item)
    setModal('edit')
  }

  const handleDelete = (item) => {
    if (confirm(`${t('admin.supprimer_confirm')} "${item.title}" ?`)) {
      setNewsList(newsList.filter(n => n.id !== item.id))
    }
  }

  const handleSave = () => {
    if (editing) {
      setNewsList(newsList.map(n => n.id === editing.id ? { ...n, ...form } : n))
    } else {
      const newId = Math.max(...newsList.map(n => n.id), 0) + 1
      setNewsList([...newsList, { ...form, id: newId, image: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=600&h=400&fit=crop&q=80' }])
    }
    setModal(null)
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  return (
    <>
      <CrudTable title={`${t('admin.actualites')} (${newsList.length})`} columns={columns} data={newsList}
        onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />

      {modal && (
        <Modal title={modal === 'edit' ? t('admin.modifier_article') : t('admin.ajouter_article')} onClose={() => setModal(null)}>
          <div className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-gray-500 block mb-1">{t('admin.titre')}</label>
              <input name="title" value={form.title} onChange={handleChange} required
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-crimson transition-colors" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-gray-500 block mb-1">{t('admin.date')}</label>
              <input name="date" value={form.date} onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-crimson transition-colors" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-gray-500 block mb-1">{t('admin.resume')}</label>
              <textarea name="text" value={form.text} onChange={handleChange} rows={2}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-crimson transition-colors resize-none" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-gray-500 block mb-1">{t('admin.contenu')}</label>
              <textarea name="content" value={form.content} onChange={handleChange} rows={5}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-crimson transition-colors resize-none" />
            </div>
            <div className="flex gap-3 pt-4">
              <button onClick={() => setModal(null)}
                className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                {t('admin.annuler')}
              </button>
              <button onClick={handleSave}
                className="flex-1 py-2.5 bg-crimson text-white rounded-lg font-semibold text-sm tracking-wider uppercase hover:bg-crimson-dark transition-colors">
                {modal === 'edit' ? t('admin.sauvegarder') : t('admin.ajouter')}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

// ============ MEMBERS MANAGEMENT ============
function MembersAdmin() {
  const { t } = useTranslation()
  const [members, setMembers] = useState([
    { id: 1, name: 'Admin Festival', email: 'admin@fdf.ca', role: 'admin', created: '2025-01-01' },
    { id: 2, name: 'Jean Tremblay', email: 'jean@exemple.com', role: 'user', created: '2025-09-15' },
    { id: 3, name: 'Marie Lapointe', email: 'marie@exemple.com', role: 'user', created: '2025-10-01' },
    { id: 4, name: 'Luc Bergeron', email: 'luc@exemple.com', role: 'user', created: '2025-10-10' },
    { id: 5, name: 'Sophie Martin', email: 'sophie@exemple.com', role: 'user', created: '2025-10-18' },
  ])

  const columns = [
    { key: 'name', label: t('admin.nom'), render: (r) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-crimson/10 flex items-center justify-center text-crimson text-xs font-bold">
          {r.name[0]}
        </div>
        <span className="font-semibold">{r.name}</span>
      </div>
    )},
    { key: 'email', label: t('admin.courriel') },
    { key: 'role', label: t('admin.role'), render: (r) => (
      <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full ${
        r.role === 'admin' ? 'bg-gold/20 text-gold' : 'bg-gray-100 text-gray-500'
      }`}>{r.role}</span>
    )},
    { key: 'created', label: t('admin.inscrit_le') },
  ]

  const handleDelete = (member) => {
    if (member.role === 'admin') return alert(t('admin.admin_interdit'))
    if (confirm(`${t('admin.supprimer_confirm')} "${member.name}" ?`)) {
      setMembers(members.filter(m => m.id !== member.id))
    }
  }

  return (
    <CrudTable title={`${t('admin.membres')} (${members.length})`} columns={columns} data={members}
      onDelete={handleDelete} />
  )
}

// ============ RESERVATIONS MANAGEMENT ============
function ReservationsAdmin() {
  const { t } = useTranslation()
  const [reservations] = useState([
    { id: 1, name: 'Jean Tremblay', email: 'jean@exemple.com', film: 'The Dark Knight', forfait: 'VIP', quantity: 2, total: '500$', date: '2025-10-20' },
    { id: 2, name: 'Marie Lapointe', email: 'marie@exemple.com', film: 'Dune', forfait: 'Cinephile', quantity: 1, total: '120$', date: '2025-10-21' },
    { id: 3, name: 'Luc Bergeron', email: 'luc@exemple.com', film: 'Hereditary', forfait: 'Decouverte', quantity: 3, total: '135$', date: '2025-10-22' },
    { id: 4, name: 'Sophie Martin', email: 'sophie@exemple.com', film: 'Inception', forfait: 'VIP', quantity: 1, total: '250$', date: '2025-10-23' },
  ])

  const columns = [
    { key: 'name', label: t('admin.nom'), render: (r) => <span className="font-semibold">{r.name}</span> },
    { key: 'film', label: t('admin.films') },
    { key: 'forfait', label: t('admin.forfait'), render: (r) => (
      <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-crimson/10 text-crimson">{r.forfait}</span>
    )},
    { key: 'quantity', label: t('admin.billets') },
    { key: 'total', label: t('admin.total'), render: (r) => <span className="font-bold text-crimson">{r.total}</span> },
    { key: 'date', label: t('admin.date') },
  ]

  return <CrudTable title={`${t('admin.reservations')} (${reservations.length})`} columns={columns} data={reservations} />
}

// ============ MAIN ADMIN COMPONENT ============
export default function Admin() {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="films" element={<FilmsAdmin />} />
        <Route path="news" element={<NewsAdmin />} />
        <Route path="members" element={<MembersAdmin />} />
        <Route path="reservations" element={<ReservationsAdmin />} />
      </Routes>
    </AdminLayout>
  )
}
