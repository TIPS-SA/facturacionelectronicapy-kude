const { exec } = require("child_process");
import fs from "fs";

class KUDEGen {
  /**
   * Genera el archivo KUDE para la Factura Electronica
   * @param xml
   * @returns
   */
  generateKUDE(
    java8Path: string,
    xml: string,
    urlLogo: string,
    destFolder: string
  ) {
    return new Promise(async (resolve, reject) => {
   
      const classPath = "" + __dirname + "/jasperLibs/";
      const jarFile = "" + __dirname + "/CreateKude.jar";
      const tmpXMLToSign = "" + __dirname + "/xml_sign_temp.xml";
      const jasperPath = "" + __dirname + "/DE/";

      fs.writeFileSync(tmpXMLToSign, xml, { encoding: "utf8" });
      const fullCommand = `"${java8Path}" -Dfile.encoding=IBM850 -classpath "${classPath}" -jar "${jarFile}" "${tmpXMLToSign}" "${jasperPath}" "${destFolder}"`;
      console.log("fullCommand", fullCommand);
      exec(
        fullCommand,
        { encoding: "UTF-8", maxBuffer: 1024 * 1024 },
        (error: any, stdout: any, stderr: any) => {
          if (error) {
            reject(error);
          }
          if (stderr) {
            reject(stderr);
          }

          try {
            //file removed
            fs.unlinkSync(tmpXMLToSign);
          } catch (err) {
            console.error(err);
          }

          //console.log(`signedXML: ${stdout}`);

          //resolve(Buffer.from(`${stdout}`,'utf8').toString());
          //fs.writeFileSync(tmpXMLToSign + ".result.xml", `${stdout}`, {encoding: 'utf8'});
          //let resultXML = fs.readFileSync(tmpXMLToSign + ".result.xml", {encoding: 'utf8'});
          resolve(`${stdout}`);
        }
      );
    });
    //});
  }
}

export default new KUDEGen();
