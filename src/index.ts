import kudeGen from "./KUDEGen";

class QRGen {
  generateKUDE = (
    java8Path: string,
    xmlSigned: string,
    urlLogo: string,
    ambiente: string
  ): Promise<any> => {
    return kudeGen.generateKUDE(java8Path, xmlSigned, urlLogo, ambiente);
  };
}

export default new QRGen();
