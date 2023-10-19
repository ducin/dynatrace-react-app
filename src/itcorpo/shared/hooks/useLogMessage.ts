import { useEffect } from "react"

declare const dynatrace: any

export const useLogMessage = (message: string) => {
    useEffect(() => {
        console.log(message)
    }, [message])
}
