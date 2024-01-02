

  insert into public.transactions (symbol, type, date, quantity, unit_price, fee, currency, account_id, notes) values ('CEZ.PR', 'BUY', '2021-01-01', 50, 838, 146.7, 'CZK', 1, '');
    insert into public.transactions (symbol, type, date, quantity, unit_price, fee, currency, account_id, notes) values ('KOFOL.PR', 'BUY', '2021-01-01', 46, 298, 52.2, 'CZK', 1, '');
    insert into public.transactions (symbol, type, date, quantity, unit_price, fee, currency, account_id, notes) values ('ERBAG.PR', 'BUY', '2021-01-01', 80, 505, 126.4, 'CZK', 3, 'Some note');

  


    insert into public.platforms (name, url, icon) values ('Fio e-Broker', 'https://ebroker.fio.cz/e-broker.cgi', 'http://localhost:3000/images/platforms/fio.svg');
        insert into public.platforms (name, url, icon) values ('Interactive Brokers', 'https://www.interactivebrokers.com/en/home.php', 'http://localhost:3000/images/platforms/ibkr.svg');
        insert into public.platforms (name, url, icon) values ('Portu', 'https://www.portu.cz/souhrn', 'http://localhost:3000/images/platforms/portu.svg}');
        insert into public.platforms (name, url, icon) values ('Investown', 'https://my.investown.cz/', 'http://localhost:3000/images/platforms/investown.jpeg}');

 

    insert into public.accounts (name, platform_id, notes) values ('Fio (M)', 1, '10 %');
        insert into public.accounts (name, platform_id, notes) values ('Interactive Brokers', 2, '10 %');
        insert into public.accounts (name, platform_id, notes) values ('Fio (T)', 1, '');
