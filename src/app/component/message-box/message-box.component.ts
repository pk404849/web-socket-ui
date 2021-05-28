import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MessageModel } from 'src/app/model/message.model';
import { UserModel } from 'src/app/model/user.model';
import { WebSocketApiModel } from 'src/app/model/websocket-model/web.socket.api.model';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { WebSocketAPI } from 'src/app/services/websocket/web-socket-api';
import { DataSharedService } from '../../services/websocket/data-shared.service';
import { getSubscription } from '../../services/websocket/test';
@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {

  constructor(
    private commonServices: CommonServicesService,
    private router: Router,
    private dataSharedSvc: DataSharedService,
  ) { }

  webSocketAPI: any;
  ngOnInit(): void {
    this.webSocketAPI = new WebSocketAPI();
    this.webSocketAPI._connect();
    this.getAllUsers();

    getSubscription().subscribe(res => {
     // console.log(res);
      if(res.length) {
        this.handleMessage(res);
      
      }
     });
  }

  getLoginUserFromLocalStorage(){
    var loginUser = localStorage.getItem('loginUser');
    if(loginUser != null){
      var loginUserObject = JSON.parse(loginUser);
      this.loginUserName = loginUserObject.name;
      return loginUserObject;
    }
    return null;
  }
 loginUserName = '';
  isMessageBox: Boolean = false;
  responseUserList: any = [];
  getAllUsers() {
   var loginUser = this.getLoginUserFromLocalStorage();
    if (loginUser != null) {
      this.commonServices.getAllUsers().subscribe((res: any) => {
        if (res.status) {
          this.responseUserList = res.data;
          console.log('getAllUsers : ', this.responseUserList);
        }
      });
    } else {
      this.router.navigate(['login']);
    }
  }

  responseUserData = new UserModel();
  getUserByUniqueId(userUniqueId: string) {
    this.commonServices.getUserByUniqueId(userUniqueId).subscribe((res: any) => {
      if (res.status) {
        this.responseUserData = res.data;
        this.isMessageBox = true;
         this.myHtml='';
         var loginUser = this.getLoginUserFromLocalStorage();
         if (loginUser != null) {
          this.getMessageByUserUniqueId(loginUser.userUniqueId, userUniqueId);
        }
      }
    });
  }

  messageModel = new MessageModel();
  myHtml: string = '';
  webSocketApiModel = new WebSocketApiModel();
  sendMessage() {
    var loginUser = this.getLoginUserFromLocalStorage();
    if (loginUser != null) {
      
      //web scoket send message
      this.webSocketApiModel.messageSender = loginUser.userUniqueId;
      this.webSocketApiModel.messageReceiver = this.responseUserData.userUniqueId;
      this.webSocketApiModel.message = this.messageModel.message;
      this.webSocketApiModel.messageSenderName = loginUser.name;
      this.webSocketApiModel.messageReceiverName = this.responseUserData.name;
      this.webSocketAPI._send(this.webSocketApiModel);
    // prepare message model
    this.messageModel.messageSender = loginUser.userUniqueId;
    this.messageModel.messageReceiver = this.responseUserData.userUniqueId;
    this.messageModel.messageSenderName = loginUser.name;
    this.messageModel.messageReceiverName = this.responseUserData.name;

    this.commonServices.sendMessage(this.messageModel).subscribe((res: any) => {
      if (res.status && res.message != null) {
        if (loginUser != null) {
          this.getMessageByUserUniqueId(loginUser.userUniqueId, this.responseUserData.userUniqueId);
        }
      }
    });
    console.log(this.messageModel.message);
    this.messageModel = new MessageModel();
  }
  }

  messageList: any = [];
  getMessageByUserUniqueId(loginUserUniqueId: string, userUniqueId: string) {
    this.commonServices.getMessageByUserUniqueId(loginUserUniqueId, userUniqueId).subscribe((res: any) => {
      if (res.status) {
        this.messageList = res.data;
        console.log('getMessageByUserUniqueId==>  ', this.messageList);
      }
    });
  }
  logout() {
    localStorage.clear();
    this.webSocketAPI._disconnect();
    this.router.navigate(['login']);
  }

  handleMessage(res:any){
    let temp = JSON.parse(JSON.parse(res));
    this.myHtml = this.myHtml + '<div><b>'+temp.messageSenderName+'</b></div>';
    this.myHtml = this.myHtml + '<div><b>'+temp.message+'</b></div>';
    res = null;
    console.log('receive message==> ',temp);
  }
}
