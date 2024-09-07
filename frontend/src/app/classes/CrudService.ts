import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class CrudService<T extends {id?: string}> {
  constructor(private httpClient: HttpClient, private url: string) {}

  listAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.url}/listAll`);
  }

  listById(id: string): Observable<T> {
    return this.httpClient.get<T>(`${this.url}/${id}`);
  }

  create(obj: T): Observable<T> {
    return this.httpClient.post<T>(`${this.url}/new`, obj);
  }

  update(obj: T): Observable<T> {
    return this.httpClient.put<T>(`${this.url}/${obj.id}`, obj);
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }
}
