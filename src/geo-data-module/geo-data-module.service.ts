import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Any, DeleteResult, LimitOnUpdateNotSupportedError, Repository } from 'typeorm';
import { GeoDataEntity, lineEntity, Parcel } from './entities/geo-data-module.entity';
import { geoInterface } from './interface/geo-interface';
import {GeoJSON} from 'geojson'

@Injectable()
export class GeoDataModuleService {
 // Parcel: any;

  constructor(
    @InjectRepository(GeoDataEntity)
    private readonly GeoDataEntityPayload: Repository<GeoDataEntity>,
    @InjectRepository(Parcel)
    private readonly parcel: Repository<Parcel>,
    @InjectRepository(lineEntity)
    private readonly lineString: Repository<lineEntity>
  ) { }

  //------Create-Point---location----//
  create(createLocationData: geoInterface): Observable<any> {
    return from(this.GeoDataEntityPayload.save(createLocationData))
  }

  //------GeoJSON---service---------//
  async createParcel(createParcelPointDto:Parcel):Promise<any> {

    console.log(createParcelPointDto)

    let newObj = {
      
      geom:createParcelPointDto.geom.geometry,
      name: createParcelPointDto.name,
      desc: createParcelPointDto.desc,
      color: createParcelPointDto.color,
    }
    const map = this.parcel.create(newObj)
    await this.parcel.save(map)
    return map
    }

//----DeleteApi----------------------------//
 async deleteGeoData(id:number){
  return from(this.parcel.delete(id))
 }


  }


 
