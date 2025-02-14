const db=require("./database");


const createTable=()=>{
    
    db.run(`Create table if not exists users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        age INTEGER NOT NULL
        )`,(err)=>{
            if(err)
            {
                console.log('Error creating table:',err.message);
            }
            else{
                console.log('Users table created');
            }
            db.close();
        });
}

createTable();