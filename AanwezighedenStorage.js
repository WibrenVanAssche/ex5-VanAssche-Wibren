module.exports =  {
  Aanwezigheden : {},
  
  saveAanwezigheid : function(Aanwezigheid){
    this.Aanwezigheden[Aanwezigheid.id]= Aanwezigheid;
  },
  listAllAanwezigheden : function(){
    var rtnValue =[];
    for (var item in this.Aanwezigheden) {
      rtnValue.push(this.Aanwezigheden[item]);
    };
    return rtnValue;
  },
  findAanwezigheid : function(id){
    return this.Aanwezigheden[id];
  }
};

