import { RefObject, useState } from 'react';
import { useEventListener } from '../useEventListener';

/**
 * When a user clicks somewhere checks if the event was triggered within the target element or not
 */
export function useClickOutside<ElementType extends HTMLElement>(ref: RefObject<ElementType>, callback?: () => void): boolean {
	const [isOutside, setIsOutside] = useState<boolean>(false);

	/**
	 * Handles when user clicks outside the ref
	 */
	function handleClick(event: MouseEvent) {
		if (!ref.current) return;

		const clickedOutside = ref.current && !ref.current.contains(event.target as HTMLElement);

		setIsOutside(clickedOutside);
		if (clickedOutside) callback?.();
	}

	useEventListener('click', handleClick);

	return isOutside;
}
