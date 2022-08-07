import { rest } from 'msw'

export const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {


    // const name = req.json();
    
    // const error = req.url.searchParams.get('error')
    
    // error response
    // if(error === 'network') {
    //   return res(
    //     ctx.status(400),
    //     ctx.json({
    //       errorMessage: 'Network error',
    //     }),
    //   )
    // }
    
    // successful response
    return res(ctx.status(200), ctx.json([
                { id: 1, name: 'Xabi Alonzo' },
                { id: 2, name: 'Lionel Messi' },
                { id: 3, name: 'Lionel Love' },
                { id: 4, name: 'Lionel Poe' },
                { id: 5, name: 'Lionel Gink' },
                { id: 6, name: 'Lionel Boys' },
                { id: 7, name: 'Lionel Kim' },
                { id: 8, name: 'Lionel Messi' },
                { id: 9, name: 'Lionel Trevor' },
                { id: 10, name: 'Lionel Manny' }
            ]), ctx.delay(30))
  })
]