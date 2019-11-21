import './polyfills';

import styles from './assets/scss/app.scss';
import { App } from "./app";

import {
  config,
} from './config';

import { GithubService } from './http';

const app = new App(
  config,
  new GithubService(),
);

app.initializeApp();
