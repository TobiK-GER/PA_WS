function HSMain(name, anzAufrufe, anzBewertungen, weiterEmpfQuote){
      this.nameHS = name;
      this.anzSeitenAufrufe = anzAufrufe;

}

var nameHS = function a(){
    let teilA = "Hochschule";
    let teilB = "Fresenius";
    return teilA + teilB;
}

function funB(base, month){
  return base * month;
}

var anzAufrufe = funB(100, 25);



console.log(anzAufrufe);

var hochschule = new HSMain(nameHS, anzAufrufe);

//console.log(hochschule);
