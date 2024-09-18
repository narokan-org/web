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

EXEC [dbo].[InsertDefaultLikelihoodOptions];
EXEC [dbo].[InsertDefaultImpactOptions];
EXEC [dbo].[InsertDefaultResponseOptions];
EXEC [dbo].[InsertDefaultRegions];
