import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}
  private STORAGE_KEY = 'storageTimestamp';
  private CLEAR_TIMEOUT = 3600000; // 1 heure en millisecondes

  

  // Ajouter un timestamp lors de l'écriture dans le localStorage
  initializeStorageTimestamp(): void {
    const timestamp = localStorage.getItem(this.STORAGE_KEY);

    if (!timestamp) {
      const now = new Date().getTime();
      localStorage.setItem(this.STORAGE_KEY, now.toString());
    }
  }

  // Vérifier si une heure est écoulée et vider le localStorage
  clearLocalStorageIfExpired(): void {
    const timestamp = localStorage.getItem(this.STORAGE_KEY);

    if (timestamp) {
      const now = new Date().getTime();
      const elapsed = now - parseInt(timestamp, 10);

      if (elapsed > this.CLEAR_TIMEOUT) {
        localStorage.clear();
      }
    }
  }

  delete(
    api: string,
    suffixUrl: any,
    table: string,
    id: any
  ): Observable<boolean> {
    const url = `${BASE_URL}${api}/${suffixUrl}/${id}/`;
    let params = {
      params: {
        table: table,
        id: id,
      },
    };
    return this.http.delete<boolean>(url, params);
  }

  // login
  login(api: string, suffixURL: string, data: any): Observable<any> {
    // console.log(data);
    return this.http.post(`${BASE_URL}${api}/${suffixURL}`, data);
  }

  // CREATE
  create(api: string, suffixURL: string, data: any): Observable<any> {
    // console.log(data);
    return this.http.post(`${BASE_URL}${api}/${suffixURL}`, data);
  }

  // READ GLOBAL
  getList(api: string, suffixUrl: string) {
    return this.http.get<any[]>(`${BASE_URL}${api}/${suffixUrl}`);
  }

  getClauseID(api: string, suffixUrl: string, value: any) {
    let params = {
      params: {
        id: value,
      },
    };
    return this.http.get<any[]>(`${BASE_URL}${api}/${suffixUrl}/`, params);
  }

  saveToken(token: string, idUser: string) {
    if (token !== undefined) {
      localStorage.setItem('id_user', idUser);
      localStorage.setItem('token', token);
      this.toastr.success('Vous êtes bien authentifier', 'Success!', {
        progressBar: true,
      });
      this.router.navigate(['/hoomeAdmin/dashboard']);
    } else {
      this.toastr.error('Informations incorrect !', 'Incorrect!', {
        progressBar: true,
      });
      this.router.navigate(['/hoomeAdmin/login']);
    }
  }

  isLogged(): boolean {
    const token = localStorage.getItem('token');
    // console.log(token);
    return !!token;
  }

  clearToken(): void {
    localStorage.removeItem('id_user');
    localStorage.removeItem('token');
    this.toastr.info('Session Femer avec success', 'Fermeture !', {
      progressBar: true,
    });
    this.router.navigate(['/hoomeAdmin/login']);
  }

  clearTokenExpired(): void {
    localStorage.removeItem('id_user');
    localStorage.removeItem('token');
    this.router.navigate(['/hoomeAdmin/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getIdUser(): string | null {
    return localStorage.getItem('id_user');
  }
}
