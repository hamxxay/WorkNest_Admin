import { Component, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  loading = signal(true);
  stats = signal({ users: 0, spacesAvailable: 0, revenue: 0, bookings: 0, contacts: 0, locations: 0, plans: 0, gallery: 0 });
  recentBookings = signal<any[]>([]);
  recentContacts = signal<any[]>([]);

  constructor(private admin: AdminService) {}

  ngOnInit() {
    Promise.all([
      this.admin.getUsers(1, 1).toPromise(),
      this.admin.getSpaces(1, 1).toPromise(),
      this.admin.getPayments(1, 100).toPromise(),
      this.admin.getBookings(1, 5).toPromise(),
      this.admin.getContacts(1, 5).toPromise(),
      this.admin.getLocations(1, 1).toPromise(),
      this.admin.getPricingPlans(1, 1).toPromise(),
      this.admin.getGalleryAll(1, 1).toPromise(),
    ]).then(([users, spaces, payments, bookings, contacts, locations, plans, gallery]) => {
      const revenue = ((payments as any)?.data ?? []).reduce((s: number, p: any) => p.paymentStatus === 'Paid' ? s + (p.amount ?? 0) : s, 0);
      this.stats.set({
        users: (users as any)?.total ?? 0,
        spacesAvailable: (spaces as any)?.total ?? 0,
        revenue,
        bookings: (bookings as any)?.total ?? 0,
        contacts: (contacts as any)?.total ?? 0,
        locations: (locations as any)?.total ?? 0,
        plans: (plans as any)?.total ?? 0,
        gallery: (gallery as any)?.total ?? 0,
      });
      this.recentBookings.set((bookings as any)?.data ?? []);
      this.recentContacts.set((contacts as any)?.data ?? []);
      this.loading.set(false);
    }).catch(() => this.loading.set(false));
  }
}
