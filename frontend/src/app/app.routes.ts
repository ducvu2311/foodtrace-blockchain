import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardContentComponent } from './pages/dashboard/dashboard-content.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { VerifyComponent } from './pages/verify/verify.component'; // <--- Import này
import { FarmsListComponent } from './pages/farms/farms-list.component';
import { BatchesListComponent } from './pages/batches/batches-list.component';
import { BatchDetailComponent } from './pages/batches/batch-detail.component';
import { TraceComponent } from './pages/trace/trace.component';
import { ActivitiesComponent } from './pages/activities/activities.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  
  // Route Verify
  { path: 'verify', component: VerifyComponent }, 

  {
    path: '',
    component: DashboardComponent, 
    children: [
      { path: 'dashboard', component: DashboardContentComponent },
      { path: 'farms', component: FarmsListComponent },
      { path: 'batches', component: BatchesListComponent },
      { path: 'batches/:id', component: BatchDetailComponent },
      { path: 'trace', component: TraceComponent },
      { path: 'activities', component: ActivitiesComponent },
    ],
  },
  { path: '**', redirectTo: 'login' }, 
];