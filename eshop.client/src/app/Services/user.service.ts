import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getCurrentUserId(): string | null {
    return localStorage.getItem('eshop_user');
  }
}
