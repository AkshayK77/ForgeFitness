import { createContext, useContext, useState, useCallback, useRef } from 'react'

const ToastContext = createContext(null)

const BORDER = { success: 'var(--accent)', warning: 'var(--amber)', error: 'var(--red)' }

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const nextId = useRef(0)

  const showToast = useCallback((message, variant = 'success') => {
    const id = ++nextId.current
    setToasts(prev => {
      const next = [...prev, { id, message, variant }]
      return next.length > 3 ? next.slice(next.length - 3) : next
    })
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <style>{`@keyframes toastIn{from{opacity:0;transform:translateX(-18px)}to{opacity:1;transform:translateX(0)}}`}</style>
      <div style={{
        position: 'fixed', bottom: '24px', left: '24px',
        display: 'flex', flexDirection: 'column', gap: '8px',
        zIndex: 1100, pointerEvents: 'none',
      }}>
        {toasts.map(t => (
          <div
            key={t.id}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border2)',
              borderLeft: `3px solid ${BORDER[t.variant] ?? BORDER.success}`,
              borderRadius: '8px',
              padding: '11px 16px',
              fontSize: '13px',
              color: 'var(--text)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              animation: 'toastIn 0.2s ease forwards',
              pointerEvents: 'auto',
              maxWidth: '300px',
              cursor: 'pointer',
            }}
            onClick={() => setToasts(p => p.filter(x => x.id !== t.id))}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) return { showToast: () => {} }
  return ctx
}
