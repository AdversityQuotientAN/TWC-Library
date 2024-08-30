Overview
========

A virtual library where you can register as either a librarian or a customer.

Customers can only view and checkout books
Librarians can view, add, return, edit, and delete books

Frameworks: React (frontend), ASP.NET 8 Web API (backend)


Setup
=====

Programs: Visual Studio Code, Visual Studio 2022 Community, Microsoft SQL Server Express

Install Microsoft SQL Server Express: https://www.microsoft.com/en-us/sql-server/sql-server-downloads
- Basic installation

Install SSMS: https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16
- Simply click 'Install'

Clone the project with the 'api' ASP.NET Web API backend and the 'client' React frontend

While in the 'api' directory, run the following commands to migrate the database:
- dotnet ef migrations add [AnyTitleHere]
- dotnet ef database update

There should now be a 'library' database with the seeded roles and books


In the appsettings.json file, edit the following element:

```
"ConnectionStrings": {
    "DefaultConnection": "Data Source=LAPTOP-Q2C4CJLG\\SQLEXPRESS;Initial Catalog=library;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False"
  },
```

Where it says 'LAPTOP-Q2C4CJLG', update it with the name of your device
You can find the name of your device by:
- Right-clicking on the 'library' database in SSMS
- 'Properties'
- And then copy over the value for 'Owner' before the backslash ('\')


Running
=======

To run the ASP.NET backend, `cd` into the 'api' directory and run `dotnet watch run`
To run the React frontend, `cd` into the 'client directory an run `npm run dev`
