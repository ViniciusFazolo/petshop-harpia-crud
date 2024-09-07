import { Injectable } from '@angular/core';
import { CrudService } from '../classes/CrudService';
import { Order } from '../interfaces/order/order';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends CrudService<Order>{

  constructor(httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrl}/order`)
  }
}
