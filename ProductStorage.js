module.exports =  {
  Products : {},
  
  saveProduct : function(Product){
    this.Products[Product.id]= Product;
  },
  listAllProducts : function(){
    var rtnValue =[];
    for (var item in this.Products) {
      rtnValue.push(this.Products[item]);
    };
    return rtnValue;
  },
  findProducts : function(id){
    return this.Products[id];
  }
};

