

const express=require('express');
const bodyParser=require('body-parser')
const Sequelize = require('sequelize')
const mysql=require('mysql2');
const cors = require('cors');
const nodemailer = require("nodemailer");
const Op = Sequelize.Op;
const sequelize = new Sequelize('libraryapp', 'root', '', {
  dialect : 'mysql',
  port:3336,
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
app.use(bodyParser.json({limit:'100mb'}));

//EMAIL PART
const transport = {
  service:'gmail',
  auth: {
    user: 'ramorra30@gmail.com',
    pass: 'Umbrella25**'
  },
  tls: {
    rejectUnauthorized: false
  }
};

let transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

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

const Notifications=sequelize.define('notification',{
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

const UserHistory=sequelize.define('userHistory',{
  startDate:{
    type:Sequelize.DATEONLY,
  },
  endDate:{
    type:Sequelize.DATEONLY
  },
  comment:{
    type:Sequelize.STRING
  },
  paymentExtra:{
    type:Sequelize.INTEGER
  }
})

const RentedBooks=sequelize.define('rentedBook',{
  startDate:{
    type:Sequelize.DATEONLY
  },
  endDate:{
    type:Sequelize.DATEONLY
  },
  bookCopyId:{
    type:Sequelize.INTEGER
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

User.hasMany(Notifications);
Notifications.belongsTo(User);

Books.hasMany(Notifications);
Notifications.belongsTo(Books);

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

User.hasMany(UserHistory);
UserHistory.belongsTo(User);

BookCopies.hasMany(UserHistory);
UserHistory.belongsTo(BookCopies);

librarians.hasMany(RentedBooks);
RentedBooks.belongsTo(librarians);

User.hasMany(ReservedBooks);
ReservedBooks.belongsTo(User);

BookCopies.hasMany(ReservedBooks);
ReservedBooks.belongsTo(BookCopies);

BookCopies.hasMany(RentedBooks);
RentedBooks.belongsTo(BookCopies);

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


app.get('/reservedTypes',(req,res,next)=>{
  ReservedTypes.findAll()
    .then((types)=>res.status(200).json(types))
    .catch((err)=>next(err))
});
app.post('/bookCopies',(req,res,next)=>{
  const copies=req.body;
  console.log(req.body);
  copies.forEach((copy)=>{
    try{
      BookCopies.create(copy)
        .then(()=>res.status(201).send({message:'Copy created'}));
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

app.post('/notifications',(req,res,next)=>{
  Notifications.create(req.body)
    .then((result)=>res.status(201).json(result))
    .catch((err)=>next(err))
})

app.post('/getnotifications',(req,res,next)=>{
  Notifications.findAll({where:{UserId:req.body.id,bookId:req.body.bookId}})
    .then((notifications)=>res.status(200).json(notifications))
    .catch((err)=>next(err))
})

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
  BookCopies.findAll({where:{LibraryId:req.params.id},include:[{model:Books,include:[{model:Authors}]}]})
    .then((books)=>{
      let officialBooks=[];
      books.forEach((b)=>{
        Books.findByPk(b.bookId,{include:[{
          model:Categories
        },
          {
            model:PublishingHouses
          },
          {
            model:BookCopies
          },
            {model:Authors}
        ]}).then((boook)=>{
          officialBooks.push(boook);
          // res.status(200).json(officialBooks);
        })
      });
      setTimeout(()=>{res.status(200).json(officialBooks)},3000);
    })
    .catch((err)=>next(err))
});

app.get('/booksByLibraryAvailable/:id',(req,res,next)=>{
  BookCopies.findAll({where:{LibraryId:req.params.id,bookStatusId:1},include:[{model:Books,include:[{model:Authors}]}]})
    .then((books)=>{
      let officialBooks=[];
      books.forEach((b)=>{
        Books.findByPk(b.bookId,{include:[{
            model:Categories
          },
            {
              model:PublishingHouses
            },
            {
              model:BookCopies
            },
            {model:Authors}
          ]}).then((boook)=>{
          officialBooks.push(boook);
          // res.status(200).json(officialBooks);
        })
      });
      setTimeout(()=>{res.status(200).json(officialBooks)},3000);
    })
    .catch((err)=>next(err))
});

app.get('/copies/:id',(req,res,next)=>{
  BookCopies.findAll({where:{bookId:req.params.id, [Op.or]: [{bookStatusId: 1}, {bookStatusId: 2}]},include:[{model:Libraries}]})
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

app.post('/bookit',(req,res,next)=>{
  ReservedBooks.create(req.body)
    .then((success)=>{
      BookCopies.update({bookStatusId:3},{where:{id:req.body.bookCopyId}})
        .then((success)=>res.status(201).send('Your copy is booked'))
    })
    .catch((err)=>{
      next(err);
    })
});

app.post('/rents',(req,res,next)=>{
  RentedBooks.create(req.body)
    .then((success)=>{
      BookCopies.update({bookStatusId:4},{where:{id:req.body.bookCopyId}})
        .then((success)=>res.status(201).send({message:'Your copy is rented!'}))
    })
    .catch((err)=>{
      next(err);
    })
});

app.get('/rents/:id',(req,res,next)=>{
  RentedBooks.findAll({include:
      [{model:User},
        {model:librarians,where:{id:{[Op.ne]:2}}},
        {model:BookCopies,where:{LibraryId:req.params.id},include:[{model:Books},{model:BookStatuses},{model:Libraries}]}]})
    .then((rents)=>res.status(200).json(rents))
    .catch((err)=>next(err))
})

app.get('/rentsbyusers/:id',(req,res,next)=>{
  RentedBooks.findAll({include:
      [{model:User},
        {model:librarians,where:{id:{[Op.between]:[2,522]}}},
        {model:BookCopies,where:{LibraryId:req.params.id},include:[{model:Books},{model:BookStatuses},{model:Libraries}]}]})
    .then((rents)=>res.status(200).json(rents))
    .catch((err)=>next(err))
})

app.post('/updateProfile/:id',(req,res,next)=>{
  User.update({email:req.body.email,address:req.body.address},{where:{id:req.params.id}})
    .then(()=>res.status(203).json({message:'User updated'}))
    .catch((err)=>next(err))
})

app.post('/returnBook',(req,res,next)=>{
  RentedBooks.destroy({where:{id:req.body.rentedBook.id}})
    .then((succes)=>{
      BookCopies.update({bookStatusId:1},{where:{id:req.body.rentedBook.bookCopyId}})
        .then(()=>{
          const userHistory={
            startDate:req.body.rentedBook.startDate,
            endDate:req.body.rentedBook.endDate,
            paymentExtra: req.body.rentedBook.paymentExtra,
            comment: req.body.rentedBook.comment,
            UserId:req.body.rentedBook.UserId,
            bookCopyId:req.body.rentedBook.bookCopyId
          };
          UserHistory.create(userHistory)
            .then((success)=>{
             Notifications.findAll({where:{UserId:req.body.rentedBook.UserId,bookId:req.body.rentedBook.bookId}})
               .then((notifs)=>{
                 if(notifs.length>0){
                   let name = 'Notification: book is back!';
                   let email = 'Biblioteque@gmail.com';
                   let message = req.body.message;
                   let content = `name: ${name} \n email: ${email} \n message: ${message} `;

                   let mail = {
                     from: name,
                     to: 'nimesniciucramona15@stud.ase.ro',
                     subject: 'Book is back!',
                     text: content,
                     html:`<h1 style="letter-spacing: 3px;font-family: 'Dancing Script', cursive;">Book ${req.body.Book.title} is back in ${req.body.Library.name}</h1>
<h2 style="letter-spacing: 3px;font-family: 'Dancing Script', cursive;">Intra in contul tau sau vino in biblioteca pentru a lua cartea acasa!</h2>
<img src="http://www.annpurnattcollege.com/Uploads/fileupload/391books-1-1024x417.jpg">`
                   };
                   transporter.sendMail(mail, (err, data) => {
                     if (err) {
                       res.json({
                         msg: 'fail'
                       })
                     } else {
                       Notifications.destroy({where:{UserId:req.body.rentedBook.UserId,bookId:req.body.rentedBook.bookId}})
                         .then((success)=>{
                           res.status(201).json({message:'Book returned!Check user history!'})
                         })
                         .catch((err)=>next(err))
                     }
                   });
                   res.status(201).json({message:'Book returned!Check user history!'})
                 }
               })
               .catch((err)=>{
                 next(err);
               })
            })
          .catch((err)=>next(err))

            })
            .catch((err)=>next(err))
        })
    //     .catch((err)=>next(err))
    // })
    // .catch((err)=>next(err))

});


app.get('/rents-history',(req,res,next)=>{
  UserHistory.findAll()
    .then((rents)=>res.status(200).json(rents))
    .catch((err)=>next(err))
})

app.get('/rents-history/:id',(req,res,next)=>{
  UserHistory.findAll({where:{UserId:req.params.id},include:[{model:BookCopies,include:[{model:Books}]}]})
    .then((rents)=>res.status(200).json(rents))
    .catch((err)=>next(err))
})



app.get('/users',(req,res,next)=>{
  User.findAll()
    .then((users)=>res.status(200).json(users))
    .catch((Err)=>next(Err))
})
app.get('/users/:id',(req,res,next)=>{
  User.findByPk(req.params.id)
    .then((user)=>res.status(200).json(user))
    .catch((Err)=>next(Err))
})



app.listen('3030',()=>{
  console.log('Server started on port 3030');
});
