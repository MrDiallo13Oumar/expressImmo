import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BASE_URL } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  // constructor (private http: HttpClient) {}

     // CREATE
     create (api: string, suffixURL: string, data: any): Observable<any> {
       // console.log(data);
       return this.httpClient.post(`${BASE_URL}${api}/${suffixURL}`, data)
     }



  //    update(api: string, suffixUrl: string, data: any): Observable<any> {
  //      const url = `${BASE_URL}${api}/${suffixUrl}`;
  //      return this.http.post(url, data);
  //    }


  //    // READ GLOBAL
      getall (api: string, suffixUrl: string) {
       return this.httpClient.get<any[]>(`${BASE_URL}${api}/${suffixUrl}`)
     }

  //    // GET

  //    getallParams(api: string, suffixUrl: string, id_: any,idFacture :any) {
  //      const url = `${BASE_URL}${api}/${suffixUrl}/${id_}/`;
  //      let params = {
  //        params: {
  //          id: id_,
  //          idFacture :idFacture
  //        },
  //      }
  //      return this.http.get<any[]>(url, params)
  //    }

  //    // GET Unique
  //    getOne (api: string, suffixUrl: string, id_: any) {
  //      return this.http.get<any[]>(`${BASE_URL}${api}/${suffixUrl}?id=${id_}`)
  //    }

  //    // GET Unique
  //    getOneByID (api: string, suffixUrl: string, id_: any) {
  //      const url = `${BASE_URL}${api}/${suffixUrl}/`+id_
  //      return this.http.get<any[]>(url)
  //    }

  //    // GET Unique


  //    delete(
  //      api: string,
  //      suffixUrl: any,
  //      table: string,
  //      id: any
  //    ): Observable<boolean> {
  //      const url = `${BASE_URL}${api}/${suffixUrl}/${id}/`;
  //      let params = {
  //        params: {
  //          table: table,
  //          id: id,
  //        },
  //      };
  //      return this.http.delete<boolean>(url, params);
  //    }

     redirectUrl !: string;
     baseUrl: string = "http://localhost/expressimmo/api/authentification";
     @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
     constructor(private httpClient: HttpClient) { }
     public userlogin(username: any, password: any) {
       alert(username)
       return this.httpClient.post<any>(this.baseUrl + '/login.php', { username, password })
         .pipe(map(Users => {
           this.setToken(Users[0].name);
           this.getLoggedInName.emit(true);
           return Users;
         }));
     }
   
     public userregistration(name: any, email: any, pwd: any, prenom: any) {
       return this.httpClient.post<any>(this.baseUrl + '/register.php', { name, email, pwd })
         .pipe(map(Users => {
           return Users;
         }));
     }
   
     //token
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

}
