import { Outlet } from 'react-router-dom';

export default function MoviesPage() {
    
    return (
        <div>
            <p>Movies page</p>
            <Outlet />
        </div>
    );
};