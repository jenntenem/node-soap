import soap from "soap";
import dotenv from "dotenv";
dotenv.config();

// Variables to make the request to the SOAP service
const {
  SOAP_USER: username,
  SOAP_PASSWORD: password,
  SOAP_WSDL: wsdlURL,
} = process.env;

// Json (XML) for the request in SOAP service
const xmlJson = {
  Name: "Jenntenem",
};

// Function to make the request
const soapRequest = ({ wsdlURL, options = {}, authorization = {}, args }) => {
  // Create client with the WSDL
  soap.createClient(wsdlURL, options, function (err, client) {
    if (err) {
      console.log(err);
      return;
    }

    // Create security object with the username and password (BasicAuthSecurity is used in this example)
    const security = new soap.BasicAuthSecurity(
      authorization.username,
      authorization.password
    );
    client.setSecurity(security);

    // Make the request to the SOAP service (in this case, the function is called SayHello)
    client.SayHello(args, function (err, result) {
      if (err) {
        console.log(err);
        return;
      }

      // We would have the response here (process it as you want)
      console.log(result);
    });
  });
};

(() => {
  // Call the function
  soapRequest({
    wsdlURL,
    authorization: { username, password },
    args: xmlJson,
  });
})();
