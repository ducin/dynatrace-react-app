import { useCallback, useState } from "react"
import { Employee } from "src/itcorpo/api/dto"
import { getEmployees } from "src/itcorpo/api/EmployeeApi"

// filters-UNAWARE
export function useEmployeesCollectionData() {
  // const [ bigState, setBigState ] = useState({ isLoading: true, employees: [], completedRate: 0 })
  // setBigState(prev => ({ ...prev, isLoading: true })

  const [employees, setEmployees] = useState<Employee[]>([]) // 3
  // I DEPEND on the state
  // PRIMIVIVE OBSESSION
  // CREATE STATE (1st render), GET EXISTING STATE (other renders)
  // if (Math.random() > 0.5) {
  const [isLoading, setLoading] = useState(true) // REACTIVITY model // 2
  const [error, setError] = useState<Error>() // 2
  // }
  // in total: 12
  // VALID: 4
  // STATE MACHINE
  const [completedRate, setCompletedRate] = useState(0)

  const reload = useCallback((filters: { email: string }) => {
    // depending on UX: reset Employees OR NOT?
    setError(undefined)
    setLoading(true)
    const { promise, controller } = getEmployees(filters) // HTTP GET
    promise
      .then((employees) => {
        // it should be batched, and it is in v18
        setEmployees(employees)
        setCompletedRate(1)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
    const cleanup = () => {
      controller.abort()
    } // a cleanup function // ngOnDestroy
    return cleanup
  }, [])

  return { employees, isLoading, error, reload }
}