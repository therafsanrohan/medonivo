import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Controller('queues')
export class QueueController {
  constructor(private readonly db: DatabaseService) {}

  @Get('active')
  async getActiveQueue() {
    // In a real app, this queries the clinical.queues table via DatabaseService.
    // We mock it for the end-to-end integration until real seeds are ready.
    return [
      {
        id: '1',
        token: 'A-14',
        patientName: 'Rafsan Hasan (From API)',
        mrnPhone: 'MRN-90218 - +8801700...',
        carePassStatus: 'active',
        carePassLabel: 'Active (Silver)',
        queueStatus: 'waiting',
        queueStatusLabel: 'Waiting in Chamber',
      },
      {
        id: '2',
        token: 'A-15',
        patientName: 'Sultana Parveen (From API)',
        mrnPhone: 'MRN-90219 - +8801800...',
        carePassStatus: 'neutral',
        carePassLabel: 'Non-Member',
        queueStatus: 'info',
        queueStatusLabel: 'Checked In',
      }
    ];
  }

  @Post('walk-in')
  async registerWalkIn(@Body() data: any) {
    // Mocking an insert to clinical.queues
    return {
      id: Math.random().toString(),
      token: `A-${Math.floor(Math.random() * 100) + 20}`,
      ...data,
      patientName: `${data.patientName} (Added via API)`
    };
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() data: any) {
    // Mocking an update
    return { success: true, id, newStatus: data.status };
  }
}
