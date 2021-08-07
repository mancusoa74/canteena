CREATE TABLE IF NOT EXISTS `anagrafica` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `tid` INTEGER, `Cognome` VARCHAR(64), `Nome` VARCHAR(64), `NomeClasse` VARCHAR(64), `Credenziali` INTEGER, `daservire` TINYINT(1));
CREATE TABLE IF NOT EXISTS `prenotazioni` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `IDAnagrafica` INTEGER, `IDMetodo` INTEGER, `OraConsumazione` TEXT);

INSERT INTO anagrafica(tid,Nome,Cognome,NomeClasse,Credenziali, daservire) VALUES(10,"APETROAIE", "Antonio","3 INFORMATICA", 0, 0);
INSERT INTO anagrafica(tid,Nome,Cognome,NomeClasse,Credenziali, daservire) VALUES(20,"GARABELLO", "Marco","3 INFORMATICA", 0, 0);
INSERT INTO anagrafica(tid,Nome,Cognome,NomeClasse,Credenziali, daservire) VALUES(30,"SOLAVAGIONE", "Matteo","3 INFORMATICA", 0, 0);
INSERT INTO anagrafica(tid,Nome,Cognome,NomeClasse,Credenziali, daservire) VALUES(40,"BORTOLUZZI", "Luca","3 INFORMATICA", 0, 0);
INSERT INTO anagrafica(tid,Nome,Cognome,NomeClasse,Credenziali, daservire) VALUES(50,"CHINDRIS", "Aleyandru Ioan","3 INFORMATICA", 0, 0);
INSERT INTO anagrafica(tid,Nome,Cognome,NomeClasse,Credenziali, daservire) VALUES(60,"DETTOLI", "Daniel","3 INFORMATICA", 0, 0);
INSERT INTO anagrafica(tid,Nome,Cognome,NomeClasse,Credenziali, daservire) VALUES(70,"QUIJADA GOMEZ", "Pierpaolo","3 INFORMATICA", 0, 0);
INSERT INTO anagrafica(tid,Nome,Cognome,NomeClasse,Credenziali, daservire) VALUES(80,"RUGGIERI", "Dario","3 INFORMATICA", 0, 0);
INSERT INTO anagrafica(tid,Nome,Cognome,NomeClasse,Credenziali, daservire) VALUES(90,"SCIANNIMANICA", "Cristian","3 INFORMATICA", 0, 0);
INSERT INTO anagrafica(tid,Nome,Cognome,NomeClasse,Credenziali, daservire) VALUES(100,"SIRACUSA", "Michele","3 INFORMATICA", 0, 0);
INSERT INTO anagrafica(tid,Nome,Cognome,NomeClasse,Credenziali, daservire) VALUES(110,"SOLA", "Matteo","3 INFORMATICA", 0, 0);
INSERT INTO anagrafica(tid,Nome,Cognome,NomeClasse,Credenziali, daservire) VALUES(120,"VITERITTI", "William","3 INFORMATICA", 0, 0);
INSERT INTO anagrafica(tid,Nome,Cognome,NomeClasse,Credenziali, daservire) VALUES(130,"ZAINA", "Francesco","3 INFORMATICA", 0, 0);
INSERT INTO anagrafica(tid,Nome,Cognome,NomeClasse,Credenziali, daservire) VALUES(140,"LAUDANI", "Simone","3 INFORMATICA", 0, 0);
INSERT INTO anagrafica(tid,Nome,Cognome,NomeClasse,Credenziali, daservire) VALUES(150,"POMBA", "Federico Carlo Giuseppe","3 INFORMATICA", 0, 0);
INSERT INTO anagrafica(tid,Nome,Cognome,NomeClasse,Credenziali, daservire) VALUES(160,"LURGO", "Giacomo","3 INFORMATICA", 0, 0);


