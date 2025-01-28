import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BASE_URL } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any = localStorage.getItem('access_token') || undefined
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    })
  }

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false)

  constructor (private http: HttpClient, private router: Router) {}

  login (api: string, suffixURL: string, data: any): Observable<any> {
    return this.http.post<any>(`${BASE_URL}${api}/${suffixURL}`, data).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.token)
        this.isAuthenticatedSubject.next(true)
      })
    )
  }
  //  login(api: string, suffixURL: string, data: any): Observable<any> {
  //   return this.http.post<any>(`${BASE_URL}${api}/${suffixURL}`, data, {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'  // Spécifier que les données sont en JSON
  //     })
  //   }).pipe(
  //     tap(response => {
  //       if (response.token) {
  //         // Sauvegarder le token dans localStorage
  //         localStorage.setItem('access_token', response.token);
  //         this.isAuthenticatedSubject.next(true);  // Met à jour l'état de l'authentification
  //       } else {
  //         console.error('Token non trouvé');
  //       }
  //     })
  //   );
  // }



  logout (): void {
    localStorage.removeItem('access_token')
    this.isAuthenticatedSubject.next(false)
    this.router.navigate(['/home/login'])
  }

  isLoggedIn (): boolean {
    return !!localStorage.getItem('access_token')
  }

  getToken (): string | null {
    return localStorage.getItem('access_token')
  }
}
