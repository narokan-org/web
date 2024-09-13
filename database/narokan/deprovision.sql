DECLARE @sql NVARCHAR(MAX) = N'';
SELECT @sql += 'ALTER TABLE ' + QUOTENAME(OBJECT_SCHEMA_NAME(parent_object_id)) + '.' + QUOTENAME(OBJECT_NAME(parent_object_id)) + ' DROP CONSTRAINT ' + QUOTENAME(name) + ';'
FROM sys.foreign_keys;
EXEC sp_executesql @sql;

IF OBJECT_ID('dbo.RiskAssessment', 'U') IS NOT NULL
    DROP TABLE dbo.RiskAssessment;

IF OBJECT_ID('dbo.Assessment', 'U') IS NOT NULL
    DROP TABLE dbo.Assessment;

IF OBJECT_ID('dbo.UserSurveyAnswer', 'U') IS NOT NULL
    DROP TABLE dbo.UserSurveyAnswer;

IF OBJECT_ID('dbo.Risk', 'U') IS NOT NULL
    DROP TABLE dbo.Risk;

IF OBJECT_ID('dbo.UserCompanyRelationship', 'U') IS NOT NULL
    DROP TABLE dbo.UserCompanyRelationship;

IF OBJECT_ID('dbo.Company', 'U') IS NOT NULL
    DROP TABLE dbo.Company;

IF OBJECT_ID('dbo.LikelihoodOption', 'U') IS NOT NULL
    DROP TABLE dbo.LikelihoodOption;

IF OBJECT_ID('dbo.ImpactOption', 'U') IS NOT NULL
    DROP TABLE dbo.ImpactOption;

IF OBJECT_ID('dbo.ResponseOption', 'U') IS NOT NULL
    DROP TABLE dbo.ResponseOption;

IF OBJECT_ID('dbo.RiskOwners', 'U') IS NOT NULL
    DROP TABLE dbo.RiskOwners;

IF OBJECT_ID('dbo.CompanyRiskCategory', 'U') IS NOT NULL
    DROP TABLE dbo.CompanyRiskCategory;

IF OBJECT_ID('dbo.InsertDefaultCompanyRiskCategories', 'P') IS NOT NULL
    DROP PROCEDURE dbo.InsertDefaultCompanyRiskCategories;

IF OBJECT_ID('dbo.InsertDefaultLikelihoodOptions', 'P') IS NOT NULL
    DROP PROCEDURE dbo.InsertDefaultLikelihoodOptions;

IF OBJECT_ID('dbo.InsertDefaultImpactOptions', 'P') IS NOT NULL
    DROP PROCEDURE dbo.InsertDefaultImpactOptions;

IF OBJECT_ID('dbo.InsertDefaultResponseOptions', 'P') IS NOT NULL
    DROP PROCEDURE dbo.InsertDefaultResponseOptions;
