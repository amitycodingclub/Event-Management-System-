// ==============creating Library files using npm===================
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
// ================================================
// =================Using the library files============
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
// ========================================================

// ==========================using the local server of mongodb======================
mongoose.connect("mongodb://localhost:27017/ShenDB", {useNewUrlParser: true});
// ===================================================================================
// ================Making an schema or table===============================
const itemsSchema = {
	name: String
};

const userSchema = {
  username : String,
  password : String
};
// ===============================================================

// =======================creating an model in mongoDB======================
const Item = mongoose.model("Item", itemsSchema);
const User = mongoose.model("User", userSchema);
// ================================================================



// =================Routers================================
app.get("/",function(req,res){
	res.render("Home");
});

app.get("/login",function(req,res){
	res.render("login");
});

app.get("/register",function(req,res){
	res.render("register");
});
 app.post("/register",function(req,res){
   const newUser = new User({
      username:req.body.username,
      password:req.body.password
   });

   newUser.save(function(err){
     if(err) {
     	console.log(err);
     } else{
     	res.render("shenron");
     }
   });
 });

 app.post("/login",function(req,res){
   const username = req.body.username;
   const password = req.body.password;

   User.findOne({username:username}, function(err, foundUser){
    if(err){
    	console.log(err);
    } else{
    	if(foundUser){
    		if(foundUser.password === password){
    			res.render("shenron");
    		}
    	}
    }
   });
 });

app.get("/shenron",function(req,res){
  res.render("shenron");
});
app.get("/colorgame",function(req,res){
   res.render("colorgame");
});


app.get("/patatap",function(req,res){
	res.render("patatap");
});

app.get("/todo",function(req,res){
   let today = new Date();
  
  let options = {
  	weekday: "long",
  	day: "numeric",
  	month: "long"
  };

  let day = today.toLocaleDateString("en-US",options);
   
   const item1 = new Item({
    name: "Welcome to your todo list"
   });
   
   const defaultItems =[item1];


  Item.find({}, function(err, foundItems){
  	   
  	   if(foundItems.length === 0){
  	     Item.insertMany(defaultItems,function(err){
	      if(err){
		      console.log(err);
	        }else {
		      console.log("Data loaded to DB");
	        }
        });
         res.redirect("/todo");
        } else{
  	     res.render("todo",{kindofday: day, items: foundItems});
    }

});
});


app.post("/todo",function(req, res){
	const itemName = req.body.newItem;
      const item = new Item({
 	  name: itemName
    });
 
    item.save();
    res.redirect("/todo");
});

app.post("/delete",function(req, res){
   const checkedItemId = req.body.checkbox;
   Item.findByIdAndRemove(checkedItemId, function(err){
     if(!err){
     	console.log("successfully deleted !!");
     	res.redirect("/todo");
     }
   });
}); 

app.get("/logout",function(req,res){
   req.logout();
   res.redirect("/");
});

app.get("*",function(req,res){
   res.send("PAGE NOT FOUND");
});
// =================================================================================


// ========================local server listner==================================
app.listen(3000,function(){
	console.log("SERVER ONLINE");
});
// ========================================================================