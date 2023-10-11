import React, { ReactNode, useDebugValue, useEffect, useState } from 'react'

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

const useEmployeeState = () => {
  useDebugValue(`the weather is ${Math.random() > 0.5 ? 'fine' : 'awful'} today`)
  return useState<Employee[]>([])
}


export const EmployeesPage: React.FC<EmployeesPageProps> = (props) => {
  // memory cell: READ, WRITE
  // const [employees, setEmployees] = useState<Employee[]>([])
  const [employees, setEmployees] = useEmployeeState()
  const [isLoading, setLoading] = useState(true)
  const [completedRate, setCompletedRate] = useState(0)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)

  // implement "reload" button

  useEffect(() => {
    // ngOnInit
    getEmployees() // HTTP GET
      .then((employees) => {
        setEmployees(employees)
        setLoading(false)
        setCompletedRate(1)
      })
    return () => {} // a cleanup function // ngOnDestroy
  }, []) // ngOnChanges

  const onEmployeeBenefitClicked = (e: Employee) => {
    // there is some logic
    console.log('🍕', e)
  }

  const onEmployeeDeleted = (e: Employee) => {
    console.log('☠️️️', e)
  }

  const onEmployeeMoneyBumped = (e: Employee) => {
    console.log('💰', e)
  }

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

    {isLoading && <Loader />}
    count: {employees.length}
    {` `}
    ({to2(completedRate * 100)} %)
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
