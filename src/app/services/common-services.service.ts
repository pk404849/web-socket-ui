import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../model/login-model';
import { MessageModel } from '../model/message.model';
import { UserModel } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class CommonServicesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  registerUser(userModel: UserModel): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    }
    return this.httpClient.post(`${environment.baseUrl}/${'user/save-user'}`, JSON.stringify(userModel), httpOptions);
  }

  getAllUsers() {
    return this.httpClient.get(`${environment.baseUrl}/${'user/get-all-users'}`);
  }
  getUserByUniqueId(userUniqueId:string){
    return this.httpClient.get(`${environment.baseUrl}/${'user/get-user-by-user-unique-id/'+userUniqueId}`);
  }

  login(loginModel:LoginModel): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    }
    return this.httpClient.post(`${environment.baseUrl}/${'user/login'}`, JSON.stringify(loginModel), httpOptions);
  }

  sendMessage(messageModel: MessageModel){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    }
    return this.httpClient.post(`${environment.baseUrl}/${'message/save-message'}`, JSON.stringify(messageModel), httpOptions);
  }

  getMessageByUserUniqueId(loginUserId:string, userUniqueId:string){
    return this.httpClient.get(`${environment.baseUrl}/${'message/get-message-by-user-unique-id?'+'messageSenderId='+loginUserId+'&messageReceiverId='+userUniqueId}`);
  }
}
