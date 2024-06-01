--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE VOTE(
    ID INTEGER PRIMARY KEY,
    WOOL INT NOT NULL CHECK (WOOL IN (1, 2, 3, 4, 5, 6)),
    PLAYER_ID INT NOT NULL,
    TEAM_ID INT NOT NULL,
    IS_JURY BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (TEAM_ID) REFERENCES TEAM(ID),
    FOREIGN KEY (PLAYER_ID) REFERENCES PLAYER(ID),
    CONSTRAINT unique_vote_per_player_per_team UNIQUE (PLAYER_ID, TEAM_ID)
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE VOTE;