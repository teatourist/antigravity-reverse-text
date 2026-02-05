import { useState, useEffect } from 'react'
import { supabase } from './lib/supabaseClient'

function App() {
    const [status, setStatus] = useState('Checking Supabase connection...')

    useEffect(() => {
        async function checkConnection() {
            try {
                const { data, error } = await supabase.from('comments').select('count', { count: 'exact', head: true })
                if (error) throw error
                setStatus('Hello World! Supabase connection successful.')
            } catch (err) {
                console.error('Supabase connection error:', err)
                setStatus('Hello World! (Supabase connection failed - check .env)')
            }
        }
        checkConnection()
    }, [])

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            fontFamily: 'Inter, system-ui, sans-serif',
            background: 'linear-gradient(135deg, #f472b6 0%, #db2777 100%)',
            color: 'white',
            width: '100%',
            textAlign: 'center'
        }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'fadeIn 2s' }}>Hello World</h1>
            <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>{status}</p>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    )
}

export default App
