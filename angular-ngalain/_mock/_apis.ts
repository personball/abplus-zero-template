import { MockStatusError } from '@delon/mock';

export const APIS = {
    '/api/401': () => { throw new MockStatusError(401); },
    '/api/403': () => { throw new MockStatusError(403); },
    '/api/404': () => { throw new MockStatusError(404); },
    '/api/500': () => { throw new MockStatusError(500); }
};
