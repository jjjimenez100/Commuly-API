const { createTransport } = require('nodemailer');
const EmailTemplate = require('email-templates');
const SNS = require('aws-sdk/clients/sns');

class SNSEmail {
  constructor(accessKeyId, secretAccessKey, region) {
    const accessConfig = {
      accessKeyId, secretAccessKey, region,
    };

    this.snsInstance = new SNS(accessConfig);
    this.transporter = createTransport({
      SES: this.snsInstance,
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

module.exports = SNSEmail;
