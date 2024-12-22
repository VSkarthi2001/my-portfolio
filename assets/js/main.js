AOS.init();
AOS.init({
  offset: 120,
  delay: 0,
  duration: 700,
  easing: 'ease',
  once: false,
  mirror: false,
  anchorPlacement: 'top-bottom',
});



fetch('./config.json')
  .then(response => response.json())
  .then(config => {
    emailjs.init();
    emailjs.init({
      publicKey: config.PUBLIC_KEY,
    });
    document.getElementById("contactForm").addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      emailjs.send(config.SERVICE_ID, config.TEMPLATE_ID, {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message
      })
        .then(function (response) {
          alert("Email sent successfully!");
          document.getElementById("contactForm").reset();
        })
        .catch(function (error) {
          alert("Failed to send email. Please try again.");
          console.error(error);
        });
    });
  })
  .catch(error => console.error("Error loading config:", error));

