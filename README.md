  <h1 align="center">IT-Booster Challenge 3</h1>




## Описание

  <p>Развёрнут Next Js проект, подключен tanstack query + devtools </p>
  <p>В качестве API использован <a href=https://www.npmjs.com/package/json-server>json server</a>.</p>

## Настройка проекта

```bash
$ git clone https://github.com/DminGerasimov/IT-Booster-Challenge3.git
$ cd IT-Booster-Challenge3
$ npm install
```

## Запуск json server
```bash
$ npm run server

```

## Запуск сервера
```bash
$ npm run dev
```

## В браузере открываем <a href=http://localhost:3000/>страницу c 2-мя линками</a>

## Работа с CSR

<p>По ссылке <a href=http://localhost:3000/views/csr>Client side rendering</a> реализован query запрос
получения списка сущностей с json-сервера, инвалидация списка (по кнопке "Invalidate Data") и мутация единичной записи по клику на неё.</p>  
<p>Query реализован на стороне клиента.</p>  

## Работа с SSR + CSR. 
<p>По ссылке <a href=http://localhost:3000/views/ssr>Server side rendering</a> реализован prefetchQuery
 на стороне сервера (получение первой части списка) и query пагинация на стороне клиента.</p>
 <p>Реализован хук useInfinitScroll с логированием события ("callback") видимости последнего выведенного элемента в списке во viewPort.</p>

## Работа с SSR + CSR + ınfınıtScroll. 
<p>По ссылке <a href=http://localhost:3000/views/ınfınıteScroll>Infınıt scroll</a> реализован prefetchInfınıteQuery
 на стороне сервера (получение первой части списка) и ınfınıtQuery на стороне клиента совместно с хуком useInfiniteScroll.</p>
 <p>По клику на элемент списка, реализована оптимистическая мутация без кэша</p>
 <p>Добавлен функционал Query в виде кнопок Abort, Cancel, Remove, Refetch, Invalidate</p>

Для реализации более глубокого функционала, см. документацию.

## Документация и ссылки

Ознакомьтесь с несколькими ресурсами, которые могут пригодиться при работе с TanstacjQuery:

- Visit the [TanstackQuery](https://tanstack.com/query/latest) to learn more.
- [Json server](https://www.npmjs.com/package/json-server).
- [Next JS](https://nextjs.org/docs).
