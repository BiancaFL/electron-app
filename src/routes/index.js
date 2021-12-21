import { Routes, Route } from 'react-router-dom'
import { Menu } from '../components/Menu'

export default function MyRoutes() {
    return(
        <Routes>
            <Route path="/" component={ Menu } />
        </Routes>
    )
}