DROP TABLE IF EXISTS [dbo].[Workspace];

CREATE TABLE [dbo].[Workspace] (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(16) NOT NULL
);