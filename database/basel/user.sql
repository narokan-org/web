    DROP TABLE IF EXISTS [dbo].[User];

    CREATE TABLE [dbo].[User] (
        Id UNIQUEIDENTIFIER NOT NULL UNIQUE,
        Email VARCHAR(255) NOT NULL,
        Onboarded BIT NOT NULL DEFAULT 0
    );