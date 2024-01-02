create table
deposits (
id bigint primary key generated always as identity,
account_id integer not null references accounts(id),
type text NOT NULL,
currency varchar(3) not null,
amount numeric(10,2) not null,
timestamp timestamp with time zone not null default now()
);
