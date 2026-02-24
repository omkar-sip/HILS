import { create } from 'zustand'
import type { Persona } from '../types/persona.types'
import { DEFAULT_PERSONAS } from '../types/persona.types'

interface PersonaStore {
    activePersona: Persona
    personas: Persona[]
    setPersona: (personaId: string) => void
}

export const usePersonaStore = create<PersonaStore>((set, get) => ({
    activePersona: DEFAULT_PERSONAS[0]!,
    personas: DEFAULT_PERSONAS,

    setPersona: (personaId) => {
        const persona = get().personas.find((p) => p.id === personaId)
        if (persona) {
            set({ activePersona: persona })
        }
    },
}))
