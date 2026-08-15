import { Module } from '@nestjs/common';
import { CarePassService } from './carepass.service';
import { CarePassController } from './carepass.controller';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CarePassController],
  providers: [CarePassService],
  exports: [CarePassService]
})
export class CarePassModule {}
