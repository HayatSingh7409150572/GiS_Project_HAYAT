import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello():any {

   let hayat =  ["boom","baby"]


    return hayat;
  }
}
