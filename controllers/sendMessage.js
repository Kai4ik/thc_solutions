exports.sendMessage = async (req, res, next) => {
  try {
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: "kai4ik.apps@gmail.com", // Change to your recipient
      from: "orozobekov.kai@gmail.com", // Change to your verified sender
      subject: "Sending with SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js",
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
    return res.status(200);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};
