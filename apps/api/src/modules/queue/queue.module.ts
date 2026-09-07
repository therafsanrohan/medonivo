import { Module } from '@nestjs/common';
import { QueueController } from './queue.controller';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [QueueController],
})
export class QueueModule {}
