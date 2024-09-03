DROP TABLE IF EXISTS [dbo].[Company];
DROP TABLE IF EXISTS [dbo].[UserCompanyRelationship];
DROP TABLE IF EXISTS [dbo].[CompanyRiskCategory];
DROP TABLE IF EXISTS [dbo].[Risk];
DROP TABLE IF EXISTS [dbo].[RiskOwners];
DROP TABLE IF EXISTS [dbo].[UserSurveyAnswer];
DROP TABLE IF EXISTS [dbo].[Assessment];
DROP TABLE IF EXISTS [dbo].[RiskAssessment];

--- Tables ---
CREATE TABLE [dbo].[Company] (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(16) NOT NULL,
    CreatedDate DATETIME DEFAULT GETDATE() NOT NULL,
    CreatedByUser UNIQUEIDENTIFIER NOT NULL,
    ParentCompanyId INT NULL,
    FOREIGN KEY (ParentCompanyId) REFERENCES [dbo].[Company](Id)
);

CREATE TABLE [dbo].[UserCompanyRelationship] (
    UserId UNIQUEIDENTIFIER NOT NULL,
    CompanyId INT NOT NULL,
    Role NVARCHAR(50) NOT NULL,
    CreatedDate DATETIME DEFAULT GETDATE() NOT NULL,
    PRIMARY KEY (UserId, CompanyId)
);

CREATE TABLE [dbo].[CompanyRiskCategory] (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    CompanyId INT NOT NULL,
    CategoryName NVARCHAR(100) NOT NULL,
    FOREIGN KEY (CompanyId) REFERENCES [dbo].[Company](Id),
    DateCreated DATETIME DEFAULT GETDATE() NOT NULL
);

CREATE TABLE [dbo].[Risk] (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(1000) NOT NULL,
    Description NVARCHAR(4000) NULL,
    ClonedFromRiskId INT NULL,
    FOREIGN KEY (ClonedFromRiskId) REFERENCES [dbo].[Risk](Id),
    CreatedDate DATETIME DEFAULT GETDATE() NOT NULL,
    CompanyId INT NOT NULL,
    FOREIGN KEY (CompanyId) REFERENCES [dbo].[Company](Id),
    RiskCategoryId INT NOT NULL,
    FOREIGN KEY (RiskCategoryId) REFERENCES [dbo].[CompanyRiskCategory](Id),
)

CREATE TABLE [dbo].[RiskOwners] (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    RiskId INT NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    FOREIGN KEY (RISKID) REFERENCES [dbo].[Risk](Id),
    CreatedDate DATETIME DEFAULT GETDATE() NOT NULL
);

CREATE TABLE [dbo].[UserSurveyAnswer] (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId UNIQUEIDENTIFIER NOT NULL,
    TeamSize NVARCHAR(5) NULL,
    CreatedDate DATETIME DEFAULT GETDATE() NOT NULL,
    CompanyRole NVARCHAR(50) NULL CHECK (CompanyRole IN ('Analyst', 'C-Level', 'Director', 'Manager', 'Specialist', 'Stakeholder', 'Other'))
);

CREATE TABLE [dbo].[Assessment] (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Likelihood INT NOT NULL CHECK (Likelihood IN (1, 2, 3, 4)),
    Impact INT NOT NULL CHECK (Impact IN (1, 2, 3, 4)),
    Response NVARCHAR(50) NULL CHECK (Response IN ('Accept', 'Avoid', 'Mitigate', 'Transfer')),
    Notes NVARCHAR(4000) NULL,
    CreatedDate DATETIME DEFAULT GETDATE() NOT NULL
);

CREATE TABLE [dbo].[RiskAssessment] (
    RiskId INT NOT NULL,
    CreatedDate DATETIME DEFAULT GETDATE() NOT NULL,
    AssessmentId INT NOT NULL,
    PRIMARY KEY (RiskId, AssessmentId),
    FOREIGN KEY (RiskId) REFERENCES [dbo].[Risk](Id),
    FOREIGN KEY (AssessmentId) REFERENCES [dbo].[Assessment](Id)
);


--- Stored Procedures ---
GO
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