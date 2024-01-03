CREATE TABLE Admins (
    ID INT PRIMARY KEY,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(100) NOT NULL
);

CREATE TABLE Suppliers (
    SupplierID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    ContactEmail VARCHAR(100) NOT NULL UNIQUE,
    Address VARCHAR(200) NOT NULL,
    Phone VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Description VARCHAR(300) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    StockQuantity INT NOT NULL,
    SupplierID INT NOT NULL,
    FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID)
);

CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(100) NOT NULL,
    Address VARCHAR(200) NOT NULL,
    Phone VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    CustomerID INT NOT NULL,
    OrderDate DATE NOT NULL,
    Status VARCHAR(50) NOT NULL,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

CREATE TABLE OrderDetails (
    OrderDetailID INT PRIMARY KEY,
    OrderID INT NOT NULL,
    ProductID INT NOT NULL,
    Quantity INT NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

CREATE SEQUENCE admin_seq
START WITH 1
INCREMENT BY 1
NOMAXVALUE;

CREATE OR REPLACE TRIGGER admin_bi
BEFORE INSERT ON Admins
FOR EACH ROW
BEGIN
    SELECT admin_seq.NEXTVAL
    INTO :new.ID
    FROM dual;
END;
/

CREATE SEQUENCE supplier_seq
START WITH 1
INCREMENT BY 1
NOMAXVALUE;

CREATE OR REPLACE TRIGGER supplier_bi
BEFORE INSERT ON Suppliers
FOR EACH ROW
BEGIN
    SELECT supplier_seq.NEXTVAL
    INTO :new.SupplierID
    FROM dual;
END;
/

CREATE SEQUENCE product_seq
START WITH 1
INCREMENT BY 1
NOMAXVALUE;

CREATE OR REPLACE TRIGGER product_bi
BEFORE INSERT ON Products
FOR EACH ROW
BEGIN
    SELECT product_seq.NEXTVAL
    INTO :new.ProductID
    FROM dual;
END;
/

CREATE SEQUENCE customer_seq
START WITH 1
INCREMENT BY 1
NOMAXVALUE;

CREATE OR REPLACE TRIGGER customer_bi
BEFORE INSERT ON Customers
FOR EACH ROW
BEGIN
    SELECT customer_seq.NEXTVAL
    INTO :new.CustomerID
    FROM dual;
END;
/

CREATE SEQUENCE order_seq
START WITH 1
INCREMENT BY 1
NOMAXVALUE;

CREATE OR REPLACE TRIGGER order_bi
BEFORE INSERT ON Orders
FOR EACH ROW
BEGIN
    SELECT order_seq.NEXTVAL
    INTO :new.OrderID
    FROM dual;
END;
/

CREATE SEQUENCE orderdetail_seq
START WITH 1
INCREMENT BY 1
NOMAXVALUE;

CREATE OR REPLACE TRIGGER orderdetail_bi
BEFORE INSERT ON OrderDetails
FOR EACH ROW
BEGIN
    SELECT orderdetail_seq.NEXTVAL
    INTO :new.OrderDetailID
    FROM dual;
END;
/