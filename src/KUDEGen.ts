const { exec } = require("child_process");
import fs from "fs";
import findJavaHome from "find-java-home";

class KUDEGen {
  /**
   * Genera el archivo KUDE para la Factura Electronica
   * @param xml
   * @returns
   */
  generateKUDE(xml: string, urlLogo: string, ambiente: string) {
    return new Promise(async (resolve, reject) => {
      //console.log("A firmar", xml);
      //xml = await this.asignarFechaFirma(xml);
      findJavaHome({ allowJre: true }, (err: any, java8Path: any) => {
        if (err) return console.log(err);
        if (process.env.java8_home) {
          //java8Path = `"C:\\Program Files\\Java\\jdk1.8.0_221\\bin\\java"`;
          java8Path = process.env.java8_home;
        }

        const classPath = "" + __dirname + "/jasperLibs/";
        const jarFile = "" + __dirname + "/CreateKude.jar";
        const tmpXMLToSign = "" + __dirname + "/xml_sign_temp.xml";
        const jasperPath = "" + __dirname + "/DE/";

        fs.writeFileSync(tmpXMLToSign, xml, { encoding: "utf8" });
        const fullCommand = `"${java8Path}" -Dfile.encoding=IBM850 -classpath "${classPath}" -jar "${jarFile}" "${tmpXMLToSign}" "${urlLogo}" "${jasperPath}" "${ambiente}"`;
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
    });
  }
}

export default new KUDEGen();
