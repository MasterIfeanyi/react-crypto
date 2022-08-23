import { rest } from "msw";
import { apiData } from ".../../features/coins/apiData";

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
    return res(ctx.status(200), ctx.json(apiData), ctx.delay(30))
  })
]