--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE TEAM (
    ID INTEGER PRIMARY KEY,
    NAME VARCHAR(255) NOT NULL,
    HAS_VIDEO BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE PLAYER (
    ID INTEGER PRIMARY KEY,
    NAME VARCHAR(255) NOT NULL,
    TEAM_ID INT NOT NULL,
    FOREIGN KEY (TEAM_ID) REFERENCES TEAM(ID)
);

-- TODO Remove the insert statements below once deployable
INSERT INTO TEAM (NAME) VALUES ('Team 1');
INSERT INTO TEAM (NAME) VALUES ('Team 2');
INSERT INTO TEAM (NAME) VALUES ('Team 3');
INSERT INTO TEAM (NAME) VALUES ('Team 4');
INSERT INTO TEAM (NAME) VALUES ('Team 5');
INSERT INTO TEAM (NAME) VALUES ('Team 6');

INSERT INTO PLAYER (NAME, TEAM_ID) VALUES ('Baldrak', 1);
INSERT INTO PLAYER (NAME, TEAM_ID) VALUES ('DeZoST', 4);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE PLAYER;
DROP TABLE TEAM;
