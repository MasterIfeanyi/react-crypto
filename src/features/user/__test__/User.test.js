import React from 'react'
import { screen, waitFor } from '@testing-library/react'
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from '../../../test-utils'
import { rest } from 'msw';
import { server } from "../../../mocks/api/server"
import User from "../User"



test("recieve single data from API depending on request Path parameters", async () => {

    server.use(
       rest.get(`*/coins/:arg`, (req, res, ctx) => {
                const arg = req.params.arg
                console.log(arg)
                return res(ctx.json({arg, name: "bitcoin" }))         
            }
        )
	);

    renderWithProviders(<User />)

    const nameEl = await screen.findByTestId("name")

    await waitFor(() => {
        expect(nameEl.textContent).toBe("bitcoin")
    })
})

test("if error occur, error message should render", async () => {
    server.use(
        rest.get('*', (_req, res, ctx) =>
            res.once(ctx.status(500), ctx.json(null))
        )
    );

    renderWithProviders(<User />)

    const errorEl = await screen.findByText(/An error occured/i);

    await waitFor(() => {
        expect(errorEl.textContent).toBe("An error occured");
    })
})