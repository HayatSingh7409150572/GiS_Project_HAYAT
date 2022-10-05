import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseInterceptors, ConsoleLogger } from '@nestjs/common';
import { GeoDataModuleService } from './geo-data-module.service';
import { from, map, Observable } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { readFileSync } from 'fs';

import { resourceLimits } from 'worker_threads';
import { resourceUsage } from 'process';
import Papa, { parse } from 'papaparse';
import csvParser from 'csv-parser';
import { Any } from 'typeorm';
import { request } from 'express';
import { GeoDataEntity, lineEntity, Parcel } from './entities/geo-data-module.entity';
import {Polygon} from 'geojson'
import { get } from 'https';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { pathToFileURL } from 'url';

@Controller('geo-data-module')
export class GeoDataModuleController {
  constructor(private readonly geoDataModuleService: GeoDataModuleService) { }

//---PostGisData---Polygon--file//
@Post('gisData')
async createParcelPoint(
   @Body()
   createParcelPointDto: Parcel): Promise<Parcel> {
   return this.geoDataModuleService.createParcel(createParcelPointDto)
}

//----PostGisLineString---------//

// @Post('linestrgis')
// async createLineStr(
//    @Body()
//    createLineDto:any):Promise<any>{
//     return this.geoDataModuleService.createLineString(createLineDto)

//    }


//---Fetch--all---GiS-data--from--database-------------//
  // @Get()
  // @HttpCode(200)
  // findAll(): Observable<any> {

  //   return this.geoDataModuleService.findAll();
  // }

//---Upload--CSV-File--toReadData--------//
  @Post('file')
  @UseInterceptors(
    FileInterceptor('file_asset', {
      storage: diskStorage({
        destination: './files',
      })
    })
  )
  async uploadFile() {

  const csvFile = readFileSync('files/1.csv')
  const csvData = csvFile.toString()
  const parsedCsv = await parse(csvData, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.toLowerCase().replace('#', '').trim(),
      complete: (results) => results.data,
    });

    console.log(parsedCsv)

         let newGeom = {
                           type: 'Point',
                           coordinates:[parsedCsv.data[0]['log'],parsedCsv.data[0]['lat']]
                       }

        let newPolygon = {
                            type:'Polygon',
                            coordinates :[[parsedCsv.data[0]],parsedCsv.data[1],[parsedCsv.data[0]],[parsedCsv.data[1]],[parsedCsv.data[0]]]
                         }              

    let newData = {
      id: parsedCsv.data[0]['id'], 
      log: parsedCsv.data[0]['log'],
      lat: parsedCsv.data[0]['lat'],
      cityname: parsedCsv.data[0]['cityname'],
     // alt:parsedCsv.data[0]['alt'],
      //goem:"ST_MakePoint(" + parsedCsv.data[0]['log'] + ", " + parsedCsv.data[0]['lat']+","+parsedCsv.data[0]['alt']+")",
      geom:newGeom,
      polygon:newPolygon

    }
    console.log(parsedCsv)
    console.log(newData)

  return this.geoDataModuleService.create(newData)

  };

  
  //-------FetchApi-----------//
  @Get('getData')
      getData(@Param()id:number):Observable<any>{

     let user = {
       name:"hayat",
     }

        return from(this.geoDataModuleService.getData())
      }





//----deleteApi-------GeoJSON---//

@Delete("/:id")
   deleteData(@Param()id:number):Observable<any>{
    return from(this.geoDataModuleService.deleteGeoData(id))
   }
}





