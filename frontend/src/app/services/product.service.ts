import { Injectable } from '@angular/core';
import { CrudService } from '../classes/CrudService';
import { Product } from '../interfaces/product/product';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends CrudService<Product>{

  constructor(httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrl}/product`)
   }
}
