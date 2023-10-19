import { useCallback, useState } from "react"
import { Employee } from "src/itcorpo/api/dto"
import { getEmployees } from "src/itcorpo/api/EmployeeApi"
import { useLogMessage } from "src/itcorpo/shared/hooks/useLogMessage"

function hasToBeAnError(error: unknown): asserts error is Error {
  if (!(error instanceof Error)) {
    throw error
  }
}

// PRO-TIP: try to AVOID optional properties (?) in your UI model

type Predicate<T> = (item: T) => boolean

// discriminated union
export type CollectionState = {
  state: 'LOADING'
} | {
  state: 'ERROR',
  error: Error,
} | {
  state: 'RESULT',
  result: Employee[],
  completedRate: number,
  filter: (cb: Predicate<Employee>) => Employee[]
};

const filterEmployees = (predicate: Predicate<Employee>, employees: Employee[]) =>
  employees.filter(predicate)

// filters-UNAWARE
export function useEmployeesCollectionData() {
  // const [ bigState, setBigState ] = useState({ isLoading: true, employees: [], completedRate: 0 })
  // setBigState(prev => ({ ...prev, isLoading: true })

  // const [employees, setEmployees] = useState<Employee[]>([]) // 3
  // I DEPEND on the state
  // PRIMIVIVE OBSESSION
  // CREATE STATE (1st render), GET EXISTING STATE (other renders)
  // if (Math.random() > 0.5) {
  // const [isLoading, setLoading] = useState(true) // REACTIVITY model // 2
  // const [error, setError] = useState<Error>() // 2
  // }
  // in total: 12
  // VALID: 4
  // STATE MACHINE
  // const [completedRate, setCompletedRate] = useState(0)
  const [collectionState, setCollectionState] = useState<CollectionState>({ state: "LOADING" })
  useLogMessage(`currentState: ${collectionState.state}`)

  const reload = useCallback((filters: { email: string }) => {
    // depending on UX: reset Employees OR NOT?
    setCollectionState({ state: "LOADING" })
    const { promise, controller } = getEmployees(filters) // HTTP GET
    promise
      .then((result) => setCollectionState({
        state: "RESULT", result, completedRate: 1,
        filter: (cb) => filterEmployees(cb, result)
      }))
      .catch((error: unknown) => {
        hasToBeAnError(error)
        setCollectionState({ state: "ERROR", error })
      })
    return () => {
      controller.abort()
    }
  }, [])
  // const reload = useCallback((filters: { email: string }) => {
  //   // depending on UX: reset Employees OR NOT?
  //   setError(undefined)
  //   setEmployees([])
  //   setLoading(true)
  //   const { promise, controller } = getEmployees(filters) // HTTP GET
  //   promise
  //     .then((employees) => {
  //       // it should be batched, and it is in v18
  //       setEmployees(employees)
  //       setCompletedRate(1)
  //     })
  //     .catch((error) => {
  //       setError(error)
  //     })
  //     .finally(() => {
  //       setLoading(false)
  //     })
  //   const cleanup = () => {
  //     controller.abort()
  //   } // a cleanup function // ngOnDestroy
  //   return cleanup
  // }, [])

  return { collectionState, reload }
}