import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { BASE_URL } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrlRegister = `${BASE_URL}/authentification/register.php`;
  private apiUrlLogin = `${BASE_URL}authentification/login.php`;
  // private apiUrlLogout = `${BASE_URL}/logout.php`;
  

  constructor(private http: HttpClient) {}

  // Inscription
  register(nom: string, prenom: string, email: string, mot_de_passe: string, role: string): Observable<any> {
    return this.http.post<any>(this.apiUrlRegister, { nom, prenom, email, mot_de_passe, role });
  }

  // Connexion
  login(email: string, mot_de_passe: string): Observable<any> {
    return this.http.post<any>(this.apiUrlLogin, { email, mot_de_passe });
  }
redirectUrl !: string;
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  public userlogin(username: any, password: any) {
    alert(username)
    return this.http.post<any>(this.apiUrlLogin + '/login.php', { username, password })
      .pipe(map(Users => {
        this.setToken(Users[0].name);
        this.getLoggedInName.emit(true);
        return Users;
      }));
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  deleteToken() {
    localStorage.removeItem('token');
  }
  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
      return true
    }
    return false;
  }
  // Déconnexion
  // logout(): Observable<any> {
  //   return this.http.get<any>(this.apiUrlLogout);
  // }

  // Vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('user_id');
  }

  // Récupérer les informations de l'utilisateur
  getUser(): any {
    return JSON.parse(sessionStorage.getItem('user') || '{}');
  }
}
