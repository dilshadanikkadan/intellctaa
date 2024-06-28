import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NodemailService } from 'src/services/nodeMailer.service';

@Injectable()
export class EmailService {
  constructor(private nodeMailer: NodemailService) {}

  @OnEvent('user.created')
  async SendOtp(payload) {
    console.log('result from onevnt listern', payload);
    const { username, email, otp } = payload;
    await this.nodeMailer.sendEmail({
      username,
      email,
      otp,
      subject: 'verification email',
      message: 'verify your email',
    });
  }
  @OnEvent('forgotPassword.created')
  async sendForgotEmail(payload) {
    const { email, token } = payload;
    await this.nodeMailer.forgotPasswordEmail({
    
      email,
      token,
      subject: 'forgotPassword email',
      message: 'forGot email',
    });
  }
}
