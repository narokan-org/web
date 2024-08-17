DROP TABLE IF EXISTS [dbo].[User];

CREATE TABLE [dbo].[User] (
    Id UNIQUEIDENTIFIER NOT NULL UNIQUE,
    Email VARCHAR(255) NOT NULL,
    Onboarded BIT NOT NULL DEFAULT 0
);

DROP TABLE IF EXISTS [dbo].[Company];

CREATE TABLE [dbo].[Company] (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(16) NOT NULL,
    CreatedDate DATETIME DEFAULT GETDATE() NOT NULL,
    CreatedByUser_FK UNIQUEIDENTIFIER NOT NULL,
    FOREIGN KEY (CreatedByUser_FK) REFERENCES [dbo].[User](Id)
);

DROP TABLE IF EXISTS [dbo].[UserCompanyRelationship];

CREATE TABLE [dbo].[UserCompanyRelationship] (
    UserId UNIQUEIDENTIFIER NOT NULL,
    CompanyId INT NOT NULL,
    Role NVARCHAR(50) NOT NULL,
    PRIMARY KEY (UserId, CompanyId),
    FOREIGN KEY (UserId) REFERENCES [dbo].[User](Id),
    FOREIGN KEY (CompanyId) REFERENCES [dbo].[Company](Id)
);