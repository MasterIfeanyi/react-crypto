import Coins from "../Coins";
import React from 'react'
import { fireEvent, screen, waitFor } from '@testing-library/react';
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from '../../../test-utils';
import { rest } from 'msw';
import { server } from "../../../mocks/api/server";
import { apiData } from "../apiData";




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


    const allTableBody = await screen.findAllByRole("rowgroup")

    await waitFor(() => {
        expect(container).toBeInTheDocument();
    })  

    await waitFor(() => {
        expect(allTableBody[1].rows.length).toBe(10);
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

    const allTableBody = await screen.findAllByRole("rowgroup")

    const pageNumber = await screen.findByTestId("pageNumber");

    await waitFor(() => {
        expect(pageNumber.textContent).toBe("Page: 2")
    })

    await waitFor(() => {
        expect(container).toBeInTheDocument();
    })  

    await waitFor(() => {
        expect(allTableBody[1].rows.length).toBe(10);
    })
})




test('renders error message if API fails on page load', async () => {
    server.use(
        rest.get('*', (_req, res, ctx) =>
            res.once(ctx.status(500), ctx.json({message: "baby, there was an error"}))
        )
    );

    renderWithProviders(<Coins />);

    const errorText = await screen.findByText(
        /Oh no, there was an error/i
    );

    const errorMessage = await screen.findByText(/baby, there was an error/i)

    await waitFor(() => {
        expect(errorMessage.textContent).toBe("baby, there was an error")
    })

    await waitFor(() => {
        expect(errorText).toBeInTheDocument();
    })
});




test("disable prev button if pageNumber is less than zero", async () => {
    renderWithProviders(<Coins />)

    const buttonEl = await screen.findByRole("button", { name: /Prev/i })

    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)
    fireEvent.click(buttonEl)

    await waitFor(() => {
        expect(buttonEl).toBeDisabled();
    })
});




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
});





test("search for a single coin", async () => {

    server.use(
        rest.get('*', (req, res, ctx) => {
            req.url.searchParams.getAll("page")
            return res(ctx.json([
                {name: "dogecoin", image: "dogecoin.jpg", current_price: 13000, price_change_percentage_24h: 4.5, symbol: "DGE" }
            ]))
        })
    );

    const table = document.createElement('table')
        
    const { container } = renderWithProviders(<Coins />, {
        container: document.body.appendChild(table),
    });


    const userInputEl = await screen.findByPlaceholderText(/search/i);

    fireEvent.change(userInputEl, {
        target: {
            value: "dogecoin"
        }
    })

    expect(container).toBeInTheDocument();


    await waitFor(() => {
        expect(userInputEl.value).toBe("dogecoin");
    })


    const allTableBody = await screen.findAllByRole("rowgroup", {}, { timeout: 3000 })

    // await waitFor(() => {
    //     expect(allTableBody).toBeInTheDocument();
    // }, {timeout:1600})


    await waitFor(() => {
        expect(allTableBody[1].rows.length).toBe(1);
    }, {timeout: 2000})
})


test("coin not found", async () => {

    server.use(
        rest.get('*', (req, res, ctx) => {
            req.url.searchParams.getAll("page")
            return res(ctx.json([ ]))
        })
    );

    const table = document.createElement('table')
        
    const { container } = renderWithProviders(<Coins />, {
        container: document.body.appendChild(table),
    });


    const userInputEl = await screen.findByPlaceholderText(/search/i);

    fireEvent.change(userInputEl, {
        target: {
            value: "dogecoin"
        }
    })

    expect(container).toBeInTheDocument();


    await waitFor(() => {
        expect(userInputEl.value).toBe("dogecoin");
    })


    const errorEl = await screen.findByTestId("coinError", {}, {timeout: 2000})


    await waitFor(() => {
        expect(errorEl.textContent).toBe("Oh no, coin not found");
    }, {timeout: 2000})

})