import { useEffect, useState } from 'react'
import { checkServerHealth } from '../services/api'

type ConnectionState = 'checking' | 'online' | 'offline'

const labels: Record<ConnectionState, string> = {
  checking: 'Proveravamo vezu sa serverom…',
  online: 'Veza sa serverom je uspostavljena',
  offline: 'Server trenutno nije dostupan',
}

function BackendStatus() {
  const [connection, setConnection] = useState<ConnectionState>('checking')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    checkServerHealth(controller.signal)
      .then(() => {
        if (!controller.signal.aborted) setConnection('online')
      })
      .catch(() => {
        if (!controller.signal.aborted) setConnection('offline')
      })

    return () => controller.abort()
  }, [attempt])

  function retry() {
    setConnection('checking')
    setAttempt((previous) => previous + 1)
  }

  return (
    <div className="connection-status" data-state={connection}>
      <p role="status">
        <span className="status-dot" aria-hidden="true" />
        {labels[connection]}
      </p>
      {connection === 'offline' && (
        <button type="button" onClick={retry} className="text-link">
          Proveri ponovo <span aria-hidden="true">↗</span>
        </button>
      )}
    </div>
  )
}

export default BackendStatus
