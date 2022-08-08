import Coins from "../Coins"
import React from 'react'
import { fireEvent, screen, waitFor } from '@testing-library/react'
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from '../../../test-utils'
import { rest } from 'msw';
import {server} from "../../../mocks/api/server"

import {apiData} from "../apiData"


// [
//                 { id: 1, name: 'Xabi Alonzo' },
//                 { id: 2, name: 'Lionel Messi' },
//                 { id: 3, name: 'Lionel Love' },
//                 { id: 4, name: 'Lionel Poe' },
//                 { id: 5, name: 'Lionel Gink' },
//                 { id: 6, name: 'Lionel Boys' },
//                 { id: 7, name: 'Lionel Kim' },
//                 { id: 8, name: 'Lionel Messi' },
//                 { id: 9, name: 'Lionel Trevor' },
//                 { id: 10, name: 'Lionel Manny' }
//             ]


// [
//                     { id: 1, name: 'Junior Alonzo' },
//                     { id: 2, name: 'Junior Messi' },
//                     { id: 3, name: 'Junior Love' },
//                     { id: 4, name: 'Junior Poe' },
//                     { id: 5, name: 'Junior Gink' },
//                     { id: 6, name: 'Junior Boys' },
//                     { id: 7, name: 'Junior Kim' },
//                     { id: 8, name: 'Junior Messi' },
//                     { id: 9, name: 'Junior Trevor' },
//                     { id: 10, name: 'Junior Manny' }
//                 ]

test("table should render after fetching from API depending on request Query parameters", async () => {

    server.use(
       rest.get(`*`, (req, res, ctx) => {
                const arg = req.url.searchParams.getAll("page");
                console.log(arg)
                return res(ctx.json(apiData))         
            }
        ) 
	);


    const table = document.createElement('table')
    
    const { container } = renderWithProviders(<Coins />, {
        container: document.body.appendChild(table),
    });


    const allRows = await screen.findAllByRole("rowgroup")

    await waitFor(() => {
        expect(container).toBeInTheDocument();
    })  

    await waitFor(() => {
        expect(allRows[1].rows.length).toBe(10);
    })
})


test("recieve data from API after button click", async () => {

    server.use(
       rest.get(`*`, (req, res, ctx) => {
                // const id = req.url.searchParams.get("arg")
                const arg = req.url.searchParams.getAll("page");
                console.log(arg)
                return res(ctx.json(apiData))         
            }
        ) 
	);


    const table = document.createElement('table')
    
    const { container } = renderWithProviders(<Coins />, {
        container: document.body.appendChild(table),
    });

    const buttonEl = await screen.findByRole("button",  { name: /Next/i })

    fireEvent.click(buttonEl)

    const allRows = await screen.findAllByRole("rowgroup")

    const pageNumber = await screen.findByTestId("pageNumber");

    await waitFor(() => {
        expect(pageNumber.textContent).toBe("Page: 4")
    })

    await waitFor(() => {
        expect(container).toBeInTheDocument();
    })  

    await waitFor(() => {
        expect(allRows[1].rows.length).toBe(10);
    })
})




test('renders error message if API fails on page load', async () => {
    server.use(
        rest.get('*', (_req, res, ctx) =>
            res.once(ctx.status(500), ctx.json(null))
        )
    );

    renderWithProviders(<Coins />);

    const errorText = await screen.findByText(
        /Oh no, there was an error/i
    );

    await waitFor(() => {
        expect(errorText).toBeInTheDocument();
    })
});

test("disable prev button if pageNumber is less than zero", async () => {
    renderWithProviders(<Coins />)

    const buttonEl = await screen.findByRole("button",  { name: /Prev/i })

    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)

    await waitFor(() => {
        expect(buttonEl).toBeDisabled();
    })
})

test("disable next button if pageNumber is greatr than thirty", async () => {
    renderWithProviders(<Coins />)

    const buttonEl = await screen.findByRole("button",  { name: /Next/i })

    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)

    await waitFor(() => {
        expect(buttonEl).toBeDisabled();
    })
})