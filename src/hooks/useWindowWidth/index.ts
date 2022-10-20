import { useRef, useState } from 'react';
import { useEventListener } from '../useEventListener';

const breakpoints = Object.freeze({
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
	xxl: 1500
});

/**
 * Checks if the window size matches any given width
 * @param width The window width
 */
export function useWindowWidth(width: keyof typeof breakpoints): boolean {
	const mediaQuery = useRef<MediaQueryList>((window ?? {}).matchMedia(`(min-width: ${breakpoints[width]}px)`));
	const [match, setMatch] = useState<boolean>(mediaQuery.current?.matches);

	useEventListener('change', ({ matches }) => setMatch(matches), mediaQuery.current);

	return match;
}
