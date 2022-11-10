export class Target {

  listLetter: string[] = [];
  listPossibleLetter: string[] = ['a','z','e','r','t','y','u','i','o','p',
  'q','s','d','f','g','h','j','k','l','m',
  'w','x','c','v','b','n',',',';',':','!',
  '&','é',"\"",'\'','(','-','è','_','ç','à',')','='];


  generateList = (length:number) => {
    let spaceIterator = 0;
    for(let i=0; i < length ; i++) {
      this.listLetter[i]= this.listPossibleLetter[Math.floor(Math.random()*this.listPossibleLetter.length)];
      spaceIterator++;
      if(spaceIterator === 7 && i+1 < length) {
        this.listLetter[i+1]= ' ';
        spaceIterator=0;
        i++;
      } else {
        let randomSpace = Math.random()*7;
        if( randomSpace < 1 && spaceIterator>2) {
          this.listLetter[i+1]= ' ';
          spaceIterator=0;
          i++;
        }
      }
    }
  }
}
