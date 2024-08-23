DROP TABLE IF EXISTS [dbo].[Company];

CREATE TABLE [dbo].[Company] (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(16) NOT NULL,
    CreatedDate DATETIME DEFAULT GETDATE() NOT NULL,
    CreatedByUser UNIQUEIDENTIFIER NOT NULL
);

DROP TABLE IF EXISTS [dbo].[UserCompanyRelationship];

CREATE TABLE [dbo].[UserCompanyRelationship] (
    UserId UNIQUEIDENTIFIER NOT NULL,
    CompanyId INT NOT NULL,
    Role NVARCHAR(50) NOT NULL,
    PRIMARY KEY (UserId, CompanyId)
);