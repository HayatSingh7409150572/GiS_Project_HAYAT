import { Module } from '@nestjs/common';
import { GeoDataModuleService} from './geo-data-module.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeoDataEntity, lineEntity, Parcel} from './entities/geo-data-module.entity';
import { HttpModule, HttpService } from '@nestjs/axios';
import { GeoDataModuleController } from './geo-data-module.controller';


@Module({
  imports:[TypeOrmModule.forFeature([GeoDataEntity,Parcel,lineEntity])],
  controllers: [GeoDataModuleController],
  providers: [GeoDataModuleService]
})
export class GeoDataModuleModule {}
