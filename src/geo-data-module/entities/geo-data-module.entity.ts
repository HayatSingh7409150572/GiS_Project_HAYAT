import { Column, Entity, getMongoRepository, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Point } from 'geojson'
import {Polygon,LineString,MultiLineString} from 'geojson'
import {Position,GeoJSON} from 'geojson'
import { IsOptional } from 'class-validator';

@Entity({ name: 'geoData' })

export class GeoDataEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'decimal', nullable: true })
    log: number

    @Column({ type: 'decimal', nullable: true })
    lat: number

    @Column({ nullable: true })
    cityname: string

    @Index({ spatial: true })
    @Column({
        type: 'geography',
        spatialFeatureType:'point',
        srid: 4326,
        nullable: true
    })
    geom:GeoJSON;

    @IsOptional()
    position?:Position[]

}

//-------Polytable---------//
@Entity({name:"newPolyTable"})
 export class Parcel {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ nullable: true })
    name: string;
    @Column({nullable:true})
    color:string;
    @Column({nullable:true})
    desc:string;
    @Index({ spatial: true })
    @Column({
        type: 'geometry',
        spatialFeatureType:'Geometry',
        srid:4326,
        nullable: true
    })
     geom:GeoJSON;
}

//---lineEntity---//
 @Entity({name:"LinestringTable"})
  export class lineEntity{


    @PrimaryGeneratedColumn()
    id:number

    @Column({ nullable: true })
    name: string

    @Column({ nullable: true })
    color: string

    @Column({ nullable: true })
    desc: string

    @Column({
        type: 'geometry',
        spatialFeatureType: 'Geometry',
        srid: 4326,
        nullable: true
    })
    geom: GeoJSON;
    
     }   

//--------------GeoEntity-----------------//
     @Entity({name:"geometry"})
     export class geoEntity{

        @PrimaryGeneratedColumn()
        id:number

        @Column({nullable:true})
        type:string

        @Column({nullable:true})
        color:string

        @Column({nullable:true})
        subtype:string

     }


     
