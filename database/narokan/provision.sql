DROP TABLE IF EXISTS [dbo].[Company];
DROP TABLE IF EXISTS [dbo].[UserCompanyRelationship];
DROP TABLE IF EXISTS [dbo].[CompanyRiskCategory];
DROP TABLE IF EXISTS [dbo].[Risk];
DROP TABLE IF EXISTS [dbo].[RiskOwners];
DROP TABLE IF EXISTS [dbo].[UserSurveyAnswer];
DROP TABLE IF EXISTS [dbo].[Assessment];
DROP TABLE IF EXISTS [dbo].[RiskAssessment];
DROP TABLE IF EXISTS [dbo].[LikelihoodOption];
DROP TABLE IF EXISTS [dbo].[ImpactOption];
DROP TABLE IF EXISTS [dbo].[ResponseOption];
DROP TABLE IF EXISTS [dbo].[Region];

--- Tables ---
CREATE TABLE [dbo].[Region] (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(50) NOT NULL
);

CREATE TABLE [dbo].[LikelihoodOption] (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(50) NOT NULL,
    Value INT NOT NULL
);

CREATE TABLE [dbo].[ImpactOption] (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(50) NOT NULL,
    Value INT NOT NULL
);

CREATE TABLE [dbo].[ResponseOption] (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(50) NOT NULL
);

CREATE TABLE [dbo].[Company] (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(16) NOT NULL,
    CreatedDate DATETIME DEFAULT GETDATE() NOT NULL,
    CreatedByUser UNIQUEIDENTIFIER NOT NULL,
    ParentCompanyId INT NULL,
    FOREIGN KEY (ParentCompanyId) REFERENCES [dbo].[Company](Id),
    RegionId INT NOT NULL,
    FOREIGN KEY (RegionId) REFERENCES [dbo].[Region](Id)
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
    LikelihoodOptionId INT NOT NULL,
    FOREIGN KEY (LikelihoodOptionId) REFERENCES [dbo].[LikelihoodOption](Id),
    ImpactOptionId INT NOT NULL,
    FOREIGN KEY (ImpactOptionId) REFERENCES [dbo].[ImpactOption](Id),
    ResponseOptionId INT NOT NULL,
    FOREIGN KEY (ResponseOptionId) REFERENCES [dbo].[ResponseOption](Id),
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

GO
CREATE PROCEDURE [dbo].[InsertDefaultLikelihoodOptions]
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO [dbo].[LikelihoodOption] (Name, Value)
    VALUES
        ('Rare', 1),
        ('Low', 2),
        ('Medium', 3),
        ('High', 4);
END;

GO
CREATE PROCEDURE [dbo].[InsertDefaultImpactOptions]
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO [dbo].[ImpactOption] (Name, Value)
    VALUES
        ('Low', 1),
        ('Moderate', 2),
        ('Major', 3),
        ('Extreme', 4);
END;

GO
CREATE PROCEDURE [dbo].[InsertDefaultResponseOptions]
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO [dbo].[ResponseOption] (Name)
    VALUES
        ('Accept'),
        ('Moderate'),
        ('Major'),
        ('Extreme');
END;

GO
CREATE PROCEDURE [dbo].[InsertDefaultRegions]
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO [dbo].[Region] (Name)
    VALUES
        ('United States'),
        ('Europe'),
END;

EXEC [dbo].[InsertDefaultCompanyRiskCategories] @CompanyId = 1;
EXEC [dbo].[InsertDefaultLikelihoodOptions];
EXEC [dbo].[InsertDefaultImpactOptions];
EXEC [dbo].[InsertDefaultResponseOptions];
EXEC [dbo].[InsertDefaultRegions];
