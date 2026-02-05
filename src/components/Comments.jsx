import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Comments() {
    const [comment, setComment] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!comment.trim()) return

        setIsSubmitting(true)
        setMessage('')

        try {
            const { error } = await supabase
                .from('comments')
                .insert([{ content: comment }])

            if (error) {
                console.error('Supabase error during insert:', error)
                throw error
            }

            setComment('')
            setMessage('Comment submitted successfully!')
        } catch (err) {
            console.error('Submission catch block:', err)
            setMessage(`Error: ${err.message}. (Table: 'comments', Column: 'content')`)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div style={{
            marginTop: '2rem',
            width: '100%',
            maxWidth: '500px',
            padding: '20px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
        }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Leave a comment..."
                    rows="4"
                    style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: 'none',
                        fontSize: '1rem',
                        fontFamily: 'inherit',
                        outline: 'none',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        color: '#333'
                    }}
                />
                <button
                    type="submit"
                    disabled={isSubmitting || !comment.trim()}
                    style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: '#db2777',
                        color: 'white',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: (isSubmitting || !comment.trim()) ? 'not-allowed' : 'pointer',
                        transition: 'background-color 0.2s',
                        opacity: (isSubmitting || !comment.trim()) ? 0.7 : 1
                    }}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Comment'}
                </button>
            </form>
            {message && (
                <p style={{
                    marginTop: '15px',
                    fontSize: '0.9rem',
                    color: message.startsWith('Error') ? '#fca5a5' : '#86efac'
                }}>
                    {message}
                </p>
            )}
        </div>
    )
}
