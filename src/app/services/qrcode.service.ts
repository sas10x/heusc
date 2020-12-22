import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {
  
  private messageSource = new BehaviorSubject(null);
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) { }
  
  customerUrl: string = "https://heusc.com/api/customer/";
  // customerUrl: string = "http://api.cebusteel.ph/api/customer/";

  
  changeMessage(message: string) {
    this.messageSource.next(message)
  }
  register(body) {
    return this.http.post(this.customerUrl+'signup', body)
  }
}
