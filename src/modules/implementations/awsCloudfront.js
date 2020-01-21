const aws = require('aws-sdk');
const {
  CLOUDFRONT_DISTRIBUTION_ID,
  CLOUDFRONT_RSA_KEY,
  CLOUDFRONT_URL,
} = require('../../config/aws');

const cloudFrontSigner = new aws.CloudFront.Signer(CLOUDFRONT_DISTRIBUTION_ID, CLOUDFRONT_RSA_KEY);

const policy = JSON.stringify({
  Statement: [
    {
      Resource: `http*://${CLOUDFRONT_URL}/*`,
      Condition: {
        DateLessThan: {
          'AWS:EpochTime':
              Math.floor(new Date().getTime() / 1000) + 60 * 60 * 1,
        },
      },
    },
  ],
});

const attachSignedCookieToResponse = (response) => {
  const signedCookie = cloudFrontSigner.getSignedCookie({ policy });

  response.cookie('CloudFront-Key-Pair-Id', signedCookie['CloudFront-Key-Pair-Id'], {
    domain: CLOUDFRONT_URL,
    path: '/',
    httpOnly: true,
  });

  response.cookie('CloudFront-Policy', signedCookie['CloudFront-Policy'], {
    domain: CLOUDFRONT_URL,
    path: '/',
    httpOnly: true,
  });

  response.cookie('CloudFront-Signature', signedCookie['CloudFront-Signature'], {
    domain: CLOUDFRONT_URL,
    path: '/',
    httpOnly: true,
  });

  return response;
};

module.exports = attachSignedCookieToResponse;
