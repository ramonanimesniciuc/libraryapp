const express=require('express');
const bodyParser=require('body-parser')
const Sequelize = require('sequelize')
const mysql=require('mysql2');
const cors = require('cors');
const sequelize = new Sequelize('libraryapp', 'root', '', {
  dialect : 'mysql',
  operatorsAliases: false,
  define:{
    timestamps:false
  }
})
sequelize.sync();
// COMANDA PENTRU CREAREA UNEI BAZE DE DATE CU NUMELE "ANDREILICENTA"
// var con=mysql.createConnection({
//    host:"localhost",
//    user:"root",
//    password:''
// })
//
// con.connect(function(err){
//    if(err)throw err;
//    console.log("Conectata!");
//    con.query("CREATE DATABASE LIBRARYAPP",function(err,result){
//        if(err)throw err;
//        console.log("S-a creat baza de date!")
//    })
// })


const app=express()
app.use(cors());
app.use(bodyParser.json())


const User =sequelize.define('User',{
  first_name:{
    type:Sequelize.STRING,
    allowNull:false,
    validate:{
      len:[3,40]
    }
  },
  last_name:{
    type:Sequelize.STRING,
    allowNull:false,
    validate:{
      len:[3,40]
    }

  },
  enrollment_date:{
    type:Sequelize.DATEONLY,
    allowNull:false
  },
  birthdate:{
    type:Sequelize.DATEONLY,
    allowNull:false
  },
  username:{
    type:Sequelize.STRING,
    allowNull:false,
    validate:{
      len:[3,40]
    }
  },
  password:{
    type:Sequelize.STRING,
    validate:{
      len:[3,40]
    }
  },
  email:{
    type:Sequelize.STRING,
    validate:{
      len:[3,40]
    },
  },
  address:{
    type:Sequelize.STRING
  },
},{
  underscored:true
});

const Authors=sequelize.define('Author',{
  name:{
    type: Sequelize.STRING
  }
})

const PublishingHouses=sequelize.define('PublishingHouse',{
  name:{
    type:Sequelize.STRING
  }
})

const Libraries=sequelize.define('Library',{
  name:{
    type:Sequelize.STRING
  },
  address:{
    type:Sequelize.STRING
  }
})

const librarians=sequelize.define('Librarian',{
  first_name:{
    type:Sequelize.STRING
  },
  last_name:{
    type:Sequelize.STRING
  },
  username:{
    type:Sequelize.STRING
  },
  password:{
    type:Sequelize.STRING
  },
})


const Categories=sequelize.define('category',{
  title:{
    type:Sequelize.STRING
  }
})
const Books=sequelize.define('book',{
  cover:{
    type:Sequelize.STRING
  },
  title:{
    type:Sequelize.STRING
  },
  description:{
    type:Sequelize.STRING
  },
  pages:{
    type:Sequelize.STRING
  },
  publishedDate:{
    type:Sequelize.DATEONLY
  },
  rating:{
    type:Sequelize.FLOAT
  },
  stock:{
    type:Sequelize.INTEGER
  }
})
const BookStatuses=sequelize.define('bookStatus',{
  title:{
    type:Sequelize.STRING
  }
})
const BookCopies=sequelize.define('bookCopy',{
comment:{
  type:Sequelize.STRING
}
})

const RentedBooks=sequelize.define('rentedBook',{
  startDate:{
    type:Sequelize.DATEONLY
  },
  endDate:{
    type:Sequelize.DATEONLY
  }
})

const ReservedTypes=sequelize.define('reservedType' , {
  title:{
    type:Sequelize.STRING
  },
  cost:{
    type:Sequelize.FLOAT
  }
})

const ReservedBooks=sequelize.define('reservedBooks',{
  payment_accepted:{
    type:Sequelize.BOOLEAN
  }
})

Libraries.hasMany(Books);
Books.belongsTo(Libraries);

Categories.hasMany(Books);
Books.belongsTo(Categories);

Authors.hasMany(Books);
Books.belongsTo(Authors);

PublishingHouses.hasMany(Books);
Books.belongsTo(PublishingHouses);

Libraries.hasMany(librarians);
librarians.belongsTo(Libraries);

Books.hasMany(BookCopies);
BookCopies.belongsTo(Books);

BookStatuses.hasMany(BookCopies);
BookCopies.belongsTo(BookStatuses);

User.hasMany(RentedBooks);
RentedBooks.belongsTo(User);

librarians.hasMany(RentedBooks);
RentedBooks.belongsTo(librarians);

User.hasMany(ReservedBooks);
ReservedBooks.belongsTo(User);

BookCopies.hasMany(ReservedBooks);
ReservedBooks.belongsTo(BookCopies);

ReservedTypes.hasMany(ReservedBooks);
ReservedBooks.belongsTo(ReservedTypes);

sequelize.sync();

app.post('/login',(req,res,next)=>{
  User.findAll({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  })
    .then((user)=>res.status(200).json(user))
    .catch((err)=>next(err))
})
app.listen('3030',()=>{
  console.log('Server started on port 3030');
})
