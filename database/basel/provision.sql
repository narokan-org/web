DROP TABLE IF EXISTS [dbo].[Company];

CREATE TABLE [dbo].[Company] (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(16) NOT NULL,
    CreatedDate DATETIME DEFAULT GETDATE() NOT NULL,
    CreatedByUser UNIQUEIDENTIFIER NOT NULL,
    ParentCompanyId INT NULL,
    FOREIGN KEY (ParentCompanyId) REFERENCES [dbo].[Company](Id)
);

DROP TABLE IF EXISTS [dbo].[UserCompanyRelationship];

CREATE TABLE [dbo].[UserCompanyRelationship] (
    UserId UNIQUEIDENTIFIER NOT NULL,
    CompanyId INT NOT NULL,
    Role NVARCHAR(50) NOT NULL,
    PRIMARY KEY (UserId, CompanyId)
);

DROP TABLE IF EXISTS [dbo].[Risk];

CREATE TABLE [dbo].[Risk] (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(1000) NOT NULL,
    Description NVARCHAR(5000) NULL,
    ClonedFromRiskId INT NULL,
    FOREIGN KEY (ClonedFromRiskId) REFERENCES [dbo].[Risk](Id),
    CreatedDate DATETIME DEFAULT GETDATE() NOT NULL,
    CompanyId INT NOT NULL,
    FOREIGN KEY (CompanyId) REFERENCES [dbo].[Company](Id)
)

DROP TABLE IF EXISTS [dbo].[CompanyRiskCategory];

CREATE TABLE [dbo].[CompanyRiskCategory] (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    CompanyId INT NOT NULL,
    CategoryName NVARCHAR(100) NOT NULL,
    FOREIGN KEY (CompanyId) REFERENCES [dbo].[Company](Id)
);

CREATE PROCEDURE [dbo].[InsertDefaultCompanyRiskCategories]
    @CompanyId INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO [dbo].[CompanyRiskCategory] (CompanyId, CategoryName)
    VALUES
        (@CompanyId, 'Process'),
        (@CompanyId, 'People'),
        (@CompanyId, 'System'),
        (@CompanyId, 'External');
END;

DROP TABLE IF EXISTS [dbo].[RiskOwners];

CREATE TABLE [dbo].[RiskOwners] (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    RiskId INT NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    FOREIGN KEY (RISKID) REFERENCES [dbo].[Risk](Id)
);