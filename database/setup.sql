USE myusers;
GO
IF OBJECT_ID('Users', 'U') IS NOT NULL                                            
     DROP TABLE Users;                                                             
GO  
CREATE TABLE Users (                                                              
     id INT IDENTITY(1,1) PRIMARY KEY,                                             
     username VARCHAR(255) NOT NULL UNIQUE,                                        
     email VARCHAR(255) NOT NULL UNIQUE,                                           
     password VARCHAR(255) NOT NULL,                                               
     created_at DATETIME DEFAULT GETDATE(),                                        
     updated_at DATETIME DEFAULT GETDATE()                                         
); 
CREATE INDEX idx_username ON Users(username);                                     
CREATE INDEX idx_email ON Users(email);  
GO
INSERT INTO Users(username, email, password) VALUES( "demo01", "demo01@email.com", "$2b$10$j8rIDqu4NAqpb4warSRaZu/f15hmzIJxeFs2HBDcKIzNy79b7gg3C");
GO