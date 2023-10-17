import React, { ReactNode, useCallback, useDebugValue, useEffect, useState } from 'react'

import { to2 } from '../../utils/math';

import { EmployeeRow } from './EmployeeRow';
import { Employee } from '../../api/dto';
import { getEmployees } from '../../api/EmployeeApi';

import { Loader } from '../../shared/Loader';
import { Sidebar } from '../../shared/sidebar/Sidebar';
import { AdditionalCosts } from './AdditionalCosts';

type EmployeesPageProps = {
  label: string
  header?: ReactNode
}

const useEmployeeState__ = () => {
  useDebugValue(`the weather is ${Math.random() > 0.5 ? 'fine' : 'awful'} today`)
  return useState<Employee[]>([])
}

const useForceRender = () => {
  // private API
  const [count, setCount] = useState(0)
  const forceRender = () => setCount(count + 1)
  // public API
  return forceRender
}
// === // Object.is



// with a custom hook, DEVTOOLS are going to reflect that thing (State Wrapped)
function useStateWrapped <T>(initial){
  return useState<T>(initial)
}

// RULES OF HOOKS:
// you can call the hook (1) inside the component, (2) inside custom hooks
// you gotta call hooks in EXACT SAME ORDER on every render
// const [isLoading, setLoading] = useState(true)

function useEmployeesState() {
  // const [ bigState, setBigState ] = useState({ isLoading: true, employees: [], completedRate: 0 })
  // setBigState(prev => ({ ...prev, isLoading: true })

  const [employees, setEmployees] = useState<Employee[]>([]) // 3
  // I DEPEND on the state
  // PRIMIVIVE OBSESSION
  // CREATE STATE (1st render), GET EXISTING STATE (other renders)
  // if (Math.random() > 0.5) {
  const [isLoading, setLoading] = useState(true) // REACTIVITY model // 2
  const [hasError, setError] = useState<Error>() // 2
  // }
  // in total: 12
  // VALID: 4
  // STATE MACHINE
  const [completedRate, setCompletedRate] = useState(0)

  const reload = () => {
    // depending on UX: reset Employees OR NOT?
    setError(undefined)
    setLoading(true)
    getEmployees() // HTTP GET
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
      // AbortController.abort()
    } // a cleanup function // ngOnDestroy
    return cleanup
  }

  useEffect(() => {
    // ngOnInit
    return reload()
  }, []) // ngOnChanges

  return { employees, isLoading, completedRate, reload }
}

// 1. provide an input/text
// 2. whatever text is changed, adjust the employee subset to be displayed
// part 2: server-side filtering:
// 3. take zis: http://localhost:3005/employees?email_like=ber

export const EmployeesPage: React.FC<EmployeesPageProps> = (props) => {

  // const employeesData: Employee [] = [{
  //   salary: 12000,
  //   skills
  // }] as Employee[]
  // memory cell: READ, WRITE
  // const [employees, setEmployees] = useState<Employee[]>([])

  const { employees, isLoading, completedRate, reload } = useEmployeesState()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [nameFilter, setNameFilter] = useState('')

  // const forceRender = useForceRender()
  // forceRender()

  // implement "reload" button

  const onEmployeeBenefitClicked = useCallback((e: Employee) => {
    // there is some logic
    console.log('🍕', e)
  }, [])

  const onEmployeeDeleted = useCallback((e: Employee) => {
    console.log('☠️️️', e)
  }, [])

  const onEmployeeMoneyBumped = useCallback((e: Employee) => {
    console.log('💰', e)
  }, [])

  const toggleSidebarCollapsed = () => {
    setSidebarCollapsed(collapsed => !collapsed)
  }

  // 37.2 - total (my own nodes + child components)
  // 2.4 - my own nodes ONLY
  // 34.8 - child components ONLY
  // REACT FRAGMENT (VDOM) - NOTHING in DOM
  const node = (<>
    <h2>{props.label}</h2>
    <Sidebar
      collapsed={sidebarCollapsed}
      onCloseClick={toggleSidebarCollapsed}>
        RECENTLY VIEWED EMPLOYEES DISPLAYED HERE
    </Sidebar>
    {/* <RoundButton onClick={this.toggleSidebarCollapsed} /> */}
    <span className="icon" role="img" aria-label="toggle sidebar" onClick={toggleSidebarCollapsed}>📖</span>
    <button onClick={reload}>reload</button>

    {isLoading && <Loader />}
    count: {employees.length}
    {` `}
    ({to2(completedRate * 100)} %)
    <input
      type='text'
      placeholder='employee e-mail'
      value={nameFilter}
      onChange={e => setNameFilter(e.target.value)}
    />
    <AdditionalCosts
      employees={employees}
      label={<h2>Additional Costs</h2>}
      // label={React.createElement('h2', {}, 'Additional Costs')}
    />
    {employees &&
      <ol>
      {employees.map(e =>
        <li key={e.id}><EmployeeRow employee={e}
          onBenefitClick={onEmployeeBenefitClicked}
          onDeleteClick={onEmployeeDeleted}
          onMoneyClick={onEmployeeMoneyBumped}  
        /></li>)}
      </ol>
    }
  </>)
  console.log(node)
  return node
}
