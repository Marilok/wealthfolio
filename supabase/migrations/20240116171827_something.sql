drop table "public"."account_balances" CASCADE;
drop table "public"."assets" CASCADE;
drop table "public"."deposits" CASCADE;
drop table "public"."transactions" CASCADE;
drop table "public"."platforms" CASCADE;
drop table "public"."accounts" CASCADE;



create type "public"."account_deposit_type" as enum ('withdraw', 'deposit');

create type "public"."currency" as enum ('CZK', 'EUR', 'USD');

create type "public"."transaction_type" as enum ('BUY', 'SELL');

create table "public"."account_balances" (
    "id" bigint generated by default as identity not null,
    "account_id" bigint not null,
    "balance" numeric not null,
    "currency" currency not null
);


create table "public"."account_deposits" (
    "id" bigint generated by default as identity not null,
    "account_id" bigint not null,
    "created_at" timestamp with time zone not null default now(),
    "type" account_deposit_type not null,
    "amount" numeric not null,
    "currency" currency not null,
    "notes" text
);


create table "public"."account_transfers" (
    "id" bigint generated by default as identity not null,
    "from" bigint,
    "to" bigint,
    "amount" numeric not null,
    "currency" currency not null,
    "created_at" timestamp with time zone not null default now()
);


create table "public"."accounts" (
    "id" bigint generated by default as identity not null,
    "user_id" uuid default auth.uid(),
    "name" text not null,
    "created_at" timestamp with time zone not null default now(),
    "platform_id" bigint,
    "notes" text,
    "transactions" bigint not null default '0'::bigint
);


create table "public"."bond_interests" (
    "id" bigint generated by default as identity not null,
    "bond_id" bigint not null,
    "account_id" bigint not null,
    "quantity" numeric not null,
    "unit_price" numeric not null,
    "fee" numeric not null,
    "isReinvested" boolean not null,
    "notes" text,
    "date" date not null
);


create table "public"."bond_transactions" (
    "id" bigint generated by default as identity not null,
    "bond_id" bigint not null,
    "type" text not null,
    "date" date not null,
    "quantity" numeric not null,
    "unit_price" numeric not null,
    "fee" numeric not null,
    "notes" text
);


create table "public"."bonds" (
    "id" bigint generated by default as identity not null,
    "symbol" text not null,
    "account_id" bigint not null,
    "currency" currency not null,
    "value" numeric not null,
    "notes" text
);


create table "public"."platforms" (
    "id" bigint generated by default as identity not null,
    "name" text not null,
    "url" text,
    "icon" text not null
);


create table "public"."settings" (
    "id" bigint generated by default as identity not null,
    "user_id" uuid not null default auth.uid(),
    "default_currency" currency not null default 'CZK'::currency
);


create table "public"."stock_transactions" (
    "id" bigint generated by default as identity not null,
    "stock_id" bigint not null,
    "type" transaction_type not null default 'BUY'::transaction_type,
    "date" date not null,
    "quantity" numeric not null,
    "unit_price" numeric not null,
    "fee" numeric not null,
    "notes" text
);


create table "public"."stocks" (
    "id" bigint generated by default as identity not null,
    "symbol" text not null,
    "account_id" bigint not null,
    "currency" currency not null,
    "purchase_price" numeric not null,
    "notes" text,
    "quantity" numeric not null
);


create table "public"."transactions" (
    "id" bigint generated by default as identity not null,
    "account_id" bigint not null,
    "currency" currency not null
);


CREATE UNIQUE INDEX account_balances_pkey ON public.account_balances USING btree (id);

CREATE UNIQUE INDEX account_deposits_pkey ON public.account_deposits USING btree (id);

CREATE UNIQUE INDEX account_transfers_pkey ON public.account_transfers USING btree (id);

CREATE UNIQUE INDEX accounts_pkey ON public.accounts USING btree (id);

CREATE UNIQUE INDEX bond_interests_pkey ON public.bond_interests USING btree (id);

CREATE UNIQUE INDEX bond_transactions_pkey ON public.bond_transactions USING btree (id);

CREATE UNIQUE INDEX bonds_pkey ON public.bonds USING btree (id);

CREATE UNIQUE INDEX platforms_name_key ON public.platforms USING btree (name);

CREATE UNIQUE INDEX platforms_pkey ON public.platforms USING btree (id);

CREATE UNIQUE INDEX settings_pkey ON public.settings USING btree (id);

CREATE UNIQUE INDEX settings_user_id_key ON public.settings USING btree (user_id);

CREATE UNIQUE INDEX stock_transactions_pkey ON public.stock_transactions USING btree (id);

CREATE UNIQUE INDEX stocks_pkey ON public.stocks USING btree (id);

CREATE UNIQUE INDEX transactions_pkey ON public.transactions USING btree (id);

alter table "public"."account_balances" add constraint "account_balances_pkey" PRIMARY KEY using index "account_balances_pkey";

alter table "public"."account_deposits" add constraint "account_deposits_pkey" PRIMARY KEY using index "account_deposits_pkey";

alter table "public"."account_transfers" add constraint "account_transfers_pkey" PRIMARY KEY using index "account_transfers_pkey";       

alter table "public"."accounts" add constraint "accounts_pkey" PRIMARY KEY using index "accounts_pkey";

alter table "public"."bond_interests" add constraint "bond_interests_pkey" PRIMARY KEY using index "bond_interests_pkey";

alter table "public"."bond_transactions" add constraint "bond_transactions_pkey" PRIMARY KEY using index "bond_transactions_pkey";       

alter table "public"."bonds" add constraint "bonds_pkey" PRIMARY KEY using index "bonds_pkey";

alter table "public"."platforms" add constraint "platforms_pkey" PRIMARY KEY using index "platforms_pkey";

alter table "public"."settings" add constraint "settings_pkey" PRIMARY KEY using index "settings_pkey";

alter table "public"."stock_transactions" add constraint "stock_transactions_pkey" PRIMARY KEY using index "stock_transactions_pkey";    

alter table "public"."stocks" add constraint "stocks_pkey" PRIMARY KEY using index "stocks_pkey";

alter table "public"."transactions" add constraint "transactions_pkey" PRIMARY KEY using index "transactions_pkey";

alter table "public"."account_balances" add constraint "account_balances_account_id_fkey" FOREIGN KEY (account_id) REFERENCES accounts(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."account_balances" validate constraint "account_balances_account_id_fkey";

alter table "public"."account_deposits" add constraint "account_deposits_account_id_fkey" FOREIGN KEY (account_id) REFERENCES accounts(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."account_deposits" validate constraint "account_deposits_account_id_fkey";

alter table "public"."account_transfers" add constraint "account_transfers_from_fkey" FOREIGN KEY ("from") REFERENCES accounts(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."account_transfers" validate constraint "account_transfers_from_fkey";

alter table "public"."account_transfers" add constraint "account_transfers_to_fkey" FOREIGN KEY ("to") REFERENCES accounts(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."account_transfers" validate constraint "account_transfers_to_fkey";

alter table "public"."accounts" add constraint "accounts_platform_id_fkey" FOREIGN KEY (platform_id) REFERENCES platforms(id) ON DELETE SET NULL not valid;

alter table "public"."accounts" validate constraint "accounts_platform_id_fkey";

alter table "public"."accounts" add constraint "accounts_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."accounts" validate constraint "accounts_user_id_fkey";

alter table "public"."bond_interests" add constraint "bond_interests_account_id_fkey" FOREIGN KEY (account_id) REFERENCES accounts(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."bond_interests" validate constraint "bond_interests_account_id_fkey";

alter table "public"."bond_interests" add constraint "bond_interests_bond_id_fkey" FOREIGN KEY (bond_id) REFERENCES bonds(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."bond_interests" validate constraint "bond_interests_bond_id_fkey";

alter table "public"."bond_transactions" add constraint "bond_transactions_bond_id_fkey" FOREIGN KEY (bond_id) REFERENCES bonds(id) not valid;

alter table "public"."bond_transactions" validate constraint "bond_transactions_bond_id_fkey";

alter table "public"."bonds" add constraint "bonds_account_id_fkey" FOREIGN KEY (account_id) REFERENCES accounts(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."bonds" validate constraint "bonds_account_id_fkey";

alter table "public"."platforms" add constraint "platforms_name_key" UNIQUE using index "platforms_name_key";

alter table "public"."settings" add constraint "settings_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."settings" validate constraint "settings_user_id_fkey";

alter table "public"."settings" add constraint "settings_user_id_key" UNIQUE using index "settings_user_id_key";

alter table "public"."stock_transactions" add constraint "stock_transactions_stock_id_fkey" FOREIGN KEY (stock_id) REFERENCES stocks(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."stock_transactions" validate constraint "stock_transactions_stock_id_fkey";

alter table "public"."stocks" add constraint "stocks_account_id_fkey" FOREIGN KEY (account_id) REFERENCES accounts(id) not valid;        

alter table "public"."stocks" validate constraint "stocks_account_id_fkey";

alter table "public"."transactions" add constraint "transactions_account_id_fkey" FOREIGN KEY (account_id) REFERENCES accounts(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."transactions" validate constraint "transactions_account_id_fkey";

grant delete on table "public"."account_balances" to "anon";

grant insert on table "public"."account_balances" to "anon";

grant references on table "public"."account_balances" to "anon";

grant select on table "public"."account_balances" to "anon";

grant trigger on table "public"."account_balances" to "anon";

grant truncate on table "public"."account_balances" to "anon";

grant update on table "public"."account_balances" to "anon";

grant delete on table "public"."account_balances" to "authenticated";

grant insert on table "public"."account_balances" to "authenticated";

grant references on table "public"."account_balances" to "authenticated";

grant select on table "public"."account_balances" to "authenticated";

grant trigger on table "public"."account_balances" to "authenticated";

grant truncate on table "public"."account_balances" to "authenticated";

grant update on table "public"."account_balances" to "authenticated";

grant delete on table "public"."account_balances" to "service_role";

grant insert on table "public"."account_balances" to "service_role";

grant references on table "public"."account_balances" to "service_role";

grant select on table "public"."account_balances" to "service_role";

grant trigger on table "public"."account_balances" to "service_role";

grant truncate on table "public"."account_balances" to "service_role";

grant update on table "public"."account_balances" to "service_role";

grant delete on table "public"."account_deposits" to "anon";

grant insert on table "public"."account_deposits" to "anon";

grant references on table "public"."account_deposits" to "anon";

grant select on table "public"."account_deposits" to "anon";

grant trigger on table "public"."account_deposits" to "anon";

grant truncate on table "public"."account_deposits" to "anon";

grant update on table "public"."account_deposits" to "anon";

grant delete on table "public"."account_deposits" to "authenticated";

grant insert on table "public"."account_deposits" to "authenticated";

grant references on table "public"."account_deposits" to "authenticated";

grant select on table "public"."account_deposits" to "authenticated";

grant trigger on table "public"."account_deposits" to "authenticated";

grant truncate on table "public"."account_deposits" to "authenticated";

grant update on table "public"."account_deposits" to "authenticated";

grant delete on table "public"."account_deposits" to "service_role";

grant insert on table "public"."account_deposits" to "service_role";

grant references on table "public"."account_deposits" to "service_role";

grant select on table "public"."account_deposits" to "service_role";

grant trigger on table "public"."account_deposits" to "service_role";

grant truncate on table "public"."account_deposits" to "service_role";

grant update on table "public"."account_deposits" to "service_role";

grant delete on table "public"."account_transfers" to "anon";

grant insert on table "public"."account_transfers" to "anon";

grant references on table "public"."account_transfers" to "anon";

grant select on table "public"."account_transfers" to "anon";

grant trigger on table "public"."account_transfers" to "anon";

grant truncate on table "public"."account_transfers" to "anon";

grant update on table "public"."account_transfers" to "anon";

grant delete on table "public"."account_transfers" to "authenticated";

grant insert on table "public"."account_transfers" to "authenticated";

grant references on table "public"."account_transfers" to "authenticated";

grant select on table "public"."account_transfers" to "authenticated";

grant trigger on table "public"."account_transfers" to "authenticated";

grant truncate on table "public"."account_transfers" to "authenticated";

grant update on table "public"."account_transfers" to "authenticated";

grant delete on table "public"."account_transfers" to "service_role";

grant insert on table "public"."account_transfers" to "service_role";

grant references on table "public"."account_transfers" to "service_role";

grant select on table "public"."account_transfers" to "service_role";

grant trigger on table "public"."account_transfers" to "service_role";

grant truncate on table "public"."account_transfers" to "service_role";

grant update on table "public"."account_transfers" to "service_role";

grant delete on table "public"."accounts" to "anon";

grant insert on table "public"."accounts" to "anon";

grant references on table "public"."accounts" to "anon";

grant select on table "public"."accounts" to "anon";

grant trigger on table "public"."accounts" to "anon";

grant truncate on table "public"."accounts" to "anon";

grant update on table "public"."accounts" to "anon";

grant delete on table "public"."accounts" to "authenticated";

grant insert on table "public"."accounts" to "authenticated";

grant references on table "public"."accounts" to "authenticated";

grant select on table "public"."accounts" to "authenticated";

grant trigger on table "public"."accounts" to "authenticated";

grant truncate on table "public"."accounts" to "authenticated";

grant update on table "public"."accounts" to "authenticated";

grant delete on table "public"."accounts" to "service_role";

grant insert on table "public"."accounts" to "service_role";

grant references on table "public"."accounts" to "service_role";

grant select on table "public"."accounts" to "service_role";

grant trigger on table "public"."accounts" to "service_role";

grant truncate on table "public"."accounts" to "service_role";

grant update on table "public"."accounts" to "service_role";

grant delete on table "public"."bond_interests" to "anon";

grant insert on table "public"."bond_interests" to "anon";

grant references on table "public"."bond_interests" to "anon";

grant select on table "public"."bond_interests" to "anon";

grant trigger on table "public"."bond_interests" to "anon";

grant truncate on table "public"."bond_interests" to "anon";

grant update on table "public"."bond_interests" to "anon";

grant delete on table "public"."bond_interests" to "authenticated";

grant insert on table "public"."bond_interests" to "authenticated";

grant references on table "public"."bond_interests" to "authenticated";

grant select on table "public"."bond_interests" to "authenticated";

grant trigger on table "public"."bond_interests" to "authenticated";

grant truncate on table "public"."bond_interests" to "authenticated";

grant update on table "public"."bond_interests" to "authenticated";

grant delete on table "public"."bond_interests" to "service_role";

grant insert on table "public"."bond_interests" to "service_role";

grant references on table "public"."bond_interests" to "service_role";

grant select on table "public"."bond_interests" to "service_role";

grant trigger on table "public"."bond_interests" to "service_role";

grant truncate on table "public"."bond_interests" to "service_role";

grant update on table "public"."bond_interests" to "service_role";

grant delete on table "public"."bond_transactions" to "anon";

grant insert on table "public"."bond_transactions" to "anon";

grant references on table "public"."bond_transactions" to "anon";

grant select on table "public"."bond_transactions" to "anon";

grant trigger on table "public"."bond_transactions" to "anon";

grant truncate on table "public"."bond_transactions" to "anon";

grant update on table "public"."bond_transactions" to "anon";

grant delete on table "public"."bond_transactions" to "authenticated";

grant insert on table "public"."bond_transactions" to "authenticated";

grant references on table "public"."bond_transactions" to "authenticated";

grant select on table "public"."bond_transactions" to "authenticated";

grant trigger on table "public"."bond_transactions" to "authenticated";

grant truncate on table "public"."bond_transactions" to "authenticated";

grant update on table "public"."bond_transactions" to "authenticated";

grant delete on table "public"."bond_transactions" to "service_role";

grant insert on table "public"."bond_transactions" to "service_role";

grant references on table "public"."bond_transactions" to "service_role";

grant select on table "public"."bond_transactions" to "service_role";

grant trigger on table "public"."bond_transactions" to "service_role";

grant truncate on table "public"."bond_transactions" to "service_role";

grant update on table "public"."bond_transactions" to "service_role";

grant delete on table "public"."bonds" to "anon";

grant insert on table "public"."bonds" to "anon";

grant references on table "public"."bonds" to "anon";

grant select on table "public"."bonds" to "anon";

grant trigger on table "public"."bonds" to "anon";

grant truncate on table "public"."bonds" to "anon";

grant update on table "public"."bonds" to "anon";

grant delete on table "public"."bonds" to "authenticated";

grant insert on table "public"."bonds" to "authenticated";

grant references on table "public"."bonds" to "authenticated";

grant select on table "public"."bonds" to "authenticated";

grant trigger on table "public"."bonds" to "authenticated";

grant truncate on table "public"."bonds" to "authenticated";

grant update on table "public"."bonds" to "authenticated";

grant delete on table "public"."bonds" to "service_role";

grant insert on table "public"."bonds" to "service_role";

grant references on table "public"."bonds" to "service_role";

grant select on table "public"."bonds" to "service_role";

grant trigger on table "public"."bonds" to "service_role";

grant truncate on table "public"."bonds" to "service_role";

grant update on table "public"."bonds" to "service_role";

grant delete on table "public"."platforms" to "anon";

grant insert on table "public"."platforms" to "anon";

grant references on table "public"."platforms" to "anon";

grant select on table "public"."platforms" to "anon";

grant trigger on table "public"."platforms" to "anon";

grant truncate on table "public"."platforms" to "anon";

grant update on table "public"."platforms" to "anon";

grant delete on table "public"."platforms" to "authenticated";

grant insert on table "public"."platforms" to "authenticated";

grant references on table "public"."platforms" to "authenticated";

grant select on table "public"."platforms" to "authenticated";

grant trigger on table "public"."platforms" to "authenticated";

grant truncate on table "public"."platforms" to "authenticated";

grant update on table "public"."platforms" to "authenticated";

grant delete on table "public"."platforms" to "service_role";

grant insert on table "public"."platforms" to "service_role";

grant references on table "public"."platforms" to "service_role";

grant select on table "public"."platforms" to "service_role";

grant trigger on table "public"."platforms" to "service_role";

grant truncate on table "public"."platforms" to "service_role";

grant update on table "public"."platforms" to "service_role";

grant delete on table "public"."settings" to "anon";

grant insert on table "public"."settings" to "anon";

grant references on table "public"."settings" to "anon";

grant select on table "public"."settings" to "anon";

grant trigger on table "public"."settings" to "anon";

grant truncate on table "public"."settings" to "anon";

grant update on table "public"."settings" to "anon";

grant delete on table "public"."settings" to "authenticated";

grant insert on table "public"."settings" to "authenticated";

grant references on table "public"."settings" to "authenticated";

grant select on table "public"."settings" to "authenticated";

grant trigger on table "public"."settings" to "authenticated";

grant truncate on table "public"."settings" to "authenticated";

grant update on table "public"."settings" to "authenticated";

grant delete on table "public"."settings" to "service_role";

grant insert on table "public"."settings" to "service_role";

grant references on table "public"."settings" to "service_role";

grant select on table "public"."settings" to "service_role";

grant trigger on table "public"."settings" to "service_role";

grant truncate on table "public"."settings" to "service_role";

grant update on table "public"."settings" to "service_role";

grant delete on table "public"."stock_transactions" to "anon";

grant insert on table "public"."stock_transactions" to "anon";

grant references on table "public"."stock_transactions" to "anon";

grant select on table "public"."stock_transactions" to "anon";

grant trigger on table "public"."stock_transactions" to "anon";

grant truncate on table "public"."stock_transactions" to "anon";

grant update on table "public"."stock_transactions" to "anon";

grant delete on table "public"."stock_transactions" to "authenticated";

grant insert on table "public"."stock_transactions" to "authenticated";

grant references on table "public"."stock_transactions" to "authenticated";

grant select on table "public"."stock_transactions" to "authenticated";

grant trigger on table "public"."stock_transactions" to "authenticated";

grant truncate on table "public"."stock_transactions" to "authenticated";

grant update on table "public"."stock_transactions" to "authenticated";

grant delete on table "public"."stock_transactions" to "service_role";

grant insert on table "public"."stock_transactions" to "service_role";

grant references on table "public"."stock_transactions" to "service_role";

grant select on table "public"."stock_transactions" to "service_role";

grant trigger on table "public"."stock_transactions" to "service_role";

grant truncate on table "public"."stock_transactions" to "service_role";

grant update on table "public"."stock_transactions" to "service_role";

grant delete on table "public"."stocks" to "anon";

grant insert on table "public"."stocks" to "anon";

grant references on table "public"."stocks" to "anon";

grant select on table "public"."stocks" to "anon";

grant trigger on table "public"."stocks" to "anon";

grant truncate on table "public"."stocks" to "anon";

grant update on table "public"."stocks" to "anon";

grant delete on table "public"."stocks" to "authenticated";

grant insert on table "public"."stocks" to "authenticated";

grant references on table "public"."stocks" to "authenticated";

grant select on table "public"."stocks" to "authenticated";

grant trigger on table "public"."stocks" to "authenticated";

grant truncate on table "public"."stocks" to "authenticated";

grant update on table "public"."stocks" to "authenticated";

grant delete on table "public"."stocks" to "service_role";

grant insert on table "public"."stocks" to "service_role";

grant references on table "public"."stocks" to "service_role";

grant select on table "public"."stocks" to "service_role";

grant trigger on table "public"."stocks" to "service_role";

grant truncate on table "public"."stocks" to "service_role";

grant update on table "public"."stocks" to "service_role";

grant delete on table "public"."transactions" to "anon";

grant insert on table "public"."transactions" to "anon";

grant references on table "public"."transactions" to "anon";

grant select on table "public"."transactions" to "anon";

grant trigger on table "public"."transactions" to "anon";

grant truncate on table "public"."transactions" to "anon";

grant update on table "public"."transactions" to "anon";

grant delete on table "public"."transactions" to "authenticated";

grant insert on table "public"."transactions" to "authenticated";

grant references on table "public"."transactions" to "authenticated";

grant select on table "public"."transactions" to "authenticated";

grant trigger on table "public"."transactions" to "authenticated";

grant truncate on table "public"."transactions" to "authenticated";

grant update on table "public"."transactions" to "authenticated";

grant delete on table "public"."transactions" to "service_role";

grant insert on table "public"."transactions" to "service_role";

grant references on table "public"."transactions" to "service_role";

grant select on table "public"."transactions" to "service_role";

grant trigger on table "public"."transactions" to "service_role";

grant truncate on table "public"."transactions" to "service_role";

grant update on table "public"."transactions" to "service_role";