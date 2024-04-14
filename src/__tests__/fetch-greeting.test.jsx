// msw
import { rest } from 'msw'
import { setupServer } from 'msw/node'
// см. ниже
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
// см. ниже
import '@testing-library/jest-dom'
import HomePage from "../components/pages/homepage/HomePage";

test.todo('получение приветствия')
//
// const server = setupServer(
//     rest.get('/greeting', (req, res, ctx) =>
//         res(ctx.json({ greeting: 'Привет!' }))
//     )
// )
// // запускаем сервер перед выполнением тестов
// beforeAll(() => server.listen())
// // сбрасываем обработчики к дефолтной реализации после каждого теста
// afterEach(() => server.resetHandlers())
// // останавливаем сервер после всех тестов
// afterAll(() => server.close())
// describe('получение приветствия', () => {
//     // todo
// })
// test('-> успешное получение и отображение приветствия', async function () {
//     // рендерим компонент
//     // https://testing-library.com/docs/react-testing-library/api/#render
//     render(<HomePage url='' />)
//
//     // имитируем нажатие кнопки для отправки запроса
//     // https://testing-library.com/docs/dom-testing-library/api-events#fireevent
//     //
//     // screen привязывает (bind) запросы к document.body
//     // https://testing-library.com/docs/queries/about/#screen
//     fireEvent.click(screen.getByText(''))
//
//     // ждем рендеринга заголовка
//     // https://testing-library.com/docs/dom-testing-library/api-async/#waitfor
//     await waitFor(() => screen.getByRole('heading'))
//
//
//     // текстом кнопки должно быть `Готово`
//     expect(screen.getByRole('button')).toHaveTextContent('Играть!')
//
// })