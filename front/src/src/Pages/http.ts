import { API_ENDPOINTS } from "../constants/endpoints";
import { get } from "../http";

const { ALL, MONTHPLAN } = API_ENDPOINTS;

export const getAllEmployees = () => get(ALL).then((response) => response.data);

export const getEmployeeById = (id: number) =>
  get(`${ALL}${id}`).then((response) => response.data);

export const getStatsByMonth = (id: number, dateString: string) =>
  get(`${MONTHPLAN}`, {"employee_id": id, "date": dateString}).then(
    (response) => response.data
  );
