require('dotenv').config();

const { createTransport } = require('nodemailer');
const EmailTemplate = require('email-templates');
const SES = require('aws-sdk/clients/ses');

class SESEmail {
  constructor(accessKeyId, secretAccessKey, region) {
    const accessConfig = {
      accessKeyId, secretAccessKey, region, paramValidation: false,
    };

    this.transporter = createTransport({
      SES: new SES(accessConfig),
    });
  }

  sendTextEmail(messageDetails) {
    return this.transporter.sendMail(messageDetails);
  }

  // eslint-disable-next-line class-methods-use-this
  sendTemplateEmail(template, recipients, locals, messageOptions, from) {
    const email = new EmailTemplate({
      message: { from },
      transport: this.transporter,
    });
    // returns an array of promises
    return recipients.map((recipient) => email.send({
      template,
      message: { ...messageOptions, to: recipient },
      locals,
    }));
  }
}

module.exports = SESEmail;
