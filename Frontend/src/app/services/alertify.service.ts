import { Injectable } from '@angular/core';
import * as alertifyMsg from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

  successMsg(message: string){
    alertifyMsg.success(message);
  }
  warningMsg(message: string){
    alertifyMsg.warning(message);
  }
  errorMsg(message: string){
    alertifyMsg.error(message);
  }
}
