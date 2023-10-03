export class AbstractResource {

    constructor(deliveryDate,guarentee,brand) {
        this.deliveryDate = deliveryDate;
        this.guarentee = guarentee;
        this.brand = brand;
    };

    // setters
    setDeliveryDate(deliveryDate) {
        this.deliveryDate = deliveryDate;
    }
    setGuarentee(guarentee) {
        this.guarentee = guarentee;
    }
    setBrand(brand) {
        this.brand = brand;
    }
};

export class Computer extends AbstractResource {
    
    constructor(deliveryDate,guarentee,brand,computerCpu,computerRam,computerDisk,computerScreen,computerManufacturer) {
        super(deliveryDate,guarentee,brand);
        this.computerCpu = computerCpu;
        this.computerRam = computerRam;
        this.computerDisk = computerDisk;
        this.computerScreen = computerScreen;
        this.computerManufacturer = computerManufacturer;
    };

    // setters

    setComputerCpu(computerCpu) {
        this.computerCpu = computerCpu;
    }
    setComputerRam(computerRam) {
        this.computerRam = computerRam;
    }
    setComputerDisk(computerDisk) {
        this.computerDisk = computerDisk;
    }
    setComputerScreen(computerScreen) {
        this.computerScreen = computerScreen;
    }
    setComputerManufacturer(computerManufacturer) {
        this.computerManufacturer = computerManufacturer;
    }

};

export class Printer extends AbstractResource {
        
    constructor(deliveryDate,guarentee,brand,printerResolution,printerSpeed,printerManufacturer) {
        super(deliveryDate,guarentee,brand);
        this.printerResolution = printerResolution;
        this.printerSpeed = printerSpeed;
        this.printerManufacturer = printerManufacturer;
    };
    
    // setters
    
    setPrinterResolution(printerResolution) {
        this.printerResolution = printerResolution;
    }
    setPrinterSpeed(printerSpeed) {
        this.printerSpeed = printerSpeed;
    }
    setPrinterManufacturer(printerManufacturer) {
        this.printerManufacturer = printerManufacturer;
    }
};