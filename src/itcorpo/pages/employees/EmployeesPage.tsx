import React, { ReactNode, useCallback, useDebugValue, useEffect, useMemo, useReducer, useState, Reducer } from 'react'
import { debounce } from 'lodash'

import { to2 } from '../../utils/math';

import { EmployeeRow } from './EmployeeRow';
import { Employee } from '../../api/dto';
import { getEmployees } from '../../api/EmployeeApi';

import { Loader } from '../../shared/Loader';
import { Sidebar } from '../../shared/sidebar/Sidebar';
import { AdditionalCosts } from './AdditionalCosts';
import { useEmployeeFilters } from './employeeFilters';

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

  const reload = (filters: { email: string }) => {
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
  }

  // 1. separate useStates - the worst - passing lots of values and callbacks
  // const [emailFilter, setEmailFilter] = useState('')
  // const [ageFilter, setAgeFilter] = useState('')
  // const [skillsFilter, setSkillsFilter] = useState('')
  
  // 2. 1 useState with an object - okayish
  // const [allFilters, setAllFilter] = useState({ email: '', age: '', skills: '' })
  // DIRECT UPDATES - I need to know the HOW
  // component level: setAllFilters(previous => ({ ...previous, skills }))
  

  // 3. 1 useReducer
  // { type: "SET_EMAIL", value: string }

  // INDIRECT UPDATES -> the reducers needs to know the HOW
  // component level: updateFilters({ type: 'SKILLS', value: skills })

  // useState -> specialized useReducer
  const [allFilters, applyFilter] = useEmployeeFilters()

  // SERVER SIDE FILTERING
  useEffect(() => {
    // ngOnInit
    return reload(allFilters)
  }, [allFilters]) // ngOnChanges

  // there's no reason to make this reference stable (with useMemo)
  return { employees, isLoading, completedRate, reload, applyFilter, allFilters }
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

  const { employees, isLoading, completedRate, reload, applyFilter, allFilters } = useEmployeesState()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)

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
    <button onClick={() => reload(allFilters)}>reload</button>

    {isLoading && <Loader />}
    count: {employees.length}
    {` `}
    ({to2(completedRate * 100)} %)
    <input
      type='text'
      placeholder='employee e-mail'
      value={allFilters.email}
      onChange={e => applyFilter({ type: "SET_EMAIL", value: e.target.value })}
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
