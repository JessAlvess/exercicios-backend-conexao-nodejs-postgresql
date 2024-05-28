
CREATE TABLE autores (
  id serial primary key,
  nome varchar(255) not null,
  idade int
);

CREATE TABLE livros (
  id serial primary key,
  nome varchar(255) not null,
  genero varchar(255),
  editora varchar(255),
  data DATE,
  autor_id int references autores(id)
);