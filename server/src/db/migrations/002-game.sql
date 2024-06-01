--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE GAME(
    ID INTEGER PRIMARY KEY DEFAULT 1,
    IS_STARTED BOOLEAN NOT NULL,
    IS_FINISHED BOOLEAN NOT NULL,
    IS_PAUSED BOOLEAN NOT NULL,
    SECONDS_REMAINING INT NOT NULL,
    WAITING_SENTENCE VARCHAR(255) NOT NULL,
    CURRENT_TEAM_ID INT,
    FOREIGN KEY (CURRENT_TEAM_ID) REFERENCES TEAM(ID)
    CONSTRAINT CK_GAME_LOCKED CHECK (ID = 1)
);

INSERT INTO GAME (IS_STARTED, IS_FINISHED, IS_PAUSED, SECONDS_REMAINING, WAITING_SENTENCE) VALUES (FALSE, FALSE, FALSE, 0, '');

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE GAME;