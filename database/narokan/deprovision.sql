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
