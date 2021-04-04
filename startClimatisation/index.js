const BlueLinky = require('bluelinky');
const auth = require('basic-auth')

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.startClim = (req, res) => {

  try {
    let user = auth(req);
    if (user.name !== process.env.basic_user || user.pass !== process.env.password) {
      res.status(401).send('Invalid credential');
      return;
    }
  } catch(e) {
    res.status(401).send('Invalid credential');
    return;
  }
  
  let client = new BlueLinky({
    username: process.env.username,
    password: process.env.password,
    region: 'CA',
    brand: 'hyundai',
    pin: process.env.pin,
  });

client.on('ready', async () => {
    try {
      const car = await client.getVehicle(process.env.vin);
      const result = await car.start({
        airCtrl: true,
        heating1: true,
        defrost: true,
        airTempvalue: 22
      });
      console.log("result: ", result);
      res.status(200).send(result);
    } catch(e) {
      console.error(e);
      res.status(200).send(e);
    }
  });
};
