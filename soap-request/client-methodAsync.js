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
const soapRequest = async ({
  wsdlURL,
  options = {},
  authorization = {},
  args,
}) => {
  try {
    // Create client with the WSDL
    const client = await soap.createClientAsync(wsdlURL, options);

    // Create security object with the username and password (BasicAuthSecurity is used in this example)
    const security = new soap.BasicAuthSecurity(
      authorization.username,
      authorization.password
    );
    client.setSecurity(security);

    // Make the request to the SOAP service (in this case, the function is called SayHello)
    const value = await client.SayHelloAsync(args);

    // Results is an array (the first position is the Json response)
    return value[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

(() => {
  // Call the function
  soapRequest({
    wsdlURL,
    authorization: { username, password },
    args: xmlJson,
  })
    .then((value) => console.log(value))
    .catch((error) => console.log(error));
})();
