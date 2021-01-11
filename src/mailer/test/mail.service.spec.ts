import { MailerService } from '@nestjs-modules/mailer';
import { Test } from '@nestjs/testing';
import { MailerCustomService } from '../mailer-custom.service';

describe('MailerService', () => {
  let mailerService: MailerCustomService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MailerCustomService,
        {
          provide: MailerService,
          useValue: { sendMail: async () => Boolean },
        },
      ],
    }).compile();

    mailerService = module.get<MailerCustomService>(MailerCustomService);
  });

  it('should be defined', () => {
    expect(mailerService).toBeDefined();
  });

  describe('send mail', () => {
    it('success', async () => {
      const data = await mailerService.sendMail({});

      expect(data).toBeTruthy();
    });

    it('failed', async () => {
      const data = await mailerService.sendMail({});
      expect(data).toBeTruthy();
    });
  });
});
