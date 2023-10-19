import { Reducer, useDebugValue, useReducer } from "react"

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

// private API
type EmployeeFilters = { email: string }
type EmployeeFilterActions = { type: "SET_EMAIL", value: string }
const employeeFilterReducer: Reducer<EmployeeFilters, EmployeeFilterActions> = 
  (state, action): EmployeeFilters => { 
    switch (action.type){
      case 'SET_EMAIL': return {...state, email: action.value}
      default: return state
    }
  }
// public API:
export function useEmployeeFilters(){
  useDebugValue('filters')
  return useReducer(employeeFilterReducer, { email: '' })
}
