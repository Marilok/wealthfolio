
create table platforms (
id bigint primary key generated always as identity,
name text not null,
url text not null,
icon text not null
);

create table accounts (
id bigint primary key generated always as identity,
name text not null,
platform_id integer not null references platforms,
notes text
);

create table account_balances (
id bigint primary key generated always as identity,
account_id integer not null references accounts(id),
currency varchar(3) not null,
balance numeric(10,2) not null
);

create table transactions (
id bigint primary key generated always as identity,
symbol text not null references assets(symbol),
type text not null,
date timestamp with time zone not null,
quantity bigint not null,
unit_price numeric(10,2) not null,
fee numeric(10,2) not null,
currency varchar(3) not null,
account_id integer not null references accounts(id),
notes text
);

