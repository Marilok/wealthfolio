
create table
assets (
id bigint primary key generated always as identity,
symbol text NOT NULL unique,
name text not null,
currency varchar(3) not null,
purchase_price numeric(10,2) not null,
quantity bigint not null
);
