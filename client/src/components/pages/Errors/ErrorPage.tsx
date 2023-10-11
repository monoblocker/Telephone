import {FC} from 'react';
import {NavLink} from "react-router-dom";


interface ErrorPageProps {

}

const ErrorPage: FC<ErrorPageProps> = () => {

    return (
        <div className="flex items-center justify-center h-screen text-xl">
            <div className="text-center">
                <h1 className="font-bold text-3xl">404</h1>
                <p>
                    <span className="text-indigo-700">Упс!</span> Страница не надена.
                </p>
                <p className="mb-2">
                    Как вы видите, такой страницы не существует
                </p>
                <NavLink to="/" className="pl-5 pr-5 pt-1 pb-1 bg-indigo-600 text-white rounded">Домой</NavLink>
            </div>
        </div>
    );
};

export default ErrorPage;
