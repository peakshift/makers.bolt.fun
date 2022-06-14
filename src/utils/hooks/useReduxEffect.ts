import { useRef, useEffect, useCallback } from 'react'
import { Action } from '@reduxjs/toolkit'
import { useStore } from 'react-redux'

/**
 * Subscribes to redux store events
 *
 * @param effect
 * @param type 
 */
export function useReduxEffect<TAction extends Action>(
    effect: (action: TAction) => void,
    type: string | string[],
): void {
    const currentValue = useRef(null)
    const store = useStore()

    const handleChange = useCallback(() => {
        const state = store.getState() as any;
        const action = state.action
        const previousValue = currentValue.current
        currentValue.current = action.count

        if (
            previousValue !== action.count &&
            castArray(type).includes(action.type)
        ) {
            effect(action)
        }
    }, [effect, store, type])

    useEffect(() => {
        const unsubscribe = store.subscribe(handleChange)
        return (): void => unsubscribe()
    }, [handleChange, store])
}


// Native
function castArray<T>(arr: T | Array<T>) {
    return Array.isArray(arr) ? arr : [arr]
}
