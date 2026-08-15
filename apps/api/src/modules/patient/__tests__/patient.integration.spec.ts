import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PatientService } from '../patient.service';
import { DatabaseService } from '../../../database/database.service';

describe('PatientModule (Integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        PatientService,
        {
          provide: DatabaseService,
          useValue: {
            query: jest.fn().mockResolvedValue([])
          }
        }
      ]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });
});
