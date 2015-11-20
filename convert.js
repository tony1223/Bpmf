

var fs = require("fs");

var content = fs.readFileSync("phone.cin");

var lines = content.toString().split("\n");

var start = false;
var keymap = {};
lines.forEach(function(line){
  if(line.indexOf("%keyname  begin") != -1){
    start = true;
    return true;
  }else if(line.indexOf("%keyname  end") != -1){
    start = false;
    return false;
  }

  if(start){
    var tokens = line.replace("\r","").split(/[ ]+/);
    keymap[tokens[0]] = tokens[1];
  }

});

var chars = [];

lines.forEach(function(line){
  if(line.indexOf("%chardef  begin") != -1){
    start = true;
    return true;
  }else if(line.indexOf("%chardef  end") != -1){
    start = false;
    return false;
  }

  if(start){
    var tokens = line.replace("\r","").split(/[ ]+/);
    chars.push({k:tokens[0],v:tokens[1]});
  }

});

chars.map(function(o){
  o.kv = [];
  for(var i = 0 ; i < o.k.length;++i){
    o.kv.push(keymap[o.k[i]]);
  }
  o.kv = o.kv.join("");
  return o;
})

var charmap = chars.reduce(function(now,next){
  now[next.v] = next.kv;
  return now;
},{});
console.log(JSON.stringify(charmap));


