import axios from 'axios';
import { API_URL } from './config';
import { Employee } from './dto';
// import { URLSearchParams } from 'url';

// Data Transfer Object (DTO)
// DTO - leave as they are
// your local model

type FilterCriteria = {
  email: string
}

export const getEmployees = (criteria: Partial<FilterCriteria> = {}) => {
  const controller = new AbortController();
  const signal = controller.signal;
  const url = `${API_URL}/employees?` + new URLSearchParams(criteria.email && { email_like: criteria.email })
  return {
    controller,
    promise: fetch(url, { signal }).then(res => res.json()) as Promise<Employee[]>
  }
  }
  // const queryString = criteria.email ? `?email_like=${criteria.email}` : ''
  // return fetch(`${API_URL}/employees${queryString}`)
  //   .then(res => res.json())
  // }

// export const getEmployees = () => {
//   return getEmployeesDTO()
//     .then(results => results.map(e => ({ ...e, emailLowerCased: e.email.toLowerCase() })))
// }

export const getEmployees__ = () => {
  return axios.get<Employee[]>(`${API_URL}/employees`)
    .then(res => res.data)
}
