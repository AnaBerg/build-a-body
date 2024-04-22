import { GlobalRegistrator } from '@happy-dom/global-registrator';
import { cleanup } from '@testing-library/react';
import { afterEach, mock } from 'bun:test';

GlobalRegistrator.register();
