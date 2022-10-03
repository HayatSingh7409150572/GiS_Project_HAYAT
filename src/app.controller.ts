import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('yes')
  getHello():string{
    let hayat=true
     if(hayat==true){
       return "Everything acceptable"
     }
      else 
     return this.appService.getHello();
  }
}
