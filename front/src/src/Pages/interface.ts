import WSPLogo from '../assets/whatsapp-logo.png';
import TLGLogo from '../assets/telegram-logo.png';
import TEALogo from '../assets/teams-logo.png';

export const MESSENGER_TO_ICON_MAP = {
    "Telegram": TLGLogo,
    "WhatsApp": WSPLogo,
    "Teams": TEALogo,
  } as { [key: string]: string };

export interface EmployeeGET {
    id: number;
    first_name: string;
    last_name: string;
    surname: string;
    role: string;
    rating: number;
    month_efficiency: number;
    experience: number;
    age: number;
    city: string;
    job_format: string;
    email: string;
    phone: string;
    messengers: string[];
    month_plans: string[];
}
  
  export interface EmployeesLIST {
    id: number;
    first_name: string;
    last_name: string;
    surname: string;
    role: string;
    rating: number;
  }

  export interface monthPlan {
    id: number;
    date: string;
    plans: [{id: number; task: string; goal: number; result: number}]
    rating: number;
  }