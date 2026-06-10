import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login) },
  {
    path: '',
    loadComponent: () => import('./admin/layout/admin-layout').then(m => m.AdminLayout),
    canActivate: [authGuard],
    children: [
      { path: 'admin', loadComponent: () => import('./admin/dashboard/dashboard').then(m => m.Dashboard) },
      { path: 'admin/users',       loadComponent: () => import('./admin/manage/manage').then(m => m.Manage), data: { entity: 'users' } },
      { path: 'admin/locations',   loadComponent: () => import('./admin/manage/manage').then(m => m.Manage), data: { entity: 'locations' } },
      { path: 'admin/spacetypes',  loadComponent: () => import('./admin/manage/manage').then(m => m.Manage), data: { entity: 'spacetypes' } },
      { path: 'admin/spaces',      loadComponent: () => import('./admin/manage/manage').then(m => m.Manage), data: { entity: 'spaces' } },
      { path: 'admin/bookings',    loadComponent: () => import('./admin/manage/manage').then(m => m.Manage), data: { entity: 'bookings' } },
      { path: 'admin/pricing',     loadComponent: () => import('./admin/manage/manage').then(m => m.Manage), data: { entity: 'pricing' } },
      { path: 'admin/payments',    loadComponent: () => import('./admin/manage/manage').then(m => m.Manage), data: { entity: 'payments' } },
      { path: 'admin/contacts',    loadComponent: () => import('./admin/manage/manage').then(m => m.Manage), data: { entity: 'contacts' } },
      { path: 'admin/gallery',     loadComponent: () => import('./admin/manage/manage').then(m => m.Manage), data: { entity: 'gallery' } },
      { path: '', redirectTo: 'admin', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: 'admin' }
];
