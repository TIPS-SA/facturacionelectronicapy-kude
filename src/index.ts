import kudeGen from "./KUDEGen";

class QRGen {
  generateKUDE = (
    xmlSigned: string,
    urlLogo: string,
    ambiente: string
  ): Promise<any> => {
    return kudeGen.generateKUDE(xmlSigned, urlLogo, ambiente);
  };
}

export default new QRGen();
