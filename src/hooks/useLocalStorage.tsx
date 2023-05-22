import { useEffect, useState } from "react";

export function useLocalStorage<T>(initialValue: T | (() => T), key: string) {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key)

        if (jsonValue) {
            return JSON.parse(jsonValue)
        } else {
            if (typeof initialValue === 'function') {
                return (initialValue as () => T)()
            } else {
                return initialValue
            }
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return [value, setValue] as [typeof value, typeof setValue]
}