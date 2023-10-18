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
import { useEmployeesCollectionData } from './employeeCollectionData';

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

// we want to make it more HIGH-lEVEL
// responsibilities:
// - provide the collection data (and load it)
// - filtering the collection whenever the filter changes (and refreshing)
function useEmployeesState() {
  const { collectionState, reload } = useEmployeesCollectionData()
  const [allFilters, applyFilter] = useEmployeeFilters()

  useEffect(() => {
    return reload(allFilters)
  }, [allFilters, reload])

  // there's no reason to make this reference stable (with useMemo)
  return { collectionState, reload, applyFilter, allFilters }
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

  const { collectionState, reload, applyFilter, allFilters } = useEmployeesState()
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

    {collectionState.state === 'LOADING' && <Loader />}
    {collectionState.state === 'ERROR' && <span>Something went completely wrong: {collectionState.error.message}...</span>}
    <input
      type='text'
      placeholder='employee e-mail'
      value={allFilters.email}
      onChange={e => applyFilter({ type: "SET_EMAIL", value: e.target.value })}
    />

    {collectionState.state === 'RESULT' &&
    <>
      Bertrams: {collectionState.filter(e => e.firstName.includes('Bertram')).length}
      count: {collectionState.result.length}
      <AdditionalCosts
        employees={collectionState.result}
        label={<h2>Additional Costs</h2>}
        // label={React.createElement('h2', {}, 'Additional Costs')}
      />
      <ol>
      {collectionState.result.map(e =>
        <li key={e.id}><EmployeeRow employee={e}
          onBenefitClick={onEmployeeBenefitClicked}
          onDeleteClick={onEmployeeDeleted}
          onMoneyClick={onEmployeeMoneyBumped}  
        /></li>)}
      </ol>
    </>
    }
  </>)
  console.log(node)
  return node
}
