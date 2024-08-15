DROP TABLE IF EXISTS [dbo].[UserCompanyRelationship];

CREATE TABLE [dbo].[UserCompanyRelationship] (
    UserId UNIQUEIDENTIFIER NOT NULL,
    CompanyId INT NOT NULL,
    Role NVARCHAR(50) NOT NULL,
    PRIMARY KEY (UserId, CompanyId),
    FOREIGN KEY (UserId) REFERENCES [dbo].[User](Id),
    FOREIGN KEY (CompanyId) REFERENCES [dbo].[Company](Id)
);