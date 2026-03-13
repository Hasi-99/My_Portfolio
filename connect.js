function emailSend() {
    var username1 = document.getElementById('name').value;
    var subject = document.getElementById('subject').value;
    var email = document.getElementById('Email').value;
    var messageBody = "From: <br>-----------------<br>" + "<br>Name : " + username1 + "<br>" + 
                      "Email : " + email + "<br>---------------------<br>" + 
                      document.getElementById('massage').value;

    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "2021CSC027@univ.jfn.ac.lk",
        Password: "EE420CB186C90B6D37436324BDA44FAABAC0",
        To: '2021csc027@univ.jfn.ac.lk',
        From: '2021csc027@univ.jfn.ac.lk',
        Subject: subject,
        Body: messageBody
    }).then(
        message => {
            console.log("Email sent response:", message); // Debugging line
            if (message === "OK") {
                Swal.fire({
                    title: 'Successful',
                    text: 'Message Sent Successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Message was not sent successfully. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    ).catch(error => {
        console.error("Error sending email:", error); // Debugging line
        Swal.fire({
            title: 'Error',
            text: 'An unexpected error occurred. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    });
}