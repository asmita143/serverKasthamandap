require("dotenv").config();

const restaurantEmailTemplate = (data = {}) => {
  return {
    body: {
      name: "Kasthamandap",
      intro: `You have received a booking request from following customer : <br/>
       Email: ${data?.customerEmail}<br/>
       Phone number: ${data?.phoneNumber}<br/>
       Name: ${data?.customerName}<br/>
       Pax: ${data?.guestCount}<br/>
       Date: ${data?.reservationDate}<br/>
       Time: ${data?.reservationTime}<br/>`,
      action: [
        {
          instructions: "To accept the booking request, please click here:",
          button: {
            color: "#22BC66",
            text: "Approve",
            link: `https://kasthamandap.fi/${data?.reservationID}/approve`,
          },
        },
        {
          instructions: "To Reject the booking request, please click here:",
          button: {
            color: "#ff0000",
            text: "Decline",
            link: `https://kasthamandap.fi/reservation/${data?.reservationID}/decline`,
          },
        },
      ],
    },
  };
};

const generalEmailTemplate = (data = {}) => {
  return {
    body: {
      name: data?.customerName,
      intro: `We have received your booking request for ${data?.reservationDate} at ${data?.reservationTime}. 
      <br />We will get back to you as soon as possible.`,
      outro: `<br /> Please feel free to contact us at <br/>Ravintola Kathamandap <br/>${process.env.MAILER_EMAIL},
    },
  };
};
const acceptBookingEmail = (data = {}) => {
  return {
    body: {
      name: data?.customerName,
      intro: `Your booking has been approved. We will be pleased to serve you. The booking details are as follows:<br/>
      Name: ${data?.customerName}<br/>
      Pax: ${data?.guestCount}<br/>
      Date: ${data?.reservationDate}<br/>
      Time: ${data?.reservationTime}<br/>
      Email: ${data?.useremail}<br/>
      Phone number: ${data?.phoneNumber}<br/>
      Please contact us at ${process.env.MAILER_EMAIL} if you want to change the booking detail or if you have any prerequisites or cancel the reservation`,
    },
  };
};
const rejectBookingEmail = (data = {}) => {
  return {
    body: {
      name: data?.customerName,
      intro: `Unfortunately we are not able to accept you booking request with details:<br/>
        Email: ${data?.useremail}<br/>
        Phone number: ${data?.phoneNumber}<br/>
        Name: ${data?.customerName}<br/>
        Pax: ${data?.guestCount}<br/>
        Date: ${data?.reservationDate}<br/>
        Time: ${data?.reservationTime}<br/>
        We hope to serve you next time. Thank you.</br>`,
    },
  };
};

module.exports = {
  restaurantEmailTemplate,
  generalEmailTemplate,
  acceptBookingEmail,
  rejectBookingEmail,
};
