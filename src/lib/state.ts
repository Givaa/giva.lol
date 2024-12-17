import { useHookstate } from '@hookstate/core';
import { Persistence } from '@hookstate/persistence';
import { useEffect } from 'react';
import { useMedia } from 'react-use';

import type { State } from '@hookstate/core';
import type { Settings } from '~/types';

export const STATE_KEY = 'settings';

export function usePersistantState(): State<Settings> {
	const noMotionPreference = useMedia('(prefers-reduced-motion: no-preference)', true);

	// Usa useHookstate con Persistence come estensione nel secondo parametro
	const state = useHookstate<Settings>({
		animations: null,
		sound: true,
	}, Persistence(STATE_KEY));  // Applica l'estensione della persistenza

	useEffect(() => {
		// Gestire la logica per il cambiamento dinamico del valore "animations"
		if (state.animations.get() === null) {
			state.animations.set(noMotionPreference);  // Imposta il valore di animations
		}
	}, [noMotionPreference, state]);

	return state;
}


