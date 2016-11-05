module.exports =  {
  Sales : {},
  
  saveSale : function(Sale){
    this.Sales[Sale.id]= Sale;
  },
  listAllSales : function(){
    var rtnValue =[];
    for (var item in this.Sales) {
      rtnValue.push(this.Sales[item]);
    };
    return rtnValue;
  },
  findSale : function(id){
    return this.Sales[id];
  }
};


