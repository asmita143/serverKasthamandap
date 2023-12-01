require("dotenv").config();

const restaurantEmailTemplate = (data = {}) => {
  return {
    body: {
      name: "Kasthamandap",
      intro: `You have received a booking request from following customer : <br/>
       Email: ${data?.useremail}<br/>
       Phone number: ${data?.phoneNumber}<br/>
       Name: ${data?.customerName}<br/>
       Pax: ${data?.guestCount}<br/>
       Date: ${data?.reservationDate}<br/>
       Time: ${data?.reservationTime}<br/>`,
      action: [
        {
          instructions: "to accept the booking request, please click here:",
          button: {
            color: "#22BC66",
            text: "Approve",
            link: "https://localhost:5173/reservation/:reservationID/approve",
          },
        },
        {
          instructions: "To Reject the booking request, please click here:",
          button: {
            text: "Decline",
            link: "https://localhost:5173/reservation/:reservationId/decline",
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
      intro: `We have received your booking request for ${data?.Date} at ${data?.Time}. 
        <br /> Please feel free to contact us at ${process.env.MAILER_EMAIL}`,
    },
  };
};
const acceptBookingEmail = (data = {}) => {
  return {
    body: {
      name: data?.customerName,
      intro: `Your booking has been approved. We will be pleased to serve you. tHE booking details are as follows:<br/>
      Email: ${data?.useremail}<br/>
      Phone number: ${data?.phoneNumber}<br/>
      Name: ${data?.customerName}<br/>
      Pax: ${data?.guestCount}<br/>
      Date: ${data?.reservationDate}<br/>
      Time: ${data?.reservationTime}<br/>
      Please contact us at ${process.env.MAILER_EMAIL} if you want to change the booking detail or if you have any prerequisites.`,
      action: [
        {
          instructions: "To cancel booking, please click here:",
          button: {
            color: "#FF0000",
            text: "Cancel",
            link: "https://localhost:5173/cancel/confirmation?reservationId:",
          },
        },
      ],
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
