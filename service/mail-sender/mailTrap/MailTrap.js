const MailtrapClient =require('mailtrap')
require('dotenv').config()

const MailTrap = async(userMail,data)=>{

    const TOKEN = process.env.MAIL_TRAP_TOKEN
    const SENDER_EMAIL = "info@aliprogrammers.com";
    const RECIPIENT_EMAIL =userMail;
    
    const client = new MailtrapClient({ token: TOKEN });
    console.log(client)
    const sender = { name: "ali programmers", email: SENDER_EMAIL };
    
    client
      .send({
        from: sender,
        to: [{ email: RECIPIENT_EMAIL }],
        subject: data.subject,
        text: data.value,
      })
      .then((success)=>console.log(success))
      .catch((err)=>console.log(err));



}

module.exports = MailTrap