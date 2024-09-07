import { Injectable } from '@angular/core';
import { CrudService } from '../classes/CrudService';
import { Animal } from '../interfaces/animal/animal';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnimalService extends CrudService<Animal>{

  constructor(httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrl}/animal`)
  }
}
