import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 5000,
})

export async function checkServerHealth(signal: AbortSignal): Promise<void> {
  const { data } = await api.get<{ status?: string; service?: string }>('/health', { signal })

  if (data?.status !== 'ok' || data?.service !== 'zavrzlama-backend') {
    throw new Error('Neočekivan odgovor servera.')
  }
}
