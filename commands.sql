CREATE TABLE blogs (
    id SERIAL PRIMARY KEY UNIQUE,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes INT DEFAULT 0
);

insert into blogs (author, url, title, likes) values ('Kalle', 'www.kalle.fi', 'Kallen seikkailut', 4);
insert into blogs (author, url, title, likes) values ('Maija', 'www.maija.fi', 'Maijan seikkailut', 2);