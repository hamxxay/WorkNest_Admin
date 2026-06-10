import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse, User, Location, SpaceType, Space, Booking, PricingPlan, Membership, Payment, Contact, GalleryImage } from '../models/admin.model';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private api = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getUsers(page?: number, limit?: number, search?: string): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(`${this.api}/user${this.qs({ page, limit, search })}`);
  }
  getUserById(id: string): Observable<ApiResponse<User>> { return this.http.get<ApiResponse<User>>(`${this.api}/user/${id}`); }
  getUserHistory(id: string): Observable<ApiResponse<any>> { return this.http.get<ApiResponse<any>>(`${this.api}/user/${id}/history`); }
  createUser(data: Partial<User>): Observable<ApiResponse<User>> { return this.http.post<ApiResponse<User>>(`${this.api}/user`, data); }
  updateUser(id: string, data: Partial<User>): Observable<ApiResponse<User>> { return this.http.put<ApiResponse<User>>(`${this.api}/user/${id}`, data); }
  deleteUser(id: string): Observable<ApiResponse<any>> { return this.http.delete<ApiResponse<any>>(`${this.api}/user/${id}`); }
  activateUser(id: string): Observable<ApiResponse<any>> { return this.http.patch<ApiResponse<any>>(`${this.api}/user/${id}/activate`, {}); }
  deactivateUser(id: string): Observable<ApiResponse<any>> { return this.http.patch<ApiResponse<any>>(`${this.api}/user/${id}/deactivate`, {}); }
  updateUserRole(id: string, role: string): Observable<ApiResponse<any>> { return this.http.patch<ApiResponse<any>>(`${this.api}/user/${id}/role`, { role }); }

  getLocations(page?: number, limit?: number, search?: string): Observable<ApiResponse<Location[]>> {
    return this.http.get<ApiResponse<Location[]>>(`${this.api}/location${this.qs({ page, limit, search })}`);
  }
  createLocation(data: Partial<Location>): Observable<ApiResponse<Location>> { return this.http.post<ApiResponse<Location>>(`${this.api}/location`, data); }
  updateLocation(id: number, data: Partial<Location>): Observable<ApiResponse<Location>> { return this.http.put<ApiResponse<Location>>(`${this.api}/location/${id}`, data); }
  deleteLocation(id: number): Observable<ApiResponse<any>> { return this.http.delete<ApiResponse<any>>(`${this.api}/location/${id}`); }

  getSpaceTypes(page?: number, limit?: number, search?: string): Observable<ApiResponse<SpaceType[]>> {
    return this.http.get<ApiResponse<SpaceType[]>>(`${this.api}/spacetype${this.qs({ page, limit, search })}`);
  }
  createSpaceType(data: Partial<SpaceType>): Observable<ApiResponse<SpaceType>> { return this.http.post<ApiResponse<SpaceType>>(`${this.api}/spacetype`, data); }
  updateSpaceType(id: number, data: Partial<SpaceType>): Observable<ApiResponse<SpaceType>> { return this.http.put<ApiResponse<SpaceType>>(`${this.api}/spacetype/${id}`, data); }
  deleteSpaceType(id: number): Observable<ApiResponse<any>> { return this.http.delete<ApiResponse<any>>(`${this.api}/spacetype/${id}`); }

  getSpaces(page?: number, limit?: number, search?: string): Observable<ApiResponse<Space[]>> {
    return this.http.get<ApiResponse<Space[]>>(`${this.api}/space${this.qs({ page, limit, search })}`);
  }
  getSpaceById(id: number): Observable<ApiResponse<any>> { return this.http.get<ApiResponse<any>>(`${this.api}/space/${id}`); }
  createSpace(data: Partial<Space>): Observable<ApiResponse<Space>> { return this.http.post<ApiResponse<Space>>(`${this.api}/space`, data); }
  updateSpace(id: number, data: Partial<Space>): Observable<ApiResponse<Space>> { return this.http.put<ApiResponse<Space>>(`${this.api}/space/${id}`, data); }
  deleteSpace(id: number): Observable<ApiResponse<any>> { return this.http.delete<ApiResponse<any>>(`${this.api}/space/${id}`); }
  getSpaceSummary(id: number): Observable<ApiResponse<any>> { return this.http.get<ApiResponse<any>>(`${this.api}/space/${id}/summary`); }

  getBookings(page?: number, limit?: number, search?: string): Observable<ApiResponse<Booking[]>> {
    return this.http.get<ApiResponse<Booking[]>>(`${this.api}/booking${this.qs({ page, limit, search })}`);
  }
  updateBookingStatus(id: number, status: string): Observable<ApiResponse<any>> { return this.http.patch<ApiResponse<any>>(`${this.api}/booking/${id}/status?status=${encodeURIComponent(status)}`, {}); }
  updateBooking(id: number, data: Partial<Booking>): Observable<ApiResponse<any>> { return this.http.put<ApiResponse<any>>(`${this.api}/booking/${id}`, data); }
  getBookingCalendar(spaceId: number, year: number, month: number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.api}/booking/calendar?spaceId=${spaceId}&year=${year}&month=${month}`);
  }

  getPricingPlans(page?: number, limit?: number, search?: string): Observable<ApiResponse<PricingPlan[]>> {
    return this.http.get<ApiResponse<PricingPlan[]>>(`${this.api}/pricingplan${this.qs({ page, limit, search })}`);
  }
  createPricingPlan(data: Partial<PricingPlan>): Observable<ApiResponse<PricingPlan>> { return this.http.post<ApiResponse<PricingPlan>>(`${this.api}/pricingplan`, data); }
  updatePricingPlan(id: number, data: Partial<PricingPlan>): Observable<ApiResponse<PricingPlan>> { return this.http.put<ApiResponse<PricingPlan>>(`${this.api}/pricingplan/${id}`, data); }
  deletePricingPlan(id: number): Observable<ApiResponse<any>> { return this.http.delete<ApiResponse<any>>(`${this.api}/pricingplan/${id}`); }
  getPricingPlanSummary(id: number): Observable<ApiResponse<any>> { return this.http.get<ApiResponse<any>>(`${this.api}/pricingplan/${id}/summary`); }
  getPlanFeatures(planId: number): Observable<ApiResponse<any>> { return this.http.get<ApiResponse<any>>(`${this.api}/planfeature/by-plan/${planId}`); }
  createPlanFeature(data: any): Observable<ApiResponse<any>> { return this.http.post<ApiResponse<any>>(`${this.api}/planfeature`, data); }
  updatePlanFeature(id: number, data: any): Observable<ApiResponse<any>> { return this.http.put<ApiResponse<any>>(`${this.api}/planfeature/${id}`, data); }
  deletePlanFeature(id: number): Observable<ApiResponse<any>> { return this.http.delete<ApiResponse<any>>(`${this.api}/planfeature/${id}`); }

  getMemberships(page?: number, limit?: number, search?: string): Observable<ApiResponse<Membership[]>> {
    return this.http.get<ApiResponse<Membership[]>>(`${this.api}/membership${this.qs({ page, limit, search })}`);
  }
  createMembership(data: Partial<Membership>): Observable<ApiResponse<Membership>> { return this.http.post<ApiResponse<Membership>>(`${this.api}/membership`, data); }
  updateMembershipStatus(id: number, status: string): Observable<ApiResponse<any>> { return this.http.patch<ApiResponse<any>>(`${this.api}/membership/${id}/status?status=${encodeURIComponent(status)}`, {}); }
  deleteMembership(id: number): Observable<ApiResponse<any>> { return this.http.delete<ApiResponse<any>>(`${this.api}/membership/${id}`); }
  getMembershipSummary(id: number): Observable<ApiResponse<any>> { return this.http.get<ApiResponse<any>>(`${this.api}/membership/${id}/summary`); }

  getPayments(page?: number, limit?: number, search?: string): Observable<ApiResponse<Payment[]>> {
    return this.http.get<ApiResponse<Payment[]>>(`${this.api}/payment${this.qs({ page, limit, search })}`);
  }
  createPayment(data: Partial<Payment>): Observable<ApiResponse<Payment>> { return this.http.post<ApiResponse<Payment>>(`${this.api}/payment`, data); }
  updatePaymentStatus(id: number, status: string, transactionRef?: string): Observable<ApiResponse<any>> {
    let url = `${this.api}/payment/${id}/status?status=${encodeURIComponent(status)}`;
    if (transactionRef) url += `&transactionRef=${encodeURIComponent(transactionRef)}`;
    return this.http.patch<any>(url, {});
  }
  deletePayment(id: number): Observable<any> { return this.http.delete<any>(`${this.api}/payment/${id}`); }
  getPaymentSummary(id: number): Observable<ApiResponse<any>> { return this.http.get<ApiResponse<any>>(`${this.api}/payment/${id}/summary`); }

  getContacts(page?: number, limit?: number, search?: string): Observable<ApiResponse<Contact[]>> {
    return this.http.get<ApiResponse<Contact[]>>(`${this.api}/contact`);
  }
  updateContactStatus(id: number, status: string): Observable<ApiResponse<any>> { return this.http.patch<ApiResponse<any>>(`${this.api}/contact/${id}/status?status=${encodeURIComponent(status)}`, {}); }
  deleteContact(id: number): Observable<ApiResponse<any>> { return this.http.delete<ApiResponse<any>>(`${this.api}/contact/${id}`); }

  getGalleryAll(page?: number, limit?: number, search?: string): Observable<ApiResponse<GalleryImage[]>> {
    return this.http.get<ApiResponse<GalleryImage[]>>(`${this.api}/gallery${this.qs({ page, limit, search })}`);
  }
  createGalleryImage(data: Partial<GalleryImage>): Observable<ApiResponse<GalleryImage>> { return this.http.post<ApiResponse<GalleryImage>>(`${this.api}/gallery`, data); }
  updateGalleryImage(id: number, data: Partial<GalleryImage>): Observable<ApiResponse<GalleryImage>> { return this.http.put<ApiResponse<GalleryImage>>(`${this.api}/gallery/${id}`, data); }
  deleteGalleryImage(id: number): Observable<ApiResponse<any>> { return this.http.delete<ApiResponse<any>>(`${this.api}/gallery/${id}`); }

  private qs(params: Record<string, any>): string {
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
      if (v != null) p.set(k, String(v));
    }
    const s = p.toString();
    return s ? `?${s}` : '';
  }
}
