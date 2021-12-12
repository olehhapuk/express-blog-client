import { Routes, Route } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { routes } from '../../config/router';
import { Navbar } from '../';
import { authOperations } from '../../redux/auth';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.fetchUserData());
  }, [dispatch]);

  return (
    <div>
      <Navbar />

      <Suspense fallback={null}>
        <Routes>
          {routes.map((route) => (
            <Route {...route} />
          ))}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
