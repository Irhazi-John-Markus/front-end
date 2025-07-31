import { Routes } from '@angular/router';
import { Dashboard } from './shared/dashboard/dashboard';
import { LeaveTickets } from './shared/leave-tickets/leave-tickets';
import { VacationSummary} from './shared/vacation-summary/vacation-summary';
import { Summary} from './shared/summary/summary';
import { InteractiveGrid} from './shared/interactive-grid/interactive-grid';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: Dashboard },
    { path: 'leave-tickets', component: LeaveTickets },
    { path: 'vacation', component: VacationSummary },
    { path: 'summary', component: Summary },
    { path: 'search-filter', component: InteractiveGrid },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
];
