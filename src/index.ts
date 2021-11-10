import kudeGen from './KUDEGen';

class QRGen {
    generateKUDE = (xmlSigned: string, urlLogo: string) : Promise<any> => {
        return kudeGen.generateKUDE(xmlSigned, urlLogo);
    }
}

export default new QRGen();
