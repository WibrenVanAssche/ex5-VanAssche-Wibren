module.exports =  {
  Locations : {},
  
  saveLocation : function(Location){
    this.Locations[Location.id]= Location;
  },
  listAllLocations : function(){
    var rtnValue =[];
    for (var item in this.Locations) {
      rtnValue.push(this.Locations[item]);
    };
    return rtnValue;
  },
  findLocations : function(id){
    return this.Locations[id];
  }
};

