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
        ('Europe');
END;

GO
CREATE PROCEDURE [dbo].[SeedE2EData]
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @UserId UNIQUEIDENTIFIER = 'd6f114bd-bb2a-4800-ab19-00e5b3dd03f8'; 
    DECLARE @CompanyId INT;
    DECLARE @RegionId INT;
    DECLARE @RiskCategoryId INT;
    DECLARE @RiskId INT;
    DECLARE @AssessmentId INT;

    SELECT @RegionId = Id FROM [dbo].[Region] WHERE Name = 'United States';

    INSERT INTO [dbo].[Company] (Name, CreatedByUser, RegionId)
    VALUES ('Narokan Demo', @UserId, @RegionId);
    
    SET @CompanyId = SCOPE_IDENTITY();

    INSERT INTO [dbo].[UserCompanyRelationship] (UserId, CompanyId, Role)
    VALUES (@UserId, @CompanyId, 'Admin');

    INSERT INTO [dbo].[CompanyRiskCategory] (CompanyId, CategoryName)
    VALUES
        (@CompanyId, 'Financial'),
        (@CompanyId, 'Operational'),
        (@CompanyId, 'Cybersecurity'),
        (@CompanyId, 'Compliance'),
        (@CompanyId, 'Environmental');

    SELECT @RiskCategoryId = Id FROM [dbo].[CompanyRiskCategory] 
    WHERE CompanyId = @CompanyId AND CategoryName = 'Financial';

    INSERT INTO [dbo].[Risk] (Title, Description, CompanyId, RiskCategoryId)
    VALUES ('Market Volatility', 'Fluctuations in market conditions affecting profitability', @CompanyId, @RiskCategoryId);
    
    SET @RiskId = SCOPE_IDENTITY();

    INSERT INTO [dbo].[RiskOwners] (RiskId, UserId)
    VALUES (@RiskId, @UserId);

    DECLARE @LikelihoodOptionId INT, @ImpactOptionId INT, @ResponseOptionId INT;

    SELECT TOP 1 @LikelihoodOptionId = Id FROM [dbo].[LikelihoodOption] WHERE Name = 'Low';
    SELECT TOP 1 @ImpactOptionId = Id FROM [dbo].[ImpactOption] WHERE Name = 'Major';
    SELECT TOP 1 @ResponseOptionId = Id FROM [dbo].[ResponseOption] WHERE Name = 'Moderate';

    INSERT INTO [dbo].[Assessment] (LikelihoodOptionId, ImpactOptionId, ResponseOptionId, Notes)
    VALUES (@LikelihoodOptionId, @ImpactOptionId, @ResponseOptionId, 'Implement hedging strategies');
    
    SET @AssessmentId = SCOPE_IDENTITY();

    INSERT INTO [dbo].[RiskAssessment] (RiskId, AssessmentId)
    VALUES (@RiskId, @AssessmentId);
END;

EXEC [dbo].[InsertDefaultLikelihoodOptions];
EXEC [dbo].[InsertDefaultImpactOptions];
EXEC [dbo].[InsertDefaultResponseOptions];
EXEC [dbo].[InsertDefaultRegions];