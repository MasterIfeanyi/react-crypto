import {useState} from 'react'
import { useGetUserQuery } from './userApiSlice'



const User = () => {

    const [name] = useState("bitcoin")

    const {
        data: user,
        isError,
        isSuccess,
    } = useGetUserQuery(name)


    return (
        <section className="section">
            <div className="container">
                <div className="row">
                    <div>
                        {isError && (<p>An error occured</p>)}
                        {isSuccess && (<p data-testid="name">{user.name}</p>)}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default User