require("dotenv").config();
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const {
  restaurantEmailTemplate,
  generalEmailTemplate,
  rejectBookingEmail,
  acceptBookingEmail,
} = require("./emailBody");

const mailConfig = {
  service: "gmail",
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(mailConfig);

const MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Ravintola Kasthamandap",
    link: "https://kasthamandap.netlify.app",
    logo: "",
  },
});

const sendEmail = async (req, res) => {
  const {
    useremail,
    username,
    customerName,
    reservationDate,
    reservationTime,
    guestCount,
    phoneNumber,
    emailType,
  } = req.body;

  let emailBody;

  if (emailType === "booking-reject") {
    emailBody = rejectBookingEmail({
      useremail,
      customerName,
      reservationDate,
      reservationTime,
      guestCount,
      phoneNumber,
    });
  } else if (emailType === "booking-accept") {
    emailBody = acceptBookingEmail({
      useremail,
      customerName,
      reservationDate,
      reservationTime,
      guestCount,
      phoneNumber,
    });
  } else {
    emailBody =
      useremail === process.env.MAILER_EMAIL
        ? restaurantEmailTemplate({
            useremail,
            customerName,
            reservationDate,
            reservationTime,
            guestCount,
            phoneNumber,
          })
        : generalEmailTemplate({
            username,
            reservationDate,
            reservationTime,
          });
  }

  try {
    const html = MailGenerator.generate(emailBody);
    const from = `"Kasthamandap" ${process.env.MAILER_EMAIL}`;
    const to = useremail;
    const message = {
      from,
      to,
      subject: "Booking Table",
      html,
    };

    const mailResponse = await transporter.sendMail(message);

    res.status(201).json({ success: true, data: mailResponse });
    return mailResponse;
  } catch (error) {
    console.error({ error });
  }
};

module.exports = { sendEmail };
