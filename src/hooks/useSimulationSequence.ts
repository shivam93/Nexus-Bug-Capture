import { useState, useCallback, useEffect } from 'react'
import type { RecordedEvent } from '../types'

export function useSimulationSequence() {
    const [events, setEvents] = useState<RecordedEvent[]>([])
    const [isRecording, setIsRecording] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0)

    // Timer effect
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>
        if (isRecording) {
            interval = setInterval(() => {
                setElapsedTime(prev => prev + 1)
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [isRecording])

    const addEvent = useCallback((description: string, type: 'click' | 'navigation' | 'input' = 'click', selector?: string) => {
        if (!isRecording) return

        const newEvent: RecordedEvent = {
            id: crypto.randomUUID(),
            type,
            description,
            timestamp: Date.now(),
            selector
        }
        setEvents(prev => [...prev, newEvent])
    }, [isRecording])

    const toggleRecording = useCallback(() => {
        setIsRecording(prev => !prev)
    }, [])

    const resetSimulation = useCallback(() => {
        setEvents([])
        setElapsedTime(0)
        setIsRecording(false)
    }, [])

    const updateEvent = useCallback((eventId: string, updates: Partial<RecordedEvent>) => {
        setEvents(prev => prev.map(event =>
            event.id === eventId ? { ...event, ...updates } : event
        ))
    }, [])

    return {
        events,
        isRecording,
        elapsedTime,
        addEvent,
        toggleRecording,
        resetSimulation,
        updateEvent
    }
}
