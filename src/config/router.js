import { lazy } from 'react';
import { urls } from '../constants/urls';

import * as AuthGate from './AuthGate';

const HomeView = lazy(() => import('../views/HomeView'));
const LoginView = lazy(() => import('../views/LoginView'));
const RegisterView = lazy(() => import('../views/RegisterView'));
const ProfileView = lazy(() => import('../views/ProfileView'));
const EditProfileView = lazy(() => import('../views/EditProfileView'));
const CreatePostView = lazy(() => import('../views/CreatePostView'));
const EditPostView = lazy(() => import('../views/EditPostView'));
const PostView = lazy(() => import('../views/PostView'));
const SearchView = lazy(() => import('../views/SearchView'));
const ChatsView = lazy(() => import('../views/ChatsView'));

export const routes = [
  {
    key: 'home',
    path: urls.home,
    exact: true,
    element: <HomeView />,
  },
  {
    key: 'login',
    path: urls.login,
    exact: true,
    element: (
      <AuthGate.PublicOnly>
        <LoginView />
      </AuthGate.PublicOnly>
    ),
  },
  {
    key: 'register',
    path: urls.register,
    exact: true,
    element: (
      <AuthGate.PublicOnly>
        <RegisterView />
      </AuthGate.PublicOnly>
    ),
  },
  {
    key: 'profile',
    path: `${urls.profile}/:userId`,
    exact: true,
    element: <ProfileView />,
  },
  {
    key: 'editProfile',
    path: `${urls.editProfile}/:userId`,
    exact: true,
    element: (
      <AuthGate.AuthRequired>
        <EditProfileView />
      </AuthGate.AuthRequired>
    ),
  },
  {
    key: 'createPost',
    path: urls.createPost,
    exact: true,
    element: (
      <AuthGate.AuthRequired>
        <CreatePostView />
      </AuthGate.AuthRequired>
    ),
  },
  {
    key: 'editPost',
    path: `${urls.editPost}/:postId`,
    exact: true,
    element: (
      <AuthGate.AuthRequired>
        <EditPostView />
      </AuthGate.AuthRequired>
    ),
  },
  {
    key: 'post',
    path: `${urls.post}/:postId`,
    exact: true,
    element: <PostView />,
  },
  {
    key: 'search',
    path: urls.search,
    exact: true,
    element: <SearchView />,
  },
  {
    key: 'chats',
    path: urls.chats + '/*',
    exact: false,
    element: (
      <AuthGate.AuthRequired>
        <ChatsView />
      </AuthGate.AuthRequired>
    ),
  },
];
