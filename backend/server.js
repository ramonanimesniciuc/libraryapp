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
// sequelize.sync({force:true});
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
app.use(bodyParser.json({limit:'50mb'}));


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

Libraries.hasMany(BookCopies);
BookCopies.belongsTo(Libraries);

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
});

app.post('/login-librarian',(req,res,next)=>{
  librarians.findAll({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  })
    .then((librarian)=>res.status(200).json(librarian))
    .catch((err)=>next(err))
});
app.get('/books',(req,res,next)=>{
  Books.findAll({
    include:[
      {
        model:Authors,
      },
      {
        model:PublishingHouses
      },
      {
        model:Categories
      }
    ]
    }
  )
    .then((books)=>res.status(200).json(books))
    .catch((err)=>next(err))
});

app.post('/bookCopies',(req,res,next)=>{
  const copies=req.body;
  console.log(req.body);
  copies.forEach((copy)=>{
    try{
      BookCopies.create(copy)
    }
    catch(err){
      console.log(err)
    }

  })

});
app.post('/books',(req,res,next)=>{
  Books.create(req.body)
    .then((result)=>res.status(201).json(result))
    .catch((err)=>next(err))
});

app.post('/users',(req,res,next)=>{
  User.create(req.body)
    .then((result)=>res.status(201).json(result))
    .catch((err)=>next(err))
});
app.get('/books/:id',(req,res,next)=>{
  Books.findByPk(
    req.params.id,{
      include:[{
        model:Categories
      },
        {
          model:PublishingHouses
        },
        {
          model:BookCopies
        }
      ]
    }
  )
    .then((book)=>res.status(200).json(book))
    .catch((err)=>next(err))
});

app.get('/booksByLibrary/:id',(req,res,next)=>{
  BookCopies.findAll({where:{LibraryId:req.params.id},include:[{model:Books}]})
    .then((books)=>res.status(200).json(books))
    .catch((err)=>next(err))
});

app.get('/libraries',(req,res,next)=>{
  Libraries.findAll()
    .then((libraries)=>res.status(200).json(libraries))
    .catch((err)=>next(err))
});

app.get('/authors',(req,res,next)=>{
  Authors.findAll()
    .then((authors)=>res.status(200).json(authors))
    .catch((err)=>next(err))
});

app.get('/categories',(req,res,next)=>{
  Categories.findAll()
    .then((categories)=>res.status(200).json(categories))
    .catch((err)=>next(err))
});

app.get('/publishingHouses',(req,res,next)=>{
  PublishingHouses.findAll()
    .then((houses)=>res.status(200).json(houses))
    .catch((err)=>next(err))
});

app.get('/bookStatuses',(req,res,next)=>{
  BookStatuses.findAll()
    .then((statuses)=>res.status(200).json(statuses))
    .catch((err)=>next(err))
});
app.listen('3030',()=>{
  console.log('Server started on port 3030');
});
