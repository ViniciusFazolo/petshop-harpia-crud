import { Injectable } from '@angular/core';
import { CrudService } from '../classes/CrudService';
import { Client } from '../interfaces/client/client';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends CrudService<Client>{

  constructor(httpClient: HttpClient) { 
    super(httpClient, `${environment.apiUrl}/client`)
  }
}
